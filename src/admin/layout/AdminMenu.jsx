import { Menu, usePermissions } from "react-admin";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import BarChartIcon from "@mui/icons-material/BarChart";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BusinessIcon from "@mui/icons-material/Business";
import { Typography, Divider, Box } from "@mui/material";

const SectionLabel = ({ label }) => (
  <Typography
    variant="overline"
    sx={{ px: 2, pt: 2, pb: 0.5, color: "text.secondary", fontSize: "0.65rem", fontWeight: 700 }}
  >
    {label}
  </Typography>
);

// Role hierarchy check — same as backend
const ROLE_LEVELS = { customer: 0, staff: 1, admin: 2, super_admin: 3 };
const meetsRole = (userRole, required) => (ROLE_LEVELS[userRole] || 0) >= (ROLE_LEVELS[required] || 99);

const AdminMenu = () => {
  const { permissions: role } = usePermissions();
  const isStaff = meetsRole(role, "staff");
  const isAdmin = meetsRole(role, "admin");
  const isSuperAdmin = role === "super_admin";

  return (
    <Menu>
      <Menu.DashboardItem primaryText="Dashboard" leftIcon={<DashboardIcon />} />

      <Divider sx={{ my: 1 }} />
      <SectionLabel label="Tour Management" />
      <Menu.ResourceItem name="tours" primaryText="Tour Packages" />
      <Menu.ResourceItem name="destinations" primaryText="Destinations" />

      <Divider sx={{ my: 1 }} />
      <SectionLabel label="Operations" />
      {isStaff && (
        <Menu.Item to="/admin/pricing-desk" primaryText="Pricing Desk" leftIcon={<RequestQuoteIcon />} />
      )}
      <Menu.ResourceItem name="bookings" primaryText="Bookings" />
      <Menu.ResourceItem name="payments" primaryText="Payments" />

      <Divider sx={{ my: 1 }} />
      <SectionLabel label="Partners" />
      <Menu.ResourceItem name="hotels" primaryText="Hotels" />
      <Menu.ResourceItem name="attractions" primaryText="Attractions" />
      <Menu.ResourceItem name="dining" primaryText="Dining" />
      <Menu.ResourceItem name="transport" primaryText="Transport" />

      {isAdmin && (
        <Box>
          <Divider sx={{ my: 1 }} />
          <SectionLabel label="People" />
          <Menu.ResourceItem name="customers" primaryText="Customers" />
          <Menu.ResourceItem name="staff" primaryText="Staff" />
        </Box>
      )}

      <Divider sx={{ my: 1 }} />
      <SectionLabel label="Insights" />
      {isAdmin && (
        <Menu.Item to="/admin/analytics" primaryText="Analytics" leftIcon={<BarChartIcon />} />
      )}
      {isAdmin && (
        <Menu.Item to="/admin/sla-dashboard" primaryText="SLA Monitor" leftIcon={<SpeedIcon />} />
      )}

      {isAdmin && (
        <Box>
          <Divider sx={{ my: 1 }} />
          <SectionLabel label="Administration" />
          <Menu.Item to="/admin/settings" primaryText="Settings" leftIcon={<SettingsIcon />} />
          <Menu.Item to="/admin/communications" primaryText="Notifications" leftIcon={<NotificationsIcon />} />
          {isSuperAdmin && (
            <Menu.ResourceItem name="organizations" primaryText="Organizations" />
          )}
        </Box>
      )}
    </Menu>
  );
};

export default AdminMenu;
