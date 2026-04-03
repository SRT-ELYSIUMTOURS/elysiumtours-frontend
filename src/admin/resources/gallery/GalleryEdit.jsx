import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  ReferenceInput,
  required,
  FormDataConsumer,
} from "react-admin";
import ImageUploadField from "../../components/ImageUploadField";

const arrayToLines = (v) => (Array.isArray(v) ? v.join("\n") : v || "");
const linesToArray = (v) =>
  v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [];

const GalleryEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={required()} fullWidth />
      <SelectInput
        source="type"
        choices={[
          { id: "photo", name: "Photo" },
          { id: "video", name: "Video" },
        ]}
        validate={required()}
      />
      <ImageUploadField source="url" label="Image" />
      <ImageUploadField source="thumbnailUrl" label="Thumbnail" />
      <FormDataConsumer>
        {({ formData }) =>
          formData.type === "video" && (
            <TextInput source="videoUrl" label="Video URL" fullWidth />
          )
        }
      </FormDataConsumer>
      <ReferenceInput source="destinationId" reference="destinations">
        <SelectInput optionText="name" fullWidth />
      </ReferenceInput>
      <ReferenceInput source="tourPackageId" reference="tours">
        <SelectInput optionText="title" fullWidth />
      </ReferenceInput>
      <TextInput source="category" fullWidth />
      <TextInput
        source="tags"
        label="Tags (one per line)"
        multiline
        rows={3}
        format={arrayToLines}
        parse={linesToArray}
        fullWidth
      />
      <TextInput source="caption" multiline rows={3} fullWidth />
      <NumberInput source="sortOrder" label="Sort Order" />
      <BooleanInput source="isPublished" label="Published" />
    </SimpleForm>
  </Edit>
);

export default GalleryEdit;
