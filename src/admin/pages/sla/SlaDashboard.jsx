import { Title } from "react-admin";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimerIcon from "@mui/icons-material/Timer";
import WarningIcon from "@mui/icons-material/Warning";
import AssignmentIcon from "@mui/icons-material/Assignment";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

const fetchSLA = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/admin/sla-metrics`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
};

const MetricCard = ({ icon, title, value, subtitle, progressValue, progressColor }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        {icon}
        <Typography variant="h6" fontWeight={600}>{title}</Typography>
      </Box>
      <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>{value}</Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{subtitle}</Typography>
      )}
      {progressValue != null && (
        <LinearProgress
          variant="determinate"
          value={Math.min(progressValue, 100)}
          color={progressColor || "primary"}
          sx={{ height: 8, borderRadius: 4 }}
        />
      )}
    </CardContent>
  </Card>
);

const SlaDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSLA()
      .then(setData)
      .catch((err) => {
        console.error("[SLA] fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading SLA metrics...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Title title="SLA Monitor" />
        <Typography color="error">Failed to load SLA metrics: {error}</Typography>
      </Box>
    );
  }

  const complianceRate = data?.complianceRate ?? 0;
  const avgResponseHrs = data?.averageResponseTime != null
    ? (data.averageResponseTime / (1000 * 60 * 60)).toFixed(1)
    : "0";

  return (
    <Box sx={{ p: 2 }}>
      <Title title="SLA Monitor" />
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        SLA Monitor
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            icon={<AssignmentIcon sx={{ fontSize: 32, color: "primary.main" }} />}
            title="Total Quotes"
            value={data?.totalQuotes ?? 0}
            subtitle="All quotes processed this period"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            icon={<CheckCircleIcon sx={{ fontSize: 32, color: complianceRate >= 95 ? "success.main" : "warning.main" }} />}
            title="SLA Compliance"
            value={`${complianceRate}%`}
            subtitle={`${data?.withinSLA ?? 0} of ${data?.totalQuotes ?? 0} within SLA`}
            progressValue={complianceRate}
            progressColor={complianceRate >= 95 ? "success" : complianceRate >= 80 ? "warning" : "error"}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            icon={<TimerIcon sx={{ fontSize: 32, color: "info.main" }} />}
            title="Avg Response"
            value={`${avgResponseHrs} hrs`}
            subtitle="Mean time to deliver quote"
            progressValue={Math.min((parseFloat(avgResponseHrs) / 72) * 100, 100)}
            progressColor="info"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MetricCard
            icon={<WarningIcon sx={{ fontSize: 32, color: data?.breachedSLA > 0 ? "error.main" : "success.main" }} />}
            title="Breached SLAs"
            value={data?.breachedSLA ?? 0}
            subtitle={data?.breachedSLA > 0 ? "Requires immediate attention" : "No breaches — great performance!"}
            progressValue={data?.totalQuotes > 0 ? ((data?.breachedSLA ?? 0) / data.totalQuotes) * 100 : 0}
            progressColor={data?.breachedSLA > 0 ? "error" : "success"}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SlaDashboard;
