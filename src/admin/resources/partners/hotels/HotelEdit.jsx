import {
  Edit,
  TabbedForm,
  TextInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  required,
} from "react-admin";

const arrayToLines = (v) => (Array.isArray(v) ? v.join("\n") : v || "");
const linesToArray = (v) =>
  v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [];

const HotelEdit = () => (
  <Edit>
    <TabbedForm>
      <TabbedForm.Tab label="Details">
        <TextInput source="name" validate={required()} fullWidth />
        <TextInput source="slug" validate={required()} fullWidth />
        <TextInput source="description" multiline rows={4} fullWidth />
        <ReferenceInput source="destinationId" reference="destinations">
          <SelectInput optionText="name" validate={required()} fullWidth />
        </ReferenceInput>
        <TextInput source="address" fullWidth />
        <NumberInput
          source="starRating"
          validate={required()}
          min={1}
          max={5}
          step={1}
          fullWidth
        />
        <TextInput source="contactInfo.phone" label="Phone" fullWidth />
        <TextInput source="contactInfo.email" label="Email" fullWidth />
        <TextInput source="contactInfo.website" label="Website" fullWidth />
        <BooleanInput source="isActive" label="Active" fullWidth />
      </TabbedForm.Tab>

      <TabbedForm.Tab label="Rooms">
        <ArrayInput source="roomTypes">
          <SimpleFormIterator inline>
            <TextInput source="name" validate={required()} helperText={false} />
            <NumberInput source="capacity" validate={required()} helperText={false} />
            <NumberInput source="baseRate" validate={required()} helperText={false} />
            <SelectInput
              source="currency"
              choices={[
                { id: "GHS", name: "GHS" },
                { id: "USD", name: "USD" },
              ]}
              defaultValue="GHS"
              helperText={false}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </TabbedForm.Tab>

      <TabbedForm.Tab label="Business">
        <NumberInput
          source="commissionRate"
          label="Commission Rate"
          min={0}
          max={1}
          step={0.01}
          fullWidth
        />
        <TextInput
          source="amenities"
          label="Amenities (one per line)"
          multiline
          rows={4}
          format={arrayToLines}
          parse={linesToArray}
          fullWidth
        />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

export default HotelEdit;
