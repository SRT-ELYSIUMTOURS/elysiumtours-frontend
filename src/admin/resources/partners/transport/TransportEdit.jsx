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

const TransportEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="companyName" validate={required()} fullWidth />
      <TextInput source="slug" validate={required()} fullWidth />
      <TextInput source="description" multiline rows={4} fullWidth />
      <TextInput source="contactInfo.phone" label="Phone" fullWidth />
      <TextInput source="contactInfo.email" label="Email" fullWidth />
      <NumberInput
        source="baseRatePerKm"
        label="Base Rate per Km"
        validate={required()}
        min={0}
        fullWidth
      />
      <TextInput
        source="serviceAreas"
        label="Service Areas (one per line)"
        multiline
        rows={4}
        format={arrayToLines}
        parse={linesToArray}
        fullWidth
      />
      <BooleanInput source="isActive" label="Active" fullWidth />
    </SimpleForm>
  </Edit>
);

export default TransportEdit;
