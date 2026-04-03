import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  ShowButton,
  TextInput,
  SelectInput,
  DateInput,
} from "react-admin";
import StatusBadge from "../../components/StatusBadge";
import MoneyField from "../../components/MoneyField";

const bookingStatusChoices = [
  { id: "pending_payment", name: "Pending Payment" },
  { id: "confirmed", name: "Confirmed" },
  { id: "in_progress", name: "In Progress" },
  { id: "completed", name: "Completed" },
  { id: "cancelled", name: "Cancelled" },
  { id: "refunded", name: "Refunded" },
];

const bookingFilters = [
  <TextInput key="q" source="q" label="Search" alwaysOn />,
  <SelectInput key="status" source="status" choices={bookingStatusChoices} />,
  <SelectInput
    key="bookingType"
    source="bookingType"
    choices={[
      { id: "pre_packaged", name: "Pre-packaged" },
      { id: "dynamic", name: "Dynamic" },
    ]}
  />,
  <DateInput key="startDate" source="startDate" label="From Date" />,
  <DateInput key="endDate" source="endDate" label="To Date" />,
];

const BookingList = () => (
  <List
    filters={bookingFilters}
    sort={{ field: "createdAt", order: "DESC" }}
    perPage={25}
  >
    <Datagrid rowClick="show">
      <TextField source="bookingRef" label="Ref" />
      <ReferenceField source="userId" reference="customers" link="show">
        <TextField source="firstName" />
      </ReferenceField>
      <ReferenceField source="tourPackageId" reference="tours" link="show">
        <TextField source="title" />
      </ReferenceField>
      <StatusBadge source="status" label="Status" />
      <MoneyField source="totalAmount" label="Amount" />
      <TextField source="bookingType" label="Type" />
      <DateField source="createdAt" label="Created" />
      <ShowButton />
    </Datagrid>
  </List>
);

export default BookingList;
