import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";
import StatusBadge from "../../components/StatusBadge";
import MoneyField from "../../components/MoneyField";

const BookingShow = () => (
  <Show>
    <SimpleShowLayout>
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

      <ReferenceManyField reference="payments" target="bookingId" label="Payments">
        <Datagrid bulkActionButtons={false}>
          <TextField source="transactionRef" label="Transaction Ref" />
          <MoneyField source="amount" label="Amount" />
          <StatusBadge source="status" label="Status" />
          <TextField source="provider" />
          <DateField source="createdAt" label="Date" />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export default BookingShow;
