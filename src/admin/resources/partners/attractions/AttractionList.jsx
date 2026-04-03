import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  DateField,
  ReferenceField,
  FunctionField,
  EditButton,
  TextInput,
  ReferenceInput,
  SelectInput,
  BooleanInput,
} from "react-admin";

const attractionFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="destinationId" reference="destinations">
    <SelectInput optionText="name" />
  </ReferenceInput>,
  <SelectInput
    source="type"
    choices={[
      { id: "cultural", name: "Cultural" },
      { id: "natural", name: "Natural" },
      { id: "historical", name: "Historical" },
      { id: "adventure", name: "Adventure" },
      { id: "entertainment", name: "Entertainment" },
    ]}
  />,
  <BooleanInput source="isActive" label="Active" />,
];

const AttractionList = () => (
  <List
    filters={attractionFilters}
    sort={{ field: "createdAt", order: "DESC" }}
  >
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="type" />
      <ReferenceField source="destinationId" reference="destinations" link="show">
        <TextField source="name" />
      </ReferenceField>
      <FunctionField
        label="Entry Fee"
        render={(record) =>
          record.entryFee != null
            ? `${record.currency || "GHS"} ${record.entryFee.toFixed(2)}`
            : "-"
        }
      />
      <BooleanField source="isActive" label="Active" />
      <DateField source="createdAt" label="Created" />
      <EditButton />
    </Datagrid>
  </List>
);

export default AttractionList;
