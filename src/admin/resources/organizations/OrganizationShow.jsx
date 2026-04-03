import {
  Show,
  TabbedShowLayout,
  TextField,
  DateField,
  FunctionField,
  useRecordContext,
  TopToolbar,
  Button,
  useNotify,
  useRefresh,
} from "react-admin";
import { Chip, Box } from "@mui/material";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const formatGHS = (amount) =>
  new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }).format(amount || 0);

const OrgActions = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  if (!record) return null;

  const callPlatformApi = async (path, method = "PUT", body) => {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";
    const res = await fetch(`${API_URL}/platform${path}`, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `API ${res.status}`);
    }
    return res.json();
  };

  const handleSuspend = async () => {
    try {
      await callPlatformApi(`/organizations/${record.id}/suspend`, "PUT", { reason: "Suspended by super admin" });
      notify("Organization suspended", { type: "warning" });
      refresh();
    } catch (err) {
      notify(err.message, { type: "error" });
    }
  };

  const handleActivate = async () => {
    try {
      await callPlatformApi(`/organizations/${record.id}/activate`, "PUT");
      notify("Organization activated", { type: "success" });
      refresh();
    } catch (err) {
      notify(err.message, { type: "error" });
    }
  };

  return (
    <TopToolbar>
      {record.status !== "suspended" ? (
        <Button label="Suspend" onClick={handleSuspend} color="error">
          <PauseCircleIcon />
        </Button>
      ) : (
        <Button label="Activate" onClick={handleActivate} color="success">
          <PlayCircleIcon />
        </Button>
      )}
    </TopToolbar>
  );
};

const OrganizationShow = () => (
  <Show actions={<OrgActions />}>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label="Overview">
        <TextField source="name" label="Organization Name" />
        <TextField source="contactEmail" label="Contact Email" />
        <TextField source="contactPhone" label="Contact Phone" />
        <TextField source="domain" label="Domain" />
        <FunctionField
          label="Status"
          render={(record) => (
            <Chip
              label={record.status}
              color={record.status === "active" || record.status === "trial" ? "success" : "error"}
            />
          )}
        />
        <DateField source="createdAt" label="Created" showTime />

        <FunctionField label="Users" render={(record) => record.userCount ?? "—"} />
        <FunctionField label="Bookings" render={(record) => record.bookingCount ?? "—"} />
        <FunctionField label="Revenue" render={(record) => formatGHS(record.revenue)} />
      </TabbedShowLayout.Tab>

      <TabbedShowLayout.Tab label="Subscription">
        <FunctionField
          label="Plan"
          render={(record) => (
            <Chip label={record.subscription?.plan || "free"} color="primary" variant="outlined" />
          )}
        />
        <FunctionField
          label="Subscription Status"
          render={(record) => record.subscription?.status || "—"}
        />
        <FunctionField
          label="Start Date"
          render={(record) =>
            record.subscription?.startDate
              ? new Date(record.subscription.startDate).toLocaleDateString()
              : "—"
          }
        />
        <FunctionField
          label="End Date"
          render={(record) =>
            record.subscription?.endDate
              ? new Date(record.subscription.endDate).toLocaleDateString()
              : "No expiry"
          }
        />
      </TabbedShowLayout.Tab>

      <TabbedShowLayout.Tab label="Branding">
        <FunctionField
          label="Brand Color"
          render={(record) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: 1,
                  backgroundColor: record.branding?.brandColor || "#2c3e50",
                  border: "1px solid #ddd",
                }}
              />
              <Typography variant="body2">{record.branding?.brandColor || "#2c3e50"}</Typography>
            </Box>
          )}
        />
        <FunctionField
          label="Logo"
          render={(record) =>
            record.branding?.logoUrl ? (
              <img src={record.branding.logoUrl} alt="Logo" style={{ maxHeight: 60 }} />
            ) : (
              "No logo set"
            )
          }
        />
        <FunctionField
          label="Favicon"
          render={(record) => record.branding?.faviconUrl || "No favicon set"}
        />
      </TabbedShowLayout.Tab>

      <TabbedShowLayout.Tab label="Config">
        <FunctionField
          label="Organization Config"
          render={(record) => (
            <Box
              component="pre"
              sx={{
                backgroundColor: "grey.100",
                p: 2,
                borderRadius: 1,
                overflow: "auto",
                maxHeight: 400,
                fontSize: 12,
              }}
            >
              {JSON.stringify(record.config || {}, null, 2)}
            </Box>
          )}
        />
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);

export default OrganizationShow;
