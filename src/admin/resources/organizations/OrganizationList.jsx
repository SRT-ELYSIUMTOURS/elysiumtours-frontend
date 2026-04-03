import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
  ShowButton,
  TextInput,
  SelectInput,
} from "react-admin";
import { Chip } from "@mui/material";

const statusColors = {
  active: "success",
  trial: "info",
  suspended: "error",
};

const filters = [
  <TextInput key="q" source="q" label="Search" alwaysOn />,
  <SelectInput
    key="status"
    source="status"
    choices={[
      { id: "active", name: "Active" },
      { id: "trial", name: "Trial" },
      { id: "suspended", name: "Suspended" },
    ]}
  />,
];

const OrganizationList = () => (
  <List
    filters={filters}
    sort={{ field: "createdAt", order: "DESC" }}
    resource="organizations"
  >
    <Datagrid rowClick="show">
      <TextField source="name" label="Organization" />
      <TextField source="contactEmail" label="Contact" />
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
      <FunctionField
        label="Plan"
        render={(record) => (
          <Chip
            label={record.subscription?.plan || "free"}
            size="small"
            variant="outlined"
          />
        )}
      />
      <FunctionField
        label="Users"
        render={(record) => record.userCount ?? "—"}
      />
      <FunctionField
        label="Bookings"
        render={(record) => record.bookingCount ?? "—"}
      />
      <DateField source="createdAt" label="Created" />
      <ShowButton />
    </Datagrid>
  </List>
);

export default OrganizationList;
