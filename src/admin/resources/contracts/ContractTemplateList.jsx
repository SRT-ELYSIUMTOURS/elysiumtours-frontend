import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  NumberField,
  DateField,
  FunctionField,
  EditButton,
  TextInput,
  BooleanInput,
} from "react-admin";

const contractFilters = [
  <TextInput key="q" source="q" label="Search" alwaysOn />,
  <BooleanInput key="isActive" source="isActive" label="Active" />,
];

const ContractTemplateList = () => (
  <List
    filters={contractFilters}
    sort={{ field: "createdAt", order: "DESC" }}
    perPage={25}
  >
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <TextField source="title" />
      <NumberField source="version" label="Version" />
      <BooleanField source="isActive" label="Active" />
      <FunctionField
        label="Variables"
        render={(record) => {
          const vars = record.variables;
          return Array.isArray(vars) ? vars.length : 0;
        }}
      />
      <DateField source="createdAt" label="Created" />
      <EditButton />
    </Datagrid>
  </List>
);

export default ContractTemplateList;
