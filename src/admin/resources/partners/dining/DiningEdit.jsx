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

const DiningEdit = () => (
  <Edit>
    <TabbedForm>
      <TabbedForm.Tab label="Details">
        <TextInput source="name" validate={required()} fullWidth />
        <TextInput source="slug" validate={required()} fullWidth />
        <TextInput source="description" multiline rows={4} fullWidth />
        <ReferenceInput source="destinationId" reference="destinations">
          <SelectInput optionText="name" validate={required()} fullWidth />
        </ReferenceInput>
        <TextInput source="cuisineType" label="Cuisine Type" validate={required()} fullWidth />
        <SelectInput
          source="priceRange"
          validate={required()}
          choices={[
            { id: "budget", name: "Budget" },
            { id: "moderate", name: "Moderate" },
            { id: "premium", name: "Premium" },
            { id: "luxury", name: "Luxury" },
          ]}
          fullWidth
        />
        <TextInput source="contactInfo.phone" label="Phone" fullWidth />
        <TextInput source="contactInfo.email" label="Email" fullWidth />
        <TextInput source="coverImage" label="Cover Image URL" fullWidth />
        <BooleanInput source="isActive" label="Active" fullWidth />
      </TabbedForm.Tab>

      <TabbedForm.Tab label="Menu">
        <ArrayInput source="menuOptions">
          <SimpleFormIterator inline>
            <TextInput source="name" validate={required()} helperText={false} />
            <TextInput source="description" helperText={false} />
            <NumberInput source="price" validate={required()} helperText={false} />
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
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

export default DiningEdit;
