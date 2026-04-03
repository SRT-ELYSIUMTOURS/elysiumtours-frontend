import {
  Edit,
  TabbedForm,
  TextInput,
  NumberInput,
  SelectInput,
  BooleanInput,
  ReferenceInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ArrayInput,
  SimpleFormIterator,
  required,
} from "react-admin";

const arrayToLines = (v) => (Array.isArray(v) ? v.join("\n") : v || "");
const linesToArray = (v) =>
  v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [];

const TourPackageEdit = () => (
  <Edit>
    <TabbedForm>
      {/* Details Tab */}
      <TabbedForm.Tab label="Details">
        <BooleanInput source="isActive" label="Active" />
        <TextInput source="title" validate={required()} fullWidth />
        <TextInput source="slug" fullWidth />
        <TextInput source="description" multiline rows={4} fullWidth />
        <ReferenceInput source="destinationId" reference="destinations">
          <SelectInput optionText="name" validate={required()} fullWidth />
        </ReferenceInput>
        <SelectInput
          source="bookingType"
          choices={[
            { id: "group", name: "Group" },
            { id: "individual_seats", name: "Individual Seats" },
          ]}
          validate={required()}
        />
        <NumberInput source="duration" label="Duration (days)" validate={required()} />
        <SelectInput
          source="status"
          choices={[
            { id: "draft", name: "Draft" },
            { id: "published", name: "Published" },
            { id: "archived", name: "Archived" },
          ]}
        />
        <SelectInput source="tourType" label="Tour Type" choices={[
          { id: "day_tour", name: "Day Tour" },
          { id: "multi_day", name: "Multi-Day" },
          { id: "express", name: "Express" },
        ]} defaultValue="multi_day" />
        <TextInput source="country" label="Country" defaultValue="Ghana" fullWidth />
        <TextInput source="tags" label="Tags (one per line)" multiline rows={3}
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
        <TextInput source="cancellationPolicy" label="Cancellation Policy" fullWidth />
        <TextInput source="availabilitySchedule" label="Availability (e.g., Opened Daily)" fullWidth />
        <BooleanInput source="pickupIncluded" label="Pickup Included" />
        <TextInput source="pickupLocation" label="Pickup Location" fullWidth />
        <SelectInput source="difficulty" label="Difficulty" choices={[
          { id: "easy", name: "Easy" },
          { id: "moderate", name: "Moderate" },
          { id: "challenging", name: "Challenging" },
        ]} defaultValue="easy" />
        <TextInput source="bestFor" label="Best For (one per line)" multiline rows={2}
          format={(v) => (Array.isArray(v) ? v.join("\n") : v || "")}
          parse={(v) => (v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [])}
          fullWidth
        />
        <ReferenceInput source="guideId" reference="guides" allowEmpty>
          <SelectInput optionText="name" />
        </ReferenceInput>
      </TabbedForm.Tab>

      {/* Media Tab */}
      <TabbedForm.Tab label="Media">
        <TextInput source="coverImage" label="Cover Image URL" fullWidth />
        <TextInput source="heroImages" label="Hero Images (one URL per line)" multiline rows={3}
          format={(v) => (Array.isArray(v) ? v.join("\n") : v || "")}
          parse={(v) => (v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [])}
          fullWidth
        />
      </TabbedForm.Tab>

      {/* Group & Pricing Tab */}
      <TabbedForm.Tab label="Group & Pricing">
        <NumberInput source="groupSize.min" label="Min Group Size" validate={required()} />
        <NumberInput source="groupSize.max" label="Max Group Size" validate={required()} />
        <NumberInput source="seatCapacity" label="Seat Capacity (for individual seats)" />
        <ArrayInput source="pricingTiers" label="Pricing Tiers">
          <SimpleFormIterator inline>
            <NumberInput source="minGroupSize" label="Min Group Size" />
            <NumberInput source="maxGroupSize" label="Max Group Size" />
            <NumberInput source="pricePerPerson" label="Price Per Person" validate={required()} />
            <SelectInput
              source="currency"
              choices={[
                { id: "GHS", name: "GHS" },
                { id: "USD", name: "USD" },
              ]}
              defaultValue="GHS"
            />
          </SimpleFormIterator>
        </ArrayInput>
      </TabbedForm.Tab>

      {/* Content Tab */}
      <TabbedForm.Tab label="Content">
        <TextInput
          source="highlights"
          label="Highlights (one per line)"
          multiline
          rows={4}
          format={arrayToLines}
          parse={linesToArray}
          fullWidth
        />
        <TextInput
          source="inclusions"
          label="Inclusions (one per line)"
          multiline
          rows={4}
          format={arrayToLines}
          parse={linesToArray}
          fullWidth
        />
        <TextInput
          source="exclusions"
          label="Exclusions (one per line)"
          multiline
          rows={4}
          format={arrayToLines}
          parse={linesToArray}
          fullWidth
        />
      </TabbedForm.Tab>

      {/* Partners Tab */}
      <TabbedForm.Tab label="Partners">
        <ReferenceInput source="hotelPartnerId" reference="hotels">
          <SelectInput optionText="name" fullWidth />
        </ReferenceInput>
        <ReferenceArrayInput source="attractionIds" reference="attractions">
          <AutocompleteArrayInput optionText="name" />
        </ReferenceArrayInput>
        <ReferenceArrayInput source="diningIds" reference="dining">
          <AutocompleteArrayInput optionText="name" />
        </ReferenceArrayInput>
        <SelectInput
          source="transportType"
          choices={[
            { id: "bus", name: "Bus" },
            { id: "minibus", name: "Minibus" },
            { id: "van", name: "Van" },
            { id: "suv", name: "SUV" },
            { id: "sedan", name: "Sedan" },
          ]}
        />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

export default TourPackageEdit;
