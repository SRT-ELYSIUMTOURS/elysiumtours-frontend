import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  BooleanInput,
  required,
} from "react-admin";

const TemplateCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth helperText="Unique identifier e.g. booking_confirmation" />
      <TextInput source="subject" validate={required()} fullWidth helperText="Email subject line — supports {{variables}}" />
      <SelectInput
        source="channel"
        choices={[
          { id: "email", name: "Email" },
          { id: "sms", name: "SMS" },
          { id: "whatsapp", name: "WhatsApp" },
          { id: "in_app", name: "In-App" },
        ]}
        defaultValue="email"
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
        helperText="List template variables used in subject/body"
      />
      <BooleanInput source="isActive" label="Active" defaultValue={true} />
    </SimpleForm>
  </Create>
);

export default TemplateCreate;
