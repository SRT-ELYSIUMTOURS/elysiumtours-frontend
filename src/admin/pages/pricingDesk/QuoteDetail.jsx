import { Title, useNotify } from "react-admin";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Stack,
  TextField,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect, useMemo, useCallback } from "react";
import SlaTimer from "../../components/SlaTimer";

const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

const getToken = () => localStorage.getItem("token");

const STATUS_COLORS = {
  pending_pricing: "warning",
  assigned: "info",
  quoted: "primary",
  sent_to_customer: "secondary",
  accepted: "success",
  rejected: "error",
  expired: "default",
  revised: "info",
  draft: "default",
};

const DEFAULT_LINE_ITEMS = [
  { key: "transport", description: "Transport Cost", amount: 0 },
  { key: "accommodation", description: "Accommodation Cost", amount: 0 },
  { key: "attractions", description: "Attraction Fees", amount: 0 },
  { key: "dining", description: "Dining Cost", amount: 0 },
  { key: "margin", description: "Platform Fee / Margin", amount: 0 },
];

/**
 * Compute SLA deadline: use slaDeadline field, or fall back to createdAt + 72h.
 */
const getSlaDeadline = (quote) => {
  if (quote.slaDeadline) return quote.slaDeadline;
  if (quote.createdAt) {
    const d = new Date(quote.createdAt);
    d.setHours(d.getHours() + 72);
    return d.toISOString();
  }
  return null;
};

const formatCurrency = (value) => {
  const num = Number(value) || 0;
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  }).format(num);
};

const formatStatus = (status) => {
  if (!status) return "Unknown";
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const QuoteDetail = () => {
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const notify = useNotify();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [lineItems, setLineItems] = useState(DEFAULT_LINE_ITEMS);

  // Fetch quote data
  const fetchQuote = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/pricing-desk/quotes/${quoteId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const data = json.data || json;
      setQuote(data);

      // Populate line items from existing cost breakdown if available
      if (data.costBreakdown && Array.isArray(data.costBreakdown)) {
        setLineItems(
          data.costBreakdown.map((item, i) => ({
            key: item.key || `item_${i}`,
            description: item.description || "",
            amount: item.amount || 0,
          }))
        );
      } else if (data.costBreakdown && typeof data.costBreakdown === "object") {
        // Handle object-style cost breakdown
        const items = DEFAULT_LINE_ITEMS.map((defaultItem) => ({
          ...defaultItem,
          amount: data.costBreakdown[defaultItem.key] || 0,
        }));
        setLineItems(items);
      }
    } catch (err) {
      console.error("Failed to load quote:", err);
      notify("Failed to load quote details", { type: "error" });
    } finally {
      setLoading(false);
    }
  }, [quoteId, notify]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  // Cost calculations
  const calculations = useMemo(() => {
    const subtotal = lineItems.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0
    );
    const marginItem = lineItems.find((i) => i.key === "margin");
    const costItems = lineItems.filter((i) => i.key !== "margin");
    const costTotal = costItems.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0
    );
    const marginAmount = Number(marginItem?.amount) || 0;
    const marginPercent = costTotal > 0 ? (marginAmount / costTotal) * 100 : 0;
    const groupSize = quote?.groupSize || 1;
    const pricePerPerson = subtotal / groupSize;

    return {
      subtotal,
      total: subtotal,
      marginPercent: marginPercent.toFixed(1),
      pricePerPerson,
      groupSize,
    };
  }, [lineItems, quote?.groupSize]);

  // Line item handlers
  const updateLineItem = (index, field, value) => {
    setLineItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [field]: field === "amount" ? Number(value) || 0 : value }
          : item
      )
    );
  };

  // API action helper
  const performAction = async (endpoint, method = "POST", body = null) => {
    setActionLoading(endpoint);
    try {
      const options = {
        method,
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      };
      if (body) options.body = JSON.stringify(body);

      const res = await fetch(
        `${API_URL}/pricing-desk/quotes/${quoteId}/${endpoint}`,
        options
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }
      const json = await res.json();
      const data = json.data || json;
      setQuote(data);
      notify(`Action "${endpoint}" completed successfully`, { type: "success" });
    } catch (err) {
      console.error(`Action ${endpoint} failed:`, err);
      notify(err.message || `Action "${endpoint}" failed`, { type: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleAssign = () => performAction("assign");

  const handleSubmitQuote = () =>
    performAction("submit", "POST", {
      costBreakdown: lineItems,
      totalPrice: calculations.total,
      pricePerPerson: calculations.pricePerPerson,
    });

  const handleSendToCustomer = () => performAction("send");

  const handleRevise = () => performAction("revise");

  const handleSaveDraft = () => {
    // Save to local state only (not submitted to backend)
    notify("Draft saved locally", { type: "info" });
  };

  if (loading) {
    return (
      <Box
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!quote) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Quote not found.</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin/pricing-desk")}
          sx={{ mt: 2 }}
        >
          Back to Queue
        </Button>
      </Box>
    );
  }

  const status = quote.status || "unknown";

  return (
    <Box sx={{ p: 2 }}>
      <Title title={`Quote #${quoteId}`} />

      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton
            onClick={() => navigate("/admin/pricing-desk")}
            size="small"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight={700}>
            Quote Builder
          </Typography>
          <Chip
            label={formatStatus(status)}
            color={STATUS_COLORS[status] || "default"}
          />
          <SlaTimer deadline={getSlaDeadline(quote)} />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {/* LEFT COLUMN — 60% */}
        <Grid size={{ xs: 12, md: 7 }}>
          {/* Tour Request Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Tour Request Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Customer Name
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {quote.customerName || quote.customerId || "\u2014"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body2">
                    {quote.customerEmail || "\u2014"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body2">
                    {quote.customerPhone || "\u2014"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Group Size
                  </Typography>
                  <Typography variant="body2">
                    {quote.groupSize || "\u2014"} people
                  </Typography>
                </Grid>

                <Grid size={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Destination(s)
                  </Typography>
                  <Typography variant="body2">
                    {quote.destinationName ||
                      (Array.isArray(quote.destinations)
                        ? quote.destinations.join(", ")
                        : quote.destinationId || "\u2014")}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body2">
                    {quote.duration
                      ? `${quote.duration} day${quote.duration !== 1 ? "s" : ""}`
                      : "\u2014"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Preferred Dates
                  </Typography>
                  <Typography variant="body2">
                    {quote.preferredDates || quote.travelDates || "\u2014"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Hotel Preference
                  </Typography>
                  <Typography variant="body2">
                    {quote.hotelPreference || "\u2014"}
                  </Typography>
                </Grid>

                <Grid size={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Selected Attractions
                  </Typography>
                  <Typography variant="body2">
                    {Array.isArray(quote.attractions)
                      ? quote.attractions.join(", ")
                      : quote.attractions || "\u2014"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Dining Preferences
                  </Typography>
                  <Typography variant="body2">
                    {Array.isArray(quote.diningPreferences)
                      ? quote.diningPreferences.join(", ")
                      : quote.diningPreferences || "\u2014"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Transport Preference
                  </Typography>
                  <Typography variant="body2">
                    {quote.transportPreference || "\u2014"}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">
                    Special Requests
                  </Typography>
                  <Typography variant="body2">
                    {quote.specialRequests || "\u2014"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Cost Calculator */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Cost Calculator
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: "55%" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">
                      Amount (GHS)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lineItems.map((item, index) => (
                    <TableRow key={item.key}>
                      <TableCell>
                        <TextField
                          value={item.description}
                          onChange={(e) =>
                            updateLineItem(index, "description", e.target.value)
                          }
                          variant="standard"
                          fullWidth
                          size="small"
                          InputProps={{
                            disableUnderline:
                              item.description === DEFAULT_LINE_ITEMS[index]?.description,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          value={item.amount || ""}
                          onChange={(e) =>
                            updateLineItem(index, "amount", e.target.value)
                          }
                          variant="outlined"
                          size="small"
                          type="number"
                          inputProps={{ min: 0, step: 0.01 }}
                          sx={{ width: 160 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Subtotal row */}
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: 700, borderBottom: "none", pt: 2 }}
                    >
                      Subtotal
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 700, borderBottom: "none", pt: 2 }}
                    >
                      {formatCurrency(calculations.subtotal)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ borderBottom: "none" }}>
                      Margin %
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: "none" }}>
                      {calculations.marginPercent}%
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                      Total
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                    >
                      {formatCurrency(calculations.total)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ borderBottom: "none" }}>
                      Price Per Person ({calculations.groupSize} people)
                    </TableCell>
                    <TableCell align="right" sx={{ borderBottom: "none" }}>
                      {formatCurrency(calculations.pricePerPerson)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quote History */}
          {quote.history && Array.isArray(quote.history) && quote.history.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Quote History
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Revision</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Changed By</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quote.history.map((entry, i) => (
                      <TableRow key={i}>
                        <TableCell>#{entry.revision || i + 1}</TableCell>
                        <TableCell>
                          <Chip
                            label={formatStatus(entry.status || entry.action)}
                            size="small"
                            color={
                              STATUS_COLORS[entry.status || entry.action] ||
                              "default"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {entry.changedBy || entry.user || "\u2014"}
                        </TableCell>
                        <TableCell>
                          {entry.timestamp || entry.createdAt
                            ? new Date(
                                entry.timestamp || entry.createdAt
                              ).toLocaleString()
                            : "\u2014"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* RIGHT COLUMN — 40% */}
        <Grid size={{ xs: 12, md: 5 }}>
          {/* Quote Summary */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Quote Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  Total Price
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  color="primary.main"
                >
                  {formatCurrency(calculations.total)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  GHS
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Stack spacing={1.5}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Price Per Person
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(calculations.pricePerPerson)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Currency
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    GHS
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Margin
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {calculations.marginPercent}%
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Group Size
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {calculations.groupSize} people
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={formatStatus(status)}
                    size="small"
                    color={STATUS_COLORS[status] || "default"}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Actions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleAssign}
                  disabled={!!actionLoading}
                >
                  {actionLoading === "assign" ? (
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                  ) : null}
                  Assign to Me
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  onClick={handleSaveDraft}
                >
                  Save Draft
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmitQuote}
                  disabled={
                    !!actionLoading || calculations.total <= 0
                  }
                >
                  {actionLoading === "submit" ? (
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                  ) : null}
                  Submit Quote
                </Button>

                {(status === "quoted" || status === "submitted") && (
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleSendToCustomer}
                    disabled={!!actionLoading}
                  >
                    {actionLoading === "send" ? (
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                    ) : null}
                    Send to Customer
                  </Button>
                )}

                {status === "rejected" && (
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={handleRevise}
                    disabled={!!actionLoading}
                  >
                    {actionLoading === "revise" ? (
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                    ) : null}
                    Revise Quote
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuoteDetail;
