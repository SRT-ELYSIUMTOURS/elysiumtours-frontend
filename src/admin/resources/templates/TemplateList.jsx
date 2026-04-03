import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  FunctionField,
  EditButton,
  TextInput,
  BooleanInput,
  SelectInput,
} from "react-admin";
import { Chip } from "@mui/material";

const channelColors = {
  email: "primary",
  sms: "secondary",
  whatsapp: "success",
  in_app: "info",
};

const filters = [
  <TextInput key="q" source="q" label="Search" alwaysOn />,
  <SelectInput key="channel" source="channel" choices={[
    { id: "email", name: "Email" },
    { id: "sms", name: "SMS" },
    { id: "whatsapp", name: "WhatsApp" },
    { id: "in_app", name: "In-App" },
  ]} />,
  <BooleanInput key="isActive" source="isActive" label="Active" />,
];

const TemplateList = () => (
  <List filters={filters} sort={{ field: "name", order: "ASC" }} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="subject" />
      <FunctionField
        label="Channel"
        render={(record) => (
          <Chip label={record.channel} size="small" color={channelColors[record.channel] || "default"} />
        )}
      />
      <BooleanField source="isActive" label="Active" />
      <FunctionField
        label="Variables"
        render={(record) => (Array.isArray(record.variables) ? record.variables.length : 0)}
      />
      <DateField source="createdAt" label="Created" />
      <EditButton />
    </Datagrid>
  </List>
);

export default TemplateList;
