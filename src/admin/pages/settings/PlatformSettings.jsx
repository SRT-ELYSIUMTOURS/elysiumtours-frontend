import { Title } from "react-admin";
import { useState } from "react";
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
} from "@mui/material";

const TabPanel = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: 3 }}>
    {value === index && children}
  </Box>
);

const GeneralTab = () => (
  <Card>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Organization Configuration
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Platform-wide settings for Elysium Tours.
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 500 }}>
        <TextField
          label="Organization Name"
          defaultValue="Elysium Tours"
          size="small"
          fullWidth
          disabled
        />
        <TextField
          label="Support Email"
          defaultValue="support@elysiumtours.com"
          size="small"
          fullWidth
          disabled
        />
        <TextField
          label="Default Currency"
          defaultValue="GHS"
          size="small"
          fullWidth
          disabled
        />
        <TextField
          label="Default Timezone"
          defaultValue="Africa/Accra"
          size="small"
          fullWidth
          disabled
        />
        <TextField
          label="SLA Window (hours)"
          defaultValue="24"
          type="number"
          size="small"
          fullWidth
          disabled
        />
        <Button variant="contained" disabled>
          Save Changes
        </Button>
      </Stack>
    </CardContent>
  </Card>
);

const TemplatesTab = () => {
  const templates = [
    { name: "Booking Confirmation", type: "email", status: "Active" },
    { name: "Payment Receipt", type: "email", status: "Active" },
    { name: "Quote Ready", type: "email", status: "Active" },
    { name: "Welcome", type: "email", status: "Active" },
    { name: "Booking Reminder", type: "sms", status: "Active" },
    { name: "Payment Reminder", type: "sms", status: "Draft" },
    { name: "SLA Breach Alert", type: "email", status: "Active" },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Email &amp; SMS Templates
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Manage notification templates. Connect to template.service for live
          editing.
        </Typography>
        <List>
          {templates.map((tpl, idx) => (
            <Box key={tpl.name}>
              <ListItem>
                <ListItemText
                  primary={tpl.name}
                  secondary={`Type: ${tpl.type} | Status: ${tpl.status}`}
                />
                <ListItemSecondaryAction>
                  <Button size="small" disabled>
                    Edit
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              {idx < templates.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const NotificationsTab = () => {
  const channels = [
    { name: "Email Notifications", description: "SendGrid / SMTP delivery" },
    { name: "SMS Notifications", description: "Twilio SMS delivery" },
    {
      name: "WhatsApp Notifications",
      description: "Twilio WhatsApp Business API",
    },
    {
      name: "In-App Notifications",
      description: "Real-time in-app notification bell",
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Notification Channels
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enable or disable notification channels platform-wide.
        </Typography>
        <List>
          {channels.map((channel, idx) => (
            <Box key={channel.name}>
              <ListItem>
                <ListItemText
                  primary={channel.name}
                  secondary={channel.description}
                />
                <ListItemSecondaryAction>
                  <Switch defaultChecked disabled />
                </ListItemSecondaryAction>
              </ListItem>
              {idx < channels.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const PlatformSettings = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Platform Settings" />
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
        Platform Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        All settings are read-only placeholders. Will connect to backend
        configuration endpoints.
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
