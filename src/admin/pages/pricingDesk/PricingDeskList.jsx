import { Title, useDataProvider, useGetIdentity } from "react-admin";
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
  Tabs,
  Tab,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SlaTimer from "../../components/SlaTimer";

const STATUS_COLORS = {
  pending_pricing: "warning",
  assigned: "info",
  quoted: "primary",
  sent_to_customer: "secondary",
  accepted: "success",
  rejected: "error",
  expired: "default",
  revised: "info",
};

const TAB_FILTERS = {
  0: "all",
  1: "unassigned",
  2: "assigned_to_me",
  3: "breached",
};

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

const PricingDeskList = () => {
  const dataProvider = useDataProvider();
  const navigate = useNavigate();
  const { identity } = useGetIdentity();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const filter = {};
      const tabKey = TAB_FILTERS[activeTab];

      if (tabKey === "unassigned") {
        filter.assignedTo = null;
      } else if (tabKey === "assigned_to_me" && identity?.id) {
        filter.assignedTo = identity.id;
      } else if (tabKey === "breached") {
        filter.slaBreached = true;
      }

      const { data } = await dataProvider.getList("pricing-desk", {
        pagination: { page: 1, perPage: 50 },
        sort: { field: "createdAt", order: "DESC" },
        filter,
      });
      setQuotes(data);
    } catch (err) {
      console.error("Failed to load pricing desk queue:", err);
    } finally {
      setLoading(false);
    }
  }, [dataProvider, activeTab, identity?.id]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleTabChange = (_event, newValue) => {
    setActiveTab(newValue);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "\u2014";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Pricing Desk" />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" fontWeight={700}>
          Quote Queue
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {quotes.length} quote{quotes.length !== 1 ? "s" : ""}
        </Typography>
      </Stack>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All" />
          <Tab label="Unassigned" />
          <Tab label="Assigned to Me" />
          <Tab label="Breached SLA" />
        </Tabs>
      </Box>

      <Card>
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 6,
              }}
            >
              <CircularProgress />
            </Box>
          ) : quotes.length === 0 ? (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <Typography color="text.secondary">
                No quotes in the queue.
              </Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Destination</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">
                    Group Size
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">
                    Duration
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>SLA Deadline</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Assigned To</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quotes.map((quote) => (
                  <TableRow
                    key={quote.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                    onClick={() =>
                      navigate(`/admin/pricing-desk/${quote.id}`)
                    }
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {quote.customerName || quote.customerId || "\u2014"}
                      </Typography>
                      {quote.customerEmail && (
                        <Typography variant="caption" color="text.secondary">
                          {quote.customerEmail}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {quote.destinationName || quote.destinationId || "\u2014"}
                    </TableCell>
                    <TableCell align="center">
                      {quote.groupSize || "\u2014"}
                    </TableCell>
                    <TableCell align="center">
                      {quote.duration
                        ? `${quote.duration} day${quote.duration !== 1 ? "s" : ""}`
                        : "\u2014"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={formatStatus(quote.status)}
                        size="small"
                        color={STATUS_COLORS[quote.status] || "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <SlaTimer deadline={getSlaDeadline(quote)} />
                    </TableCell>
                    <TableCell>
                      {quote.assignedToName || quote.assignedTo || "\u2014"}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(quote.createdAt)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PricingDeskList;
