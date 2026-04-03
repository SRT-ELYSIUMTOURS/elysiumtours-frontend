import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  BooleanField,
  DateField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";
import StatusBadge from "../../components/StatusBadge";
import MoneyField from "../../components/MoneyField";

const CustomerShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="firstName" label="First Name" />
      <TextField source="lastName" label="Last Name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="role" />
      <StatusBadge source="status" label="Status" />
      <BooleanField source="isVerified" label="Verified" />
      <DateField source="lastLogin" label="Last Login" showTime />
      <DateField source="createdAt" label="Joined" showTime />

      <ReferenceManyField reference="bookings" target="userId" label="Bookings">
        <Datagrid rowClick="show" bulkActionButtons={false}>
          <TextField source="bookingRef" label="Ref" />
          <StatusBadge source="status" label="Status" />
          <MoneyField source="totalAmount" label="Amount" />
          <TextField source="bookingType" label="Type" />
          <DateField source="createdAt" label="Date" />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);

export default CustomerShow;
