import { Edit, SimpleForm, SelectInput, required } from "react-admin";

const bookingStatusChoices = [
  { id: "pending_payment", name: "Pending Payment" },
  { id: "confirmed", name: "Confirmed" },
  { id: "in_progress", name: "In Progress" },
  { id: "completed", name: "Completed" },
  { id: "cancelled", name: "Cancelled" },
  { id: "refunded", name: "Refunded" },
];

const BookingEdit = () => (
  <Edit>
    <SimpleForm>
      <SelectInput
        source="status"
        choices={bookingStatusChoices}
        validate={required()}
      />
    </SimpleForm>
  </Edit>
);

export default BookingEdit;
