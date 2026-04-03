import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  required,
} from "react-admin";
import ImageUploadField from "../../components/ImageUploadField";

const ghanaRegions = [
  { id: "Greater Accra", name: "Greater Accra" },
  { id: "Central", name: "Central" },
  { id: "Western", name: "Western" },
  { id: "Eastern", name: "Eastern" },
  { id: "Ashanti", name: "Ashanti" },
  { id: "Volta", name: "Volta" },
  { id: "Northern", name: "Northern" },
  { id: "Upper East", name: "Upper East" },
  { id: "Upper West", name: "Upper West" },
  { id: "Bono", name: "Bono" },
  { id: "Bono East", name: "Bono East" },
  { id: "Ahafo", name: "Ahafo" },
  { id: "Savannah", name: "Savannah" },
  { id: "North East", name: "North East" },
  { id: "Oti", name: "Oti" },
  { id: "Western North", name: "Western North" },
];

const DestinationEdit = () => (
  <Edit>
    <SimpleForm>
      <BooleanInput source="isActive" label="Active" />
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="slug" fullWidth />
      <SelectInput source="region" choices={ghanaRegions} validate={required()} />
      <TextInput source="description" multiline rows={4} fullWidth />
      <NumberInput source="gpsCoords.lat" label="Latitude" />
      <NumberInput source="gpsCoords.lng" label="Longitude" />
      <TextInput source="country" label="Country" defaultValue="Ghana" fullWidth />
      <TextInput source="subtitle" label="Subtitle / Tagline" fullWidth />
      <ImageUploadField source="coverImage" label="Cover Image" />
      <TextInput source="bestTimeToVisit" label="Best Time to Visit" fullWidth />
      <TextInput source="aboutText" label="About (detailed)" multiline rows={4} fullWidth />
      <TextInput source="travelTips" label="Travel Tips (one per line)" multiline rows={3}
        format={(v) => (Array.isArray(v) ? v.join("\n") : v || "")}
        parse={(v) => (v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [])}
        fullWidth
      />
    </SimpleForm>
  </Edit>
);

export default DestinationEdit;
