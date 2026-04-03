import {
  Show,
  TabbedShowLayout,
  TextField,
  BooleanField,
  DateField,
  NumberField,
  ReferenceField,
  ArrayField,
  Datagrid,
  ReferenceManyField,
  FunctionField,
} from "react-admin";
import StatusBadge from "../../components/StatusBadge";
import MoneyField from "../../components/MoneyField";

const TourPackageShow = () => (
  <Show>
    <TabbedShowLayout>
      {/* Details Tab */}
      <TabbedShowLayout.Tab label="Details">
        <TextField source="title" />
        <TextField source="slug" />
        <TextField source="description" />
        <ReferenceField source="destinationId" reference="destinations" link="edit">
          <TextField source="name" />
        </ReferenceField>
        <StatusBadge source="status" label="Status" />
        <BooleanField source="isActive" label="Active" />
        <TextField source="bookingType" label="Booking Type" />
        <TextField source="duration" label="Duration (days)" />
        <DateField source="createdAt" label="Created" showTime />
        <DateField source="updatedAt" label="Updated" showTime />
      </TabbedShowLayout.Tab>

      {/* Pricing Tab */}
      <TabbedShowLayout.Tab label="Pricing">
        <NumberField source="groupSize.min" label="Min Group Size" />
        <NumberField source="groupSize.max" label="Max Group Size" />
        <NumberField source="seatCapacity" label="Seat Capacity" />
        <NumberField source="seatsBooked" label="Seats Booked" />
        <ArrayField source="pricingTiers" label="Pricing Tiers">
          <Datagrid bulkActionButtons={false}>
            <NumberField source="minGroupSize" label="Min Group" />
            <NumberField source="maxGroupSize" label="Max Group" />
            <NumberField source="pricePerPerson" label="Price/Person" />
            <TextField source="currency" />
          </Datagrid>
        </ArrayField>
      </TabbedShowLayout.Tab>

      {/* Content Tab */}
      <TabbedShowLayout.Tab label="Content">
        <FunctionField
          label="Highlights"
          render={(record) => (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {record.highlights?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        />
        <FunctionField
          label="Inclusions"
          render={(record) => (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {record.inclusions?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        />
        <FunctionField
          label="Exclusions"
          render={(record) => (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {record.exclusions?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        />
      </TabbedShowLayout.Tab>

      {/* Bookings Tab */}
      <TabbedShowLayout.Tab label="Bookings">
        <ReferenceManyField reference="bookings" target="tourPackageId" label="Bookings">
          <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="bookingRef" label="Ref" />
            <StatusBadge source="status" label="Status" />
            <MoneyField source="totalAmount" label="Amount" />
            <DateField source="createdAt" label="Date" />
          </Datagrid>
        </ReferenceManyField>
      </TabbedShowLayout.Tab>
    </TabbedShowLayout>
  </Show>
);

export default TourPackageShow;
