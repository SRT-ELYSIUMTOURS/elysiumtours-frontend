import { useState, useEffect } from "react";
import {
  Show,
  TabbedShowLayout,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
  useRecordContext,
  useNotify,
  useRefresh,
} from "react-admin";
import {
  Box,
  Chip,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import StatusBadge from "../../components/StatusBadge";
import MoneyField from "../../components/MoneyField";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

const apiFetch = async (path, options = {}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API ${res.status}`);
  }
  return res.json();
};

const formatGHS = (amount) =>
  new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS" }).format(amount || 0);

const milestoneStatusColor = {
  pending: "warning",
  paid: "success",
  overdue: "error",
};

// ── Payment Plan Tab ──────────────────────────────────────────────────────────

const PaymentPlanTab = () => {
  const record = useRecordContext();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!record?.id) return;
    setLoading(true);
    apiFetch(`/payment-plans/booking/${record.id}`)
      .then(setPlan)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [record?.id]);

  if (!record) return null;
  if (loading) return <Box sx={{ p: 3, textAlign: "center" }}><CircularProgress size={28} /></Box>;
  if (error) return <Alert severity="info" sx={{ m: 2 }}>No payment plan found for this booking.</Alert>;
  if (!plan) return <Alert severity="info" sx={{ m: 2 }}>No payment plan found for this booking.</Alert>;

  const remaining = (plan.totalAmount || 0) - (plan.paidAmount || 0);

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card variant="outlined"><CardContent>
            <Typography variant="caption" color="text.secondary">Total Amount</Typography>
            <Typography variant="h6" fontWeight={700}>{formatGHS(plan.totalAmount)}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card variant="outlined"><CardContent>
            <Typography variant="caption" color="text.secondary">Paid Amount</Typography>
            <Typography variant="h6" fontWeight={700} color="success.main">{formatGHS(plan.paidAmount)}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card variant="outlined"><CardContent>
            <Typography variant="caption" color="text.secondary">Remaining</Typography>
            <Typography variant="h6" fontWeight={700} color="warning.main">{formatGHS(remaining)}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card variant="outlined"><CardContent>
            <Typography variant="caption" color="text.secondary">Commitment Fee</Typography>
            <Typography variant="h6" fontWeight={700}>{formatGHS(plan.commitmentFee)}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card variant="outlined"><CardContent>
            <Typography variant="caption" color="text.secondary">Milestones</Typography>
            <Typography variant="h6" fontWeight={700}>{plan.milestones?.length || 0}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Card variant="outlined"><CardContent>
            <Typography variant="caption" color="text.secondary">Status</Typography>
            <Box sx={{ mt: 0.5 }}>
              <Chip label={plan.status?.replace(/_/g, " ") || "unknown"} color={plan.status === "completed" ? "success" : plan.status === "active" ? "primary" : "default"} size="small" />
            </Box>
          </CardContent></Card>
        </Grid>
      </Grid>

      {plan.milestones?.length > 0 && (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Label</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Paid Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plan.milestones.map((m, idx) => (
              <TableRow key={m._id || idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{m.label || `Milestone ${idx + 1}`}</TableCell>
                <TableCell align="right">{formatGHS(m.amount)}</TableCell>
                <TableCell>{m.dueDate ? new Date(m.dueDate).toLocaleDateString() : "—"}</TableCell>
                <TableCell>
                  <Chip
                    label={(m.status || "pending").replace(/_/g, " ")}
                    color={milestoneStatusColor[m.status] || "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{m.paidDate ? new Date(m.paidDate).toLocaleDateString() : "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

// ── Contract Tab ──────────────────────────────────────────────────────────────

const contractStatusColor = {
  draft: "default",
  sent: "info",
  accepted: "success",
  rejected: "error",
  expired: "warning",
};

const ContractTab = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!record?.id) return;
    setLoading(true);
    apiFetch(`/contracts/booking/${record.id}`)
      .then(setContract)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [record?.id]);

  const handleSend = async () => {
    if (!contract?._id && !contract?.id) return;
    const contractId = contract._id || contract.id;
    setSending(true);
    try {
      await apiFetch(`/contracts/${contractId}/send`, { method: "POST" });
      notify("Contract sent successfully", { type: "success" });
      setContract((prev) => ({ ...prev, status: "sent", sentAt: new Date().toISOString() }));
      refresh();
    } catch (err) {
      notify(err.message, { type: "error" });
    } finally {
      setSending(false);
    }
  };

  if (!record) return null;
  if (loading) return <Box sx={{ p: 3, textAlign: "center" }}><CircularProgress size={28} /></Box>;
  if (error) return <Alert severity="info" sx={{ m: 2 }}>No contract found for this booking.</Alert>;
  if (!contract) return <Alert severity="info" sx={{ m: 2 }}>No contract found for this booking.</Alert>;

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="caption" color="text.secondary">Template Used</Typography>
          <Typography variant="body1">{contract.templateName || contract.templateId || "—"}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Typography variant="caption" color="text.secondary">Status</Typography>
          <Box sx={{ mt: 0.5 }}>
            <Chip
              label={(contract.status || "unknown").replace(/_/g, " ")}
              color={contractStatusColor[contract.status] || "default"}
              size="small"
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Typography variant="caption" color="text.secondary">Sent At</Typography>
          <Typography variant="body1">{contract.sentAt ? new Date(contract.sentAt).toLocaleString() : "—"}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Typography variant="caption" color="text.secondary">Accepted At</Typography>
          <Typography variant="body1">{contract.acceptedAt ? new Date(contract.acceptedAt).toLocaleString() : "—"}</Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <Typography variant="caption" color="text.secondary">Rejected At</Typography>
          <Typography variant="body1">{contract.rejectedAt ? new Date(contract.rejectedAt).toLocaleString() : "—"}</Typography>
        </Grid>
      </Grid>

      {contract.status === "draft" && (
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Contract"}
          </Button>
        </Box>
      )}

      {contract.body && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Contract Body</Typography>
            <Box
              sx={{
                p: 2,
                backgroundColor: "grey.50",
                borderRadius: 1,
                maxHeight: 500,
                overflow: "auto",
                fontSize: 14,
                "& *": { maxWidth: "100%" },
              }}
              dangerouslySetInnerHTML={{ __html: contract.body }}
            />
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

// ── Partners Tab ──────────────────────────────────────────────────────────────

const partnerStatusColor = {
  pending: "warning",
  confirmed: "success",
  rejected: "error",
  auto_confirmed: "info",
};

const PartnersTab = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [actionLoading, setActionLoading] = useState(null);

  if (!record) return null;

  const confirmations = record.partnerConfirmations || [];

  if (confirmations.length === 0) {
    return <Alert severity="info" sx={{ m: 2 }}>No partner confirmations for this booking.</Alert>;
  }

  const handleConfirm = async (partnerId) => {
    setActionLoading(`confirm-${partnerId}`);
    try {
      await apiFetch(`/bookings/${record.id}/partners/${partnerId}/confirm`, { method: "PUT" });
      notify("Partner confirmed", { type: "success" });
      refresh();
    } catch (err) {
      notify(err.message, { type: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (partnerId) => {
    setActionLoading(`reject-${partnerId}`);
    try {
      await apiFetch(`/bookings/${record.id}/partners/${partnerId}/reject`, { method: "PUT" });
      notify("Partner rejected", { type: "warning" });
      refresh();
    } catch (err) {
      notify(err.message, { type: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleSubstitution = async (partnerId) => {
    setActionLoading(`sub-${partnerId}`);
    try {
      const result = await apiFetch(`/bookings/${record.id}/substitutions/${partnerId}`);
      const suggestions = result.suggestions || result.data || result;
      if (Array.isArray(suggestions) && suggestions.length > 0) {
        notify(`Found ${suggestions.length} substitution option(s)`, { type: "info" });
      } else {
        notify("No substitution suggestions available", { type: "info" });
      }
    } catch (err) {
      notify(err.message, { type: "error" });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Partner Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Inventory Model</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {confirmations.map((pc, idx) => {
          const partnerId = pc.partnerId || pc._id || idx;
          const isPending = pc.status === "pending";
          return (
            <TableRow key={partnerId}>
              <TableCell>{pc.partnerName || pc.name || "—"}</TableCell>
              <TableCell>{pc.partnerType || pc.type || "—"}</TableCell>
              <TableCell>{pc.inventoryModel || "—"}</TableCell>
              <TableCell>
                <Chip
                  label={(pc.status || "pending").replace(/_/g, " ")}
                  color={partnerStatusColor[pc.status] || "default"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {isPending && (
                    <>
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        disabled={actionLoading === `confirm-${partnerId}`}
                        onClick={() => handleConfirm(partnerId)}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        disabled={actionLoading === `reject-${partnerId}`}
                        onClick={() => handleReject(partnerId)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<SwapHorizIcon />}
                    disabled={!!actionLoading}
                    onClick={() => handleSubstitution(partnerId)}
                  >
                    Suggest Substitution
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

// ── BookingShow ───────────────────────────────────────────────────────────────

const BookingShow = () => (
  <Show>
    <TabbedShowLayout>
      {/* Details Tab */}
      <TabbedShowLayout.Tab label="Details">
        <TextField source="bookingRef" label="Booking Reference" />
        <StatusBadge source="status" label="Status" />
        <TextField source="bookingType" label="Booking Type" />
        <ReferenceField source="userId" reference="customers" link="show" label="Customer">
          <TextField source="firstName" />
        </ReferenceField>
        <ReferenceField source="tourPackageId" reference="tours" link="show" label="Tour Package">
          <TextField source="title" />
        </ReferenceField>
        <NumberField source="groupSize" label="Group Size" />
        <MoneyField source="totalAmount" label="Total Amount" />
        <TextField source="currency" />
        <TextField source="specialRequests" label="Special Requests" />
        <DateField source="startDate" label="Start Date" />
        <DateField source="endDate" label="End Date" />
        <TextField source="contactInfo.name" label="Contact Name" />
        <TextField source="contactInfo.email" label="Contact Email" />
        <TextField source="contactInfo.phone" label="Contact Phone" />
        <StatusBadge source="paymentStatus" label="Payment Status" />
        <DateField source="createdAt" label="Created" showTime />
        <DateField source="updatedAt" label="Updated" showTime />
      </TabbedShowLayout.Tab>

      {/* Payments Tab */}
      <TabbedShowLayout.Tab label="Payments">
        <ReferenceManyField reference="payments" target="bookingId" label="Payments">
          <Datagrid bulkActionButtons={false}>
            <TextField source="transactionRef" label="Transaction Ref" />
            <MoneyField source="amount" label="Amount" />
            <StatusBadge source="status" label="Status" />
            <TextField source="provider" />
            <DateField source="createdAt" label="Date" />
          </Datagrid>
        </ReferenceManyField>
      </TabbedShowLayout.Tab>

      {/* Payment Plan Tab */}
      <TabbedShowLayout.Tab label="Payment Plan">
        <PaymentPlanTab />
      </TabbedShowLayout.Tab>

      {/* Contract Tab */}
      <TabbedShowLayout.Tab label="Contract">
        <ContractTab />
      </TabbedShowLayout.Tab>

      {/* Partners Tab */}
      <TabbedShowLayout.Tab label="Partners">
        <PartnersTab />
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);

export default BookingShow;
