import { Title } from "react-admin";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";
const getToken = () => localStorage.getItem("token");

const fetchApi = async (path) => {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
};

const COLORS = ["#7b2cbf", "#5c218f", "#b57edc", "#d6beeb", "#2d2d2d", "#565656"];

const formatGHS = (amount) =>
  new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }).format(amount || 0);

const KpiCard = ({ title, value, subtitle, color = "primary.main" }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Typography variant="overline" color="text.secondary">{title}</Typography>
      <Typography variant="h4" fontWeight={700} color={color}>{value}</Typography>
      {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
    </CardContent>
  </Card>
);

const AnalyticsDashboard = () => {
  const [bookings, setBookings] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [payments, setPayments] = useState(null);
  const [occupancy, setOccupancy] = useState(null);
  const [crossOrg, setCrossOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isSuperAdmin = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}").role === "super_admin"; } catch { return false; }
  })();

  useEffect(() => {
    const load = async () => {
      try {
        const promises = [
          fetchApi("/admin/analytics/bookings"),
          fetchApi("/admin/analytics/revenue?period=monthly"),
          fetchApi("/admin/analytics/payments"),
          fetchApi("/admin/analytics/occupancy"),
        ];
        // Super admin gets cross-org analytics from platform endpoints
        if (isSuperAdmin) {
          promises.push(fetchApi("/platform/revenue"));
          promises.push(fetchApi("/platform/analytics"));
        }
        const results = await Promise.all(promises);
        setBookings(results[0]);
        setRevenue(results[1]);
        setPayments(results[2]);
        setOccupancy(results[3]);
        if (isSuperAdmin && results[4]) {
          setCrossOrg({ revenue: results[4], analytics: results[5] });
        }
      } catch (err) {
        console.error("[Analytics] fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading analytics...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Title title="Analytics" />
        <Typography color="error">Failed to load analytics: {error}</Typography>
      </Box>
    );
  }

  // Prepare chart data
  const statusData = bookings
    ? Object.entries(bookings.bookingsByStatus)
        .filter(([, v]) => v > 0)
        .map(([name, value]) => ({ name: name.replace(/_/g, " "), value }))
    : [];

  const typeData = bookings
    ? Object.entries(bookings.bookingsByType)
        .filter(([, v]) => v > 0)
        .map(([name, value]) => ({ name, value }))
    : [];

  const paymentStatusData = payments
    ? Object.entries(payments.paymentsByStatus)
        .filter(([, v]) => v > 0)
        .map(([name, value]) => ({ name, value }))
    : [];

  const occupancyData = occupancy?.packages
    ?.filter((p) => p.bookedSeats > 0)
    .map((p) => ({ name: p.title.substring(0, 20), fillRate: p.fillRate, booked: p.bookedSeats }))
    || [];

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Analytics" />
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Analytics Dashboard
      </Typography>

      {/* KPI Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard title="Total Bookings" value={bookings?.totalBookings || 0} subtitle={`Avg group size: ${bookings?.averageGroupSize?.toFixed(1) || 0}`} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard title="Total Revenue" value={formatGHS(bookings?.totalRevenue)} subtitle={`Avg booking: ${formatGHS(bookings?.averageBookingValue)}`} color="success.main" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard title="Payment Revenue" value={formatGHS(payments?.netRevenue)} subtitle={`${payments?.totalTransactions || 0} transactions`} color="info.main" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard title="Avg Occupancy" value={`${occupancy?.averageFillRate?.toFixed(1) || 0}%`} subtitle={`${occupancy?.packages?.length || 0} packages tracked`} color="warning.main" />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Revenue Over Time */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: 350 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Revenue by Month</Typography>
              {revenue && revenue.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(v) => formatGHS(v)} />
                    <Area type="monotone" dataKey="revenue" stroke="#7b2cbf" fill="#f2eaf9" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="text.secondary">No revenue data yet.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Bookings by Status */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: 350 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Bookings by Status</Typography>
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                      {statusData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="text.secondary">No booking data yet.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Bookings by Type */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: 350 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Bookings by Type</Typography>
              {typeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={typeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#7b2cbf" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="text.secondary">No data.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Breakdown */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: 350 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Payment Status</Typography>
              {paymentStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={paymentStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {paymentStatusData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="text.secondary">No payment data.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Occupancy */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: 350 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Package Occupancy</Typography>
              {occupancyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={occupancyData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} unit="%" />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Bar dataKey="fillRate" fill="#5c218f" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Typography color="text.secondary">No occupancy data (no booked seats).</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Trend Table */}
      {bookings?.monthlyTrend?.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Monthly Trend</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell align="right">Bookings</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.monthlyTrend.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                    <TableCell align="right">{formatGHS(row.revenue)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Cross-Org Analytics — super_admin only */}
      {crossOrg && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Platform-Wide (Cross-Org)
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">Total Platform Revenue</Typography>
                  <Typography variant="h4" fontWeight={700} color="success.main">
                    {formatGHS(crossOrg.revenue?.totalRevenue)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">Total Bookings (all orgs)</Typography>
                  <Typography variant="h4" fontWeight={700}>{crossOrg.analytics?.totalBookings ?? 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="overline" color="text.secondary">Total Users (all orgs)</Typography>
                  <Typography variant="h4" fontWeight={700}>{crossOrg.analytics?.totalUsers ?? 0}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {crossOrg.analytics?.orgBreakdown?.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Revenue & Activity by Organization</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Organization</TableCell>
                      <TableCell align="right">Bookings</TableCell>
                      <TableCell align="right">Users</TableCell>
                      <TableCell align="right">Revenue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {crossOrg.analytics.orgBreakdown.map((org) => (
                      <TableRow key={org.orgId}>
                        <TableCell>{org.orgName}</TableCell>
                        <TableCell align="right">{org.bookings}</TableCell>
                        <TableCell align="right">{org.users}</TableCell>
                        <TableCell align="right">
                          {formatGHS(crossOrg.revenue?.orgBreakdown?.find((r) => r.orgId === org.orgId)?.revenue || 0)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AnalyticsDashboard;
