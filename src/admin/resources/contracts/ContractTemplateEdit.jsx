import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  BooleanInput,
  required,
} from "react-admin";

const arrayToLines = (v) => (Array.isArray(v) ? v.join("\n") : v || "");
const linesToArray = (v) =>
  v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [];

const ContractTemplateEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="title" validate={required()} fullWidth />
      <TextInput source="body" label="Body (rich text)" multiline rows={10} fullWidth />
      <TextInput
        source="variables"
        label="Variables (one per line)"
        multiline
        rows={4}
        format={arrayToLines}
        parse={linesToArray}
        fullWidth
      />
      <TextInput source="cancellationClause" label="Cancellation Clause" multiline rows={4} fullWidth />
      <TextInput source="availabilityClause" label="Availability Clause" multiline rows={4} fullWidth />
      <BooleanInput source="isActive" label="Active" />
      <NumberInput source="version" label="Version" disabled />
    </SimpleForm>
  </Edit>
);

export default ContractTemplateEdit;
