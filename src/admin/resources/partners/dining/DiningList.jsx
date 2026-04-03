import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ReferenceField,
  EditButton,
  TextInput,
  ReferenceInput,
  SelectInput,
  BooleanInput,
} from "react-admin";

const diningFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="destinationId" reference="destinations">
    <SelectInput optionText="name" />
  </ReferenceInput>,
  <TextInput source="cuisineType" label="Cuisine Type" />,
  <BooleanInput source="isActive" label="Active" />,
];

const DiningList = () => (
  <List
    filters={diningFilters}
    sort={{ field: "createdAt", order: "DESC" }}
  >
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="cuisineType" label="Cuisine" />
      <ReferenceField source="destinationId" reference="destinations" link="show">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="priceRange" label="Price Range" />
      <NumberField
        source="commissionRate"
        label="Commission (%)"
        options={{ style: "percent", maximumFractionDigits: 2 }}
      />
      <BooleanField source="isActive" label="Active" />
      <DateField source="createdAt" label="Created" />
      <EditButton />
    </Datagrid>
  </List>
);

export default DiningList;
