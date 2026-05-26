import { Edit, SimpleForm, TextInput, BooleanInput, required } from "react-admin";
import ImageUploadField from "../../components/ImageUploadField";

const CountryEdit = () => (
  <Edit>
    <SimpleForm>
      <BooleanInput source="isActive" label="Active" />

      {/* Factual fields */}
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="currency" label="Currency (e.g. Ghanaian Cedi (GHS))" fullWidth />
      <TextInput source="languages" label="Languages (e.g. English, Twi, Ga)" fullWidth />
      <TextInput source="mainAirport" label="Main Airport" fullWidth />
      <TextInput source="timeZone" label="Time Zone (e.g. GMT+0)" fullWidth />
      <TextInput
        source="flagColors"
        label="Flag Colours (comma-separated hex, e.g. #CE1126,#FCD116,#006B3F)"
        fullWidth
        format={(v) => (Array.isArray(v) ? v.join(",") : v || "")}
        parse={(v) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [])}
      />

      {/* Hero section */}
      <TextInput source="heroTitle" label="Hero Title" fullWidth />
      <TextInput source="heroSubtitle" label="Hero Subtitle" multiline rows={2} fullWidth />

      {/* Why [Country] section */}
      <TextInput source="whyTitle" label="Why Title" fullWidth />
      <TextInput
        source="whyParagraphs"
        label="Why Paragraphs (separate paragraphs with --- on its own line)"
        multiline
        rows={6}
        fullWidth
        format={(v) => (Array.isArray(v) ? v.join("\n---\n") : v || "")}
        parse={(v) =>
          v
            ? v.split("---").map((s) => s.trim()).filter(Boolean)
            : []
        }
      />
      <TextInput
        source="whyStats"
        label='Why Stats (JSON array, e.g. [{"label":"Independence","value":"6th March 1957"}])'
        multiline
        rows={4}
        fullWidth
        format={(v) => (Array.isArray(v) ? JSON.stringify(v, null, 2) : v || "[]")}
        parse={(v) => {
          try { return JSON.parse(v); } catch { return []; }
        }}
      />
      <ImageUploadField source="whyImage" label="Why Section Image" />
      <TextInput source="whyImageTitle" label="Image Caption Title" fullWidth />
      <TextInput source="whyImageSubtitle" label="Image Caption Subtitle" fullWidth />
    </SimpleForm>
  </Edit>
);

export default CountryEdit;
