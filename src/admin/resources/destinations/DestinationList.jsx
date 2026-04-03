import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  EditButton,
  TextInput,
  SelectInput,
  BooleanInput,
} from "react-admin";
import ToggleActiveButton from "../../components/ToggleActiveButton";

const ghanaRegions = [
  { id: "Greater Accra", name: "Greater Accra" },
  { id: "Central", name: "Central" },
  { id: "Western", name: "Western" },
  { id: "Eastern", name: "Eastern" },
  { id: "Ashanti", name: "Ashanti" },
  { id: "Volta", name: "Volta" },
  { id: "Northern", name: "Northern" },
  { id: "Upper East", name: "Upper East" },
  { id: "Upper West", name: "Upper West" },
  { id: "Bono", name: "Bono" },
  { id: "Bono East", name: "Bono East" },
  { id: "Ahafo", name: "Ahafo" },
  { id: "Savannah", name: "Savannah" },
  { id: "North East", name: "North East" },
  { id: "Oti", name: "Oti" },
  { id: "Western North", name: "Western North" },
];

const destinationFilters = [
  <TextInput key="q" source="q" label="Search" alwaysOn />,
  <SelectInput key="region" source="region" choices={ghanaRegions} />,
  <BooleanInput key="isActive" source="isActive" label="Active" />,
];

const DestinationList = () => (
  <List
    filters={destinationFilters}
    sort={{ field: "createdAt", order: "DESC" }}
    perPage={25}
  >
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="region" />
      <BooleanField source="isActive" label="Active" />
      <DateField source="createdAt" label="Created" />
      <ToggleActiveButton resource="destinations" />
      <EditButton />
    </Datagrid>
  </List>
);

export default DestinationList;
