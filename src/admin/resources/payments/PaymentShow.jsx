import {
  Show,
  TabbedShowLayout,
  TextField,
  DateField,
  ReferenceField,
  FunctionField,
  useRecordContext,
  TopToolbar,
} from "react-admin";
import { Button, Chip } from "@mui/material";

const statusColors = {
  pending: "warning",
  success: "success",
  failed: "error",
  refunded: "info",
};

const RefundButton = () => {
  const record = useRecordContext();
  if (!record || record.status !== "success") return null;

  const handleRefund = () => {
    // Placeholder: will connect to refund endpoint
    alert(`Refund initiated for transaction ${record.transactionRef}`);
  };

  return (
    <Button variant="outlined" color="error" onClick={handleRefund}>
      Initiate Refund
    </Button>
  );
};

const PaymentShowActions = () => (
  <TopToolbar>
    <RefundButton />
  </TopToolbar>
);

const PaymentShow = () => (
  <Show actions={<PaymentShowActions />}>
    <TabbedShowLayout>
      <TabbedShowLayout.Tab label="Details">
        <TextField source="transactionRef" label="Transaction Reference" />
        <ReferenceField source="bookingId" reference="bookings" link="show">
          <TextField source="bookingRef" />
        </ReferenceField>
        <ReferenceField source="userId" reference="customers" link="show">
          <TextField source="email" />
        </ReferenceField>
        <FunctionField
          label="Amount"
          render={(record) =>
            `GHS ${Number(record.amount).toLocaleString("en-GH", {
              minimumFractionDigits: 2,
            })}`
          }
        />
        <TextField source="currency" />
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
        <DateField source="createdAt" label="Created" showTime />
      </TabbedShowLayout.Tab>
      <TabbedShowLayout.Tab label="Metadata">
        <FunctionField
          label="Metadata"
          render={(record) =>
            record.metadata ? (
              <pre style={{ fontSize: 12, whiteSpace: "pre-wrap" }}>
                {JSON.stringify(record.metadata, null, 2)}
              </pre>
            ) : (
              "—"
            )
          }
        />
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);

export default PaymentShow;
