import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  FunctionField,
  SelectInput,
  TextInput,
} from "react-admin";
import { Chip } from "@mui/material";

const statusColors = {
  pending: "warning",
  success: "success",
  failed: "error",
  refunded: "info",
};

const paymentFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <SelectInput
    source="status"
    choices={[
      { id: "pending", name: "Pending" },
      { id: "success", name: "Success" },
      { id: "failed", name: "Failed" },
      { id: "refunded", name: "Refunded" },
    ]}
  />,
  <SelectInput
    source="type"
    choices={[
      { id: "commitment_fee", name: "Commitment Fee" },
      { id: "milestone", name: "Milestone" },
      { id: "full_payment", name: "Full Payment" },
    ]}
  />,
  <TextInput source="provider" label="Provider" />,
];

const PaymentList = () => (
  <List
    filters={paymentFilters}
    sort={{ field: "createdAt", order: "DESC" }}
  >
    <Datagrid rowClick="show">
      <TextField source="transactionRef" label="Transaction Ref" />
      <ReferenceField source="bookingId" reference="bookings" link="show">
        <TextField source="bookingRef" />
      </ReferenceField>
      <FunctionField
        label="Amount"
        render={(record) =>
          `GHS ${Number(record.amount).toLocaleString("en-GH", {
            minimumFractionDigits: 2,
          })}`
        }
      />
      <FunctionField
        label="Type"
        render={(record) => (
          <Chip
            label={record.type?.replace(/_/g, " ")}
            size="small"
            variant="outlined"
          />
        )}
      />
      <FunctionField
        label="Status"
        render={(record) => (
          <Chip
            label={record.status}
            size="small"
            color={statusColors[record.status] || "default"}
          />
        )}
      />
      <TextField source="provider" />
      <DateField source="createdAt" label="Date" showTime />
    </Datagrid>
  </List>
);

export default PaymentList;
