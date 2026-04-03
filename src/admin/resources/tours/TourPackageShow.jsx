import { useState, useEffect } from "react";
import {
  Show,
  TabbedShowLayout,
  TextField,
  BooleanField,
  DateField,
  NumberField,
  ReferenceField,
  ArrayField,
  Datagrid,
  ReferenceManyField,
  FunctionField,
  useRecordContext,
  useNotify,
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
  Alert,
} from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
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

const interestStatusColor = {
  new: "info",
  contacted: "primary",
  converted: "success",
  declined: "error",
  expired: "warning",
};

// ── Interests Tab ─────────────────────────────────────────────────────────────

const InterestsTab = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    if (!record?.id) return;
    setLoading(true);
    apiFetch(`/interests?tourPackageId=${record.id}`)
      .then((res) => {
        const rows = res.data || res.rows || res;
        setInterests(Array.isArray(rows) ? rows : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [record?.id]);

  const handleBulkInvite = async () => {
    if (!record?.id) return;
    setInviting(true);
    try {
      const result = await apiFetch(`/interests/bulk-invite/${record.id}`, { method: "POST" });
      const count = result.invited || result.count || 0;
      notify(`Invitations sent to ${count} interested customer(s)`, { type: "success" });
      // Re-fetch interests to reflect updated statuses
      const res = await apiFetch(`/interests?tourPackageId=${record.id}`);
      const rows = res.data || res.rows || res;
      setInterests(Array.isArray(rows) ? rows : []);
    } catch (err) {
      notify(err.message, { type: "error" });
    } finally {
      setInviting(false);
    }
  };

  if (!record) return null;
  if (loading) return <Box sx={{ p: 3, textAlign: "center" }}><CircularProgress size={28} /></Box>;
  if (error) return <Alert severity="info" sx={{ m: 2 }}>Could not load interests: {error}</Alert>;

  return (
    <Box>
      {interests.length > 0 && (
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<GroupAddIcon />}
            onClick={handleBulkInvite}
            disabled={inviting}
          >
            {inviting ? "Sending..." : "Convert to Invitations"}
          </Button>
        </Box>
      )}

      {interests.length === 0 ? (
        <Alert severity="info">No interests registered for this tour package.</Alert>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Group Size</TableCell>
              <TableCell>Preferred Dates</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Contact Preference</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interests.map((interest, idx) => (
              <TableRow key={interest._id || interest.id || idx}>
                <TableCell>{interest.customerName || interest.name || "—"}</TableCell>
                <TableCell>{interest.customerEmail || interest.email || "—"}</TableCell>
                <TableCell>{interest.groupSize ?? "—"}</TableCell>
                <TableCell>
                  {interest.preferredDates
                    ? Array.isArray(interest.preferredDates)
                      ? interest.preferredDates.map((d) => new Date(d).toLocaleDateString()).join(", ")
                      : new Date(interest.preferredDates).toLocaleDateString()
                    : "—"}
                </TableCell>
                <TableCell>
                  <Chip
                    label={(interest.status || "new").replace(/_/g, " ")}
                    color={interestStatusColor[interest.status] || "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{interest.contactPreference || "—"}</TableCell>
                <TableCell>{interest.notes || "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

// ── TourPackageShow ───────────────────────────────────────────────────────────

const TourPackageShow = () => (
  <Show>
    <TabbedShowLayout>
      {/* Details Tab */}
      <TabbedShowLayout.Tab label="Details">
        <TextField source="title" />
        <TextField source="slug" />
        <TextField source="description" />
        <ReferenceField source="destinationId" reference="destinations" link="edit">
          <TextField source="name" />
        </ReferenceField>
        <StatusBadge source="status" label="Status" />
        <BooleanField source="isActive" label="Active" />
        <TextField source="bookingType" label="Booking Type" />
        <TextField source="duration" label="Duration (days)" />
        <DateField source="createdAt" label="Created" showTime />
        <DateField source="updatedAt" label="Updated" showTime />
      </TabbedShowLayout.Tab>

      {/* Pricing Tab */}
      <TabbedShowLayout.Tab label="Pricing">
        <NumberField source="groupSize.min" label="Min Group Size" />
        <NumberField source="groupSize.max" label="Max Group Size" />
        <NumberField source="seatCapacity" label="Seat Capacity" />
        <NumberField source="seatsBooked" label="Seats Booked" />
        <ArrayField source="pricingTiers" label="Pricing Tiers">
          <Datagrid bulkActionButtons={false}>
            <NumberField source="minGroupSize" label="Min Group" />
            <NumberField source="maxGroupSize" label="Max Group" />
            <NumberField source="pricePerPerson" label="Price/Person" />
            <TextField source="currency" />
          </Datagrid>
        </ArrayField>
      </TabbedShowLayout.Tab>

      {/* Content Tab */}
      <TabbedShowLayout.Tab label="Content">
        <FunctionField
          label="Highlights"
          render={(record) => (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {record.highlights?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        />
        <FunctionField
          label="Inclusions"
          render={(record) => (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {record.inclusions?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        />
        <FunctionField
          label="Exclusions"
          render={(record) => (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {record.exclusions?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        />
      </TabbedShowLayout.Tab>

      {/* Bookings Tab */}
      <TabbedShowLayout.Tab label="Bookings">
        <ReferenceManyField reference="bookings" target="tourPackageId" label="Bookings">
          <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="bookingRef" label="Ref" />
            <StatusBadge source="status" label="Status" />
            <MoneyField source="totalAmount" label="Amount" />
            <DateField source="createdAt" label="Date" />
          </Datagrid>
        </ReferenceManyField>
      </TabbedShowLayout.Tab>

      {/* Interests Tab */}
      <TabbedShowLayout.Tab label="Interests">
        <InterestsTab />
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);

export default TourPackageShow;
