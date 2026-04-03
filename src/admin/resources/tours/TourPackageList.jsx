import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  ReferenceField,
  FunctionField,
  EditButton,
  ShowButton,
  TextInput,
  SelectInput,
  BooleanInput,
} from "react-admin";
import StatusBadge from "../../components/StatusBadge";
import MoneyField from "../../components/MoneyField";

const tourFilters = [
  <TextInput key="q" source="q" label="Search" alwaysOn />,
  <SelectInput
    key="status"
    source="status"
    choices={[
      { id: "draft", name: "Draft" },
      { id: "published", name: "Published" },
      { id: "archived", name: "Archived" },
    ]}
  />,
  <BooleanInput key="isActive" source="isActive" label="Active" />,
  <SelectInput
    key="bookingType"
    source="bookingType"
    choices={[
      { id: "group", name: "Group" },
      { id: "individual_seats", name: "Individual Seats" },
    ]}
  />,
];

const TourPackageList = () => (
  <List
    filters={tourFilters}
    sort={{ field: "createdAt", order: "DESC" }}
    perPage={25}
  >
    <Datagrid rowClick="show">
      <TextField source="title" />
      <ReferenceField source="destinationId" reference="destinations" link="edit">
        <TextField source="name" />
      </ReferenceField>
      <StatusBadge source="status" />
      <BooleanField source="isActive" label="Active" />
      <TextField source="bookingType" label="Booking Type" />
      <TextField source="duration" label="Duration" />
      <FunctionField
        label="Base Price"
        render={(record) => {
          const tier = record.pricingTiers && record.pricingTiers[0];
          if (!tier) return "N/A";
          return `${tier.currency || "GHS"} ${tier.pricePerPerson?.toFixed(2) || "0.00"}`;
        }}
      />
      <DateField source="createdAt" label="Created" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export default TourPackageList;
