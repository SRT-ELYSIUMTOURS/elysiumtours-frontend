import { Title, useGetList, useDataProvider, useNotify } from "react-admin";
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  TextField,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Alert,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

const fetchApi = async (path, options = {}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `API error: ${res.status}`);
  }
  return res.json();
};

const TabPanel = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: 3 }}>
    {value === index && children}
  </Box>
);

// --------------- Tab 1: General ---------------
const GeneralTab = () => {
  const notify = useNotify();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState({
    defaultCommitmentFeePercent: 30,
    gracePeriodDays: 3,
    defaultSlaHours: 24,
    maxGroupSize: 20,
    smsProvider: "hubtel",
    whatsappEnabled: true,
    supportedCurrencies: "GHS,USD",
  });

  useEffect(() => {
    fetchApi("/organization/config")
      .then((data) => {
        const c = data.config || data;
        setConfig((prev) => ({
          defaultCommitmentFeePercent:
            c.defaultCommitmentFeePercent ?? prev.defaultCommitmentFeePercent,
          gracePeriodDays: c.gracePeriodDays ?? prev.gracePeriodDays,
          defaultSlaHours: c.defaultSlaHours ?? prev.defaultSlaHours,
          maxGroupSize: c.maxGroupSize ?? prev.maxGroupSize,
          smsProvider: c.smsProvider ?? prev.smsProvider,
          whatsappEnabled: c.whatsappEnabled ?? prev.whatsappEnabled,
          supportedCurrencies: Array.isArray(c.supportedCurrencies)
            ? c.supportedCurrencies.join(",")
            : c.supportedCurrencies ?? prev.supportedCurrencies,
        }));
        setError(null);
      })
      .catch((err) => {
        console.warn("[Settings] Could not load org config:", err.message);
        setError("Could not load config from server. Showing defaults.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...config,
        defaultCommitmentFeePercent: Number(config.defaultCommitmentFeePercent),
        gracePeriodDays: Number(config.gracePeriodDays),
        defaultSlaHours: Number(config.defaultSlaHours),
        maxGroupSize: Number(config.maxGroupSize),
        supportedCurrencies: config.supportedCurrencies
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
      };
      await fetchApi("/organization/config", {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      notify("Settings saved successfully", { type: "success" });
      setError(null);
    } catch (err) {
      notify(`Failed to save: ${err.message}`, { type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent
          sx={{ display: "flex", justifyContent: "center", py: 4 }}
        >
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Organization Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Platform-wide settings for Elysium Tours.
        </Typography>
        {error && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Stack spacing={2.5} sx={{ maxWidth: 500 }}>
          <TextField
            label="Default Commitment Fee %"
            type="number"
            size="small"
            fullWidth
            value={config.defaultCommitmentFeePercent}
            onChange={handleChange("defaultCommitmentFeePercent")}
            inputProps={{ min: 0, max: 100 }}
          />
          <TextField
            label="Grace Period Days"
            type="number"
            size="small"
            fullWidth
            value={config.gracePeriodDays}
            onChange={handleChange("gracePeriodDays")}
            inputProps={{ min: 0 }}
          />
          <TextField
            label="Default SLA Hours"
            type="number"
            size="small"
            fullWidth
            value={config.defaultSlaHours}
            onChange={handleChange("defaultSlaHours")}
            inputProps={{ min: 1 }}
          />
          <TextField
            label="Max Group Size"
            type="number"
            size="small"
            fullWidth
            value={config.maxGroupSize}
            onChange={handleChange("maxGroupSize")}
            inputProps={{ min: 1 }}
          />
          <FormControl size="small" fullWidth>
            <InputLabel>SMS Provider</InputLabel>
            <Select
              value={config.smsProvider}
              label="SMS Provider"
              onChange={handleChange("smsProvider")}
            >
              <MenuItem value="hubtel">Hubtel</MenuItem>
              <MenuItem value="twilio">Twilio</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={config.whatsappEnabled}
                onChange={handleChange("whatsappEnabled")}
              />
            }
            label="WhatsApp Enabled"
          />
          <TextField
            label="Supported Currencies (comma-separated)"
            size="small"
            fullWidth
            value={config.supportedCurrencies}
            onChange={handleChange("supportedCurrencies")}
            helperText="e.g. GHS,USD,EUR"
          />
          <Button
            variant="contained"
            startIcon={
              saving ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />
            }
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

// --------------- Tab 2: Email Templates ---------------
const TemplatesTab = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Email & SMS Templates
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Manage notification templates used across all channels.
          Use the dedicated Email Templates page for full CRUD editing.
        </Typography>
        <Button
          variant="contained"
          onClick={() => { window.location.href = "/admin/templates"; }}
        >
          Manage Email Templates
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 1 }}
          onClick={() => { window.location.href = "/admin/contract-templates"; }}
        >
          Manage Contract Templates
        </Button>
      </CardContent>
    </Card>
  );
};

// --------------- Tab 3: Notifications ---------------
const NotificationsTab = () => {
  const [prefs, setPrefs] = useState({
    bookingConfirmations: true,
    slaAlerts: true,
    paymentReminders: true,
    quoteReady: true,
    cancellationNotice: true,
  });

  const handleToggle = (key) => () => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationTypes = [
    {
      key: "bookingConfirmations",
      label: "Booking Confirmations",
      description:
        "Send email and SMS when a booking is confirmed after payment",
    },
    {
      key: "slaAlerts",
      label: "SLA Breach Alerts",
      description:
        "Alert staff when a pricing quote is approaching or past its SLA deadline",
    },
    {
      key: "paymentReminders",
      label: "Payment Reminders",
      description:
        "Send reminders for pending payments and upcoming installment deadlines",
    },
    {
      key: "quoteReady",
      label: "Quote Ready Notifications",
      description:
        "Notify customers when their dynamic tour quote has been prepared",
    },
    {
      key: "cancellationNotice",
      label: "Cancellation Notices",
      description:
        "Send confirmation when a booking or tour request is cancelled",
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Notification Preferences
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Control which notification types are enabled platform-wide. Channel
          routing (email, SMS, WhatsApp, in-app) is configured per-template.
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          These preferences will be saved to the organization config once the
          notification preferences endpoint is available. Changes are local for
          now.
        </Alert>
        <List>
          {notificationTypes.map((nt, idx) => (
            <Box key={nt.key}>
              <ListItem>
                <ListItemText
                  primary={nt.label}
                  secondary={nt.description}
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={prefs[nt.key]}
                    onChange={handleToggle(nt.key)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              {idx < notificationTypes.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

// --------------- Main Component ---------------
const PlatformSettings = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Platform Settings" />
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
        Platform Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Manage organization configuration, templates, and notification
        preferences.
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="General" />
        <Tab label="Templates" />
        <Tab label="Notifications" />
      </Tabs>

      <TabPanel value={tab} index={0}>
        <GeneralTab />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <TemplatesTab />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <NotificationsTab />
      </TabPanel>
    </Box>
  );
};

export default PlatformSettings;
