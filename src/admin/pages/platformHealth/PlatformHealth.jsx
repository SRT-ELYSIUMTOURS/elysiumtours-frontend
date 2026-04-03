import { useState, useEffect } from "react";
import { Title } from "react-admin";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Chip,
  Alert,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DnsIcon from "@mui/icons-material/Dns";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

const fetchHealth = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/platform/health`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
};

const KpiCard = ({ icon, title, value, color = "primary.main" }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        {icon}
        <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" fontWeight={700} color={color}>
        {value ?? "—"}
      </Typography>
    </CardContent>
  </Card>
);

const PlatformHealth = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHealth()
      .then(setData)
      .catch((err) => {
        console.error("[PlatformHealth] fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading platform health...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Title title="Platform Health" />
        <Alert severity="error">Failed to load platform health: {error}</Alert>
      </Box>
    );
  }

  const services = data?.services || data?.runningServices || [];

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Platform Health" />
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Platform Health
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            icon={<BusinessIcon sx={{ fontSize: 32, color: "primary.main" }} />}
            title="Total Organizations"
            value={data?.totalOrganizations ?? 0}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            icon={<CheckCircleIcon sx={{ fontSize: 32, color: "success.main" }} />}
            title="Active Organizations"
            value={data?.activeOrganizations ?? 0}
            color="success.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            icon={<PeopleIcon sx={{ fontSize: 32, color: "info.main" }} />}
            title="Total Users"
            value={data?.totalUsers ?? 0}
            color="info.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            icon={<BookOnlineIcon sx={{ fontSize: 32, color: "warning.main" }} />}
            title="Total Bookings"
            value={data?.totalBookings ?? 0}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Running Services */}
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <DnsIcon sx={{ fontSize: 28, color: "primary.main" }} />
            <Typography variant="h6" fontWeight={600}>Running Services</Typography>
          </Box>
          {services.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {services.map((svc, idx) => {
                const name = typeof svc === "string" ? svc : svc.name || svc.service || `service-${idx}`;
                const isUp = typeof svc === "string" || svc.status === "up" || svc.available !== false;
                return (
                  <Chip
                    key={idx}
                    label={name}
                    color={isUp ? "success" : "error"}
                    variant="outlined"
                    size="small"
                  />
                );
              })}
            </Box>
          ) : (
            <Typography color="text.secondary">No service information available.</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlatformHealth;
