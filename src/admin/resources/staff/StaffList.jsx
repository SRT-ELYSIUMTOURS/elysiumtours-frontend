import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
  EditButton,
  TextInput,
  SelectInput,
} from "react-admin";
import { Chip } from "@mui/material";

const staffFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <SelectInput
    source="role"
    choices={[
      { id: "staff", name: "Staff" },
      { id: "admin", name: "Admin" },
    ]}
  />,
  <SelectInput
    source="status"
    choices={[
      { id: "active", name: "Active" },
      { id: "inactive", name: "Inactive" },
      { id: "suspended", name: "Suspended" },
    ]}
  />,
];

const StaffList = () => (
  <List
    filters={staffFilters}
    filterDefaultValues={{ role: "staff" }}
    sort={{ field: "createdAt", order: "DESC" }}
  >
    <Datagrid rowClick="edit">
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="email" />
      <FunctionField
        label="Role"
        render={(record) => (
          <Chip
            label={record.role}
            size="small"
            color={record.role === "admin" ? "secondary" : "default"}
          />
        )}
      />
      <FunctionField
        label="Status"
        render={(record) => (
          <Chip
            label={record.status}
            size="small"
            color={record.status === "active" ? "success" : "error"}
          />
        )}
      />
      <DateField source="lastLogin" showTime />
      <DateField source="createdAt" label="Joined" />
      <EditButton />
    </Datagrid>
  </List>
);

export default StaffList;
