import { Create, SimpleForm, TextInput, required } from "react-admin";
import ImageUploadField from "../../components/ImageUploadField";

const GuideCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="email" fullWidth />
      <TextInput source="phone" fullWidth />
      <TextInput source="bio" multiline rows={4} fullWidth />
      <TextInput source="specialities" label="Specialities (one per line)" multiline rows={3}
        format={(v) => (Array.isArray(v) ? v.join("\n") : v || "")}
        parse={(v) => (v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [])}
        fullWidth
      />
      <TextInput source="languages" label="Languages (one per line)" multiline rows={2}
        format={(v) => (Array.isArray(v) ? v.join("\n") : v || "")}
        parse={(v) => (v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [])}
        fullWidth
        defaultValue="English"
      />
      <ImageUploadField source="avatar" label="Avatar" />
    </SimpleForm>
  </Create>
);

export default GuideCreate;
