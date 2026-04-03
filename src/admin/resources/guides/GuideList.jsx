import {
  List, Datagrid, TextField, NumberField, BooleanField, DateField,
  FunctionField, EditButton, TextInput, BooleanInput,
} from "react-admin";
import { Chip } from "@mui/material";

const filters = [
  <TextInput key="q" source="q" label="Search" alwaysOn />,
  <BooleanInput key="isActive" source="isActive" label="Active Only" />,
];

const GuideList = () => (
  <List filters={filters} sort={{ field: "createdAt", order: "DESC" }}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="email" />
      <FunctionField label="Specialities" render={(r) =>
        r.specialities?.map((s, i) => <Chip key={i} label={s} size="small" sx={{ mr: 0.5 }} />) || "—"
      } />
      <FunctionField label="Languages" render={(r) =>
        r.languages?.map((l, i) => <Chip key={i} label={l} size="small" variant="outlined" sx={{ mr: 0.5 }} />) || "—"
      } />
      <NumberField source="rating" />
      <NumberField source="reviewCount" label="Reviews" />
      <BooleanField source="isActive" />
      <DateField source="createdAt" label="Joined" />
      <EditButton />
    </Datagrid>
  </List>
);

export default GuideList;
