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

const hotelFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="destinationId" reference="destinations">
    <SelectInput optionText="name" />
  </ReferenceInput>,
  <SelectInput
    source="starRating"
    choices={[
      { id: 1, name: "1 Star" },
      { id: 2, name: "2 Stars" },
      { id: 3, name: "3 Stars" },
      { id: 4, name: "4 Stars" },
      { id: 5, name: "5 Stars" },
    ]}
  />,
  <BooleanInput source="isActive" label="Active" />,
];

const HotelList = () => (
  <List
    filters={hotelFilters}
    sort={{ field: "createdAt", order: "DESC" }}
  >
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <ReferenceField source="destinationId" reference="destinations" link="show">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="starRating" label="Stars" />
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

export default HotelList;
