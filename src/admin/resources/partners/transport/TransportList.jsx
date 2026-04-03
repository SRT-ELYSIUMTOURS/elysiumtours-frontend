import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  FunctionField,
  EditButton,
  TextInput,
  BooleanInput,
} from "react-admin";
import Chip from "@mui/material/Chip";

const transportFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <BooleanInput source="isActive" label="Active" />,
];

const TransportList = () => (
  <List
    filters={transportFilters}
    sort={{ field: "createdAt", order: "DESC" }}
  >
    <Datagrid rowClick="edit">
      <TextField source="companyName" label="Company" />
      <NumberField source="baseRatePerKm" label="Rate/km" />
      <BooleanField source="isActive" label="Active" />
      <FunctionField
        label="Service Areas"
        render={(record) =>
          record.serviceAreas?.map((area, i) => (
            <Chip key={i} label={area} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))
        }
      />
      <DateField source="createdAt" label="Created" />
      <EditButton />
    </Datagrid>
  </List>
);

export default TransportList;
