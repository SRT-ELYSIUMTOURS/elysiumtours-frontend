import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  EditButton,
  TextInput,
  BooleanInput,
} from "react-admin";
import ToggleActiveButton from "../../components/ToggleActiveButton";

const countryFilters = [
  <TextInput key="q" source="q" label="Search" alwaysOn />,
  <BooleanInput key="isActive" source="isActive" label="Active" />,
];

const CountryList = () => (
  <List
    filters={countryFilters}
    sort={{ field: "name", order: "ASC" }}
    perPage={25}
  >
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="currency" />
      <TextField source="timeZone" label="Time Zone" />
      <BooleanField source="isActive" label="Active" />
      <DateField source="createdAt" label="Created" />
      <ToggleActiveButton resource="countries" />
      <EditButton />
    </Datagrid>
  </List>
);

export default CountryList;
