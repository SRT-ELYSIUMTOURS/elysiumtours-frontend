import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  required,
} from "react-admin";

const TemplateEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="subject" validate={required()} fullWidth />
      <SelectInput
        source="channel"
        choices={[
          { id: "email", name: "Email" },
          { id: "sms", name: "SMS" },
          { id: "whatsapp", name: "WhatsApp" },
          { id: "in_app", name: "In-App" },
        ]}
        validate={required()}
      />
      <TextInput
        source="body"
        label="Template Body"
        multiline
        rows={12}
        fullWidth
        helperText="Supports {{variables}} — e.g. {{customerName}}, {{bookingRef}}"
      />
      <TextInput
        source="variables"
        label="Variables (one per line)"
        multiline
        rows={4}
        format={(v) => (Array.isArray(v) ? v.join("\n") : v || "")}
        parse={(v) => (v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [])}
        fullWidth
      />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Edit>
);

export default TemplateEdit;
