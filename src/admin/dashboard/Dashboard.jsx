import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  LinearProgress,
} from "@mui/material";
import { Title, useGetList } from "react-admin";
import { useState, useEffect } from "react";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleIcon from "@mui/icons-material/People";
import LuggageIcon from "@mui/icons-material/Luggage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

const fetchApi = async (path) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
};

const formatGHS = (amount) =>
  new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(amount || 0);

const statusColors = {
  confirmed: "success",
  pending_payment: "warning",
  cancelled: "error",
  completed: "info",
  in_progress: "secondary",
  tour_scheduled: "info",
  pending_partner_confirmation: "warning",
};

const CANCELLED_STATUSES = ["cancelled", "rejected", "refunded"];

const KpiCard = ({ title, value, icon, color }) => (
  <Card sx={{ flex: 1, minWidth: 180 }}>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="overline" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {value ?? "--"}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: color || "#f2eaf9",
            borderRadius: 2,
            p: 1.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [sla, setSla] = useState(null);
  const [pendingQuotes, setPendingQuotes] = useState(null);

  const { data: recentBookings } = useGetList("bookings", {
    pagination: { page: 1, perPage: 5 },
    sort: { field: "createdAt", order: "DESC" },
  });

  const { total: customerCount } = useGetList("customers", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "createdAt", order: "DESC" },
  });

  const { total: tourCount } = useGetList("tours", {
    pagination: { page: 1, perPage: 1 },
    sort: { field: "createdAt", order: "DESC" },
  });

  useEffect(() => {
    Promise.all([
      fetchApi("/admin/analytics/bookings"),
      fetchApi("/admin/sla-metrics"),
      fetchApi("/pricing-desk/queue").catch(() => null),
    ])
      .then(([b, s, q]) => {
        setAnalytics(b);
        setSla(s);
        if (q) {
          // Count quotes that are pending or calculating
          const quotes = q.rows || q.queue || q.data || (Array.isArray(q) ? q : []);
          const pending = quotes.filter(
            (item) =>
              item.status === "pending" ||
              item.status === "calculating" ||
              item.status === "pending_review"
          ).length;
          setPendingQuotes(pending);
        }
      })
      .catch((err) => console.error("[Dashboard] fetch error:", err));
  }, []);

  const complianceRate = sla?.complianceRate ?? 0;

  // Compute active bookings: total minus cancelled/rejected/refunded
  const activeBookings = (() => {
    if (!analytics) return "--";
    const total = analytics.totalBookings ?? 0;
    const byStatus = analytics.byStatus || analytics.statusBreakdown || {};
    const cancelledCount = CANCELLED_STATUSES.reduce(
      (sum, s) => sum + (byStatus[s] || 0),
      0
    );
    return total - cancelledCount;
  })();

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Dashboard" />
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Welcome to Elysium Tours Admin
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
        <KpiCard
          title="Active Bookings"
          value={analytics ? activeBookings : "--"}
          icon={<BookOnlineIcon sx={{ color: "#7b2cbf" }} />}
          color="#f2eaf9"
        />
        <KpiCard
          title="Customers"
          value={customerCount}
          icon={<PeopleIcon sx={{ color: "#1b5e20" }} />}
          color="#e8f5e9"
        />
        <KpiCard
          title="Tour Packages"
          value={tourCount}
          icon={<LuggageIcon sx={{ color: "#e65100" }} />}
          color="#fff3e0"
        />
        <KpiCard
          title="Revenue"
          value={analytics ? formatGHS(analytics.totalRevenue) : "--"}
          icon={<PaymentIcon sx={{ color: "#01579b" }} />}
          color="#e1f5fe"
        />
        <KpiCard
          title="Pending Quotes"
          value={pendingQuotes ?? "--"}
          icon={<RequestQuoteIcon sx={{ color: "#6a1b9a" }} />}
          color="#f3e5f5"
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {/* Recent Bookings */}
        <Card sx={{ flex: 2, minWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              Recent Bookings
            </Typography>
            {recentBookings && recentBookings.length > 0 ? (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Reference</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {booking.bookingRef}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={booking.bookingType || "--"}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={(booking.status || "").replace(/_/g, " ")}
                          size="small"
                          color={statusColors[booking.status] || "default"}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {formatGHS(booking.totalAmount)}
                      </TableCell>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography color="text.secondary">No bookings yet.</Typography>
            )}
          </CardContent>
        </Card>

        {/* SLA Compliance */}
        <Card sx={{ flex: 1, minWidth: 250 }}>
          <CardContent>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
            >
              <CheckCircleIcon
                sx={{
                  color:
                    complianceRate >= 95 ? "success.main" : "warning.main",
                }}
              />
              <Typography variant="h6" fontWeight={600}>
                SLA Compliance
              </Typography>
            </Box>
            {sla ? (
              <Box>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                  {complianceRate}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(complianceRate, 100)}
                  color={
                    complianceRate >= 95
                      ? "success"
                      : complianceRate >= 80
                        ? "warning"
                        : "error"
                  }
                  sx={{ height: 8, borderRadius: 4, mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {sla.withinSLA} of {sla.totalQuotes} quotes within SLA
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Total
                    </Typography>
                    <Typography fontWeight={700}>{sla.totalQuotes}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      On Time
                    </Typography>
                    <Typography fontWeight={700} color="success.main">
                      {sla.withinSLA}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="overline" color="text.secondary">
                      Breached
                    </Typography>
                    <Typography
                      fontWeight={700}
                      color={
                        sla.breachedSLA > 0 ? "error.main" : "text.primary"
                      }
                    >
                      {sla.breachedSLA}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Typography color="text.secondary">
                Loading SLA data...
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
