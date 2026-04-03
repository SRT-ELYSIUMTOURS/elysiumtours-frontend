import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  NumberField,
  ReferenceField,
  FunctionField,
  EditButton,
  TextInput,
  SelectInput,
  BooleanInput,
} from "react-admin";
import { Chip } from "@mui/material";

const galleryFilters = [
  <TextInput key="q" source="q" label="Search" alwaysOn />,
  <SelectInput
    key="type"
    source="type"
    choices={[
      { id: "photo", name: "Photo" },
      { id: "video", name: "Video" },
    ]}
  />,
  <TextInput key="category" source="category" label="Category" />,
  <BooleanInput key="isPublished" source="isPublished" label="Published" />,
];

const GalleryList = () => (
  <List
    filters={galleryFilters}
    sort={{ field: "createdAt", order: "DESC" }}
    perPage={25}
  >
    <Datagrid rowClick="edit">
      <FunctionField
        label="Thumbnail"
        render={(record) => {
          const src = record.thumbnailUrl || record.url;
          if (!src) return null;
          return (
            <img
              src={src}
              alt={record.title || ""}
              style={{ width: 60, height: 45, objectFit: "cover", borderRadius: 4 }}
            />
          );
        }}
      />
      <TextField source="title" />
      <FunctionField
        label="Type"
        render={(record) => (
          <Chip
            label={record.type || "photo"}
            size="small"
            color={record.type === "video" ? "secondary" : "primary"}
            variant="outlined"
          />
        )}
      />
      <TextField source="category" />
      <ReferenceField source="destinationId" reference="destinations" link="edit" label="Destination">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField source="isPublished" label="Published" />
      <NumberField source="sortOrder" label="Sort Order" />
      <DateField source="createdAt" label="Created" />
      <EditButton />
    </Datagrid>
  </List>
);

export default GalleryList;
