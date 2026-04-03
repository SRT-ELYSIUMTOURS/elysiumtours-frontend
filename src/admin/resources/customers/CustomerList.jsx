import {
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  DateField,
  TextInput,
  SelectInput,
  BooleanInput,
} from "react-admin";
import StatusBadge from "../../components/StatusBadge";

const customerFilters = [
  <TextInput key="q" source="q" label="Search" alwaysOn />,
  <SelectInput
    key="status"
    source="status"
    choices={[
      { id: "active", name: "Active" },
      { id: "inactive", name: "Inactive" },
      { id: "suspended", name: "Suspended" },
    ]}
  />,
  <SelectInput
    key="role"
    source="role"
    choices={[
      { id: "customer", name: "Customer" },
      { id: "admin", name: "Admin" },
      { id: "staff", name: "Staff" },
      { id: "partner", name: "Partner" },
    ]}
  />,
  <BooleanInput key="isVerified" source="isVerified" label="Verified" />,
];

const CustomerList = () => (
  <List
    filters={customerFilters}
    sort={{ field: "createdAt", order: "DESC" }}
    perPage={25}
  >
    <Datagrid rowClick="show">
      <TextField source="firstName" label="First Name" />
      <TextField source="lastName" label="Last Name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <TextField source="role" />
      <StatusBadge source="status" label="Status" />
      <BooleanField source="isVerified" label="Verified" />
      <DateField source="lastLogin" label="Last Login" showTime />
      <DateField source="createdAt" label="Joined" />
    </Datagrid>
  </List>
);

export default CustomerList;
