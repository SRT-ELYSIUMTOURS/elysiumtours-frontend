import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  required,
} from "react-admin";
import ImageUploadField from "../../../components/ImageUploadField";

const AttractionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={required()} fullWidth />
      <TextInput source="slug" validate={required()} fullWidth />
      <TextInput source="description" multiline rows={4} fullWidth />
      <ReferenceInput source="destinationId" reference="destinations">
        <SelectInput optionText="name" validate={required()} fullWidth />
      </ReferenceInput>
      <SelectInput
        source="type"
        validate={required()}
        choices={[
          { id: "cultural", name: "Cultural" },
          { id: "natural", name: "Natural" },
          { id: "historical", name: "Historical" },
          { id: "adventure", name: "Adventure" },
          { id: "entertainment", name: "Entertainment" },
        ]}
        fullWidth
      />
      <NumberInput source="entryFee" min={0} fullWidth />
      <SelectInput
        source="currency"
        choices={[
          { id: "GHS", name: "GHS" },
          { id: "USD", name: "USD" },
        ]}
        defaultValue="GHS"
        fullWidth
      />
      <TextInput source="operatingHours.open" label="Opening Time" fullWidth />
      <TextInput source="operatingHours.close" label="Closing Time" fullWidth />
      <ImageUploadField source="coverImage" label="Cover Image" />
      <TextInput source="duration" label="Duration (e.g., 2-3 hours)" fullWidth />
      <TextInput source="suitableFor" label="Suitable For (one per line)" multiline rows={2}
        format={(v) => (Array.isArray(v) ? v.join("\n") : v || "")}
        parse={(v) => (v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [])}
        fullWidth
      />
    </SimpleForm>
  </Create>
);

export default AttractionCreate;
