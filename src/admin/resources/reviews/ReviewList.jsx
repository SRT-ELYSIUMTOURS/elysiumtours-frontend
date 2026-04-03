import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  DateField,
  ReferenceField,
  FunctionField,
  ShowButton,
  SelectInput,
  BooleanInput,
} from "react-admin";

const reviewFilters = [
  <SelectInput
    key="rating"
    source="rating"
    choices={[
      { id: 1, name: "1 Star" },
      { id: 2, name: "2 Stars" },
      { id: 3, name: "3 Stars" },
      { id: 4, name: "4 Stars" },
      { id: 5, name: "5 Stars" },
    ]}
  />,
  <BooleanInput key="isPublished" source="isPublished" label="Published" />,
];

const StarRating = ({ record }) => {
  if (!record) return null;
  const stars = "\u2605".repeat(record.rating || 0) + "\u2606".repeat(5 - (record.rating || 0));
  return <span style={{ color: "#f5a623", fontSize: "1.1em" }}>{stars}</span>;
};

const ReviewList = () => (
  <List
    filters={reviewFilters}
    sort={{ field: "createdAt", order: "DESC" }}
    perPage={25}
  >
    <Datagrid rowClick="show">
      <ReferenceField source="tourPackageId" reference="tours" link="show" label="Tour">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="customerId" reference="customers" link="show" label="Customer">
        <FunctionField render={(r) => `${r.firstName} ${r.lastName}`} />
      </ReferenceField>
      <FunctionField label="Rating" render={(record) => <StarRating record={record} />} />
      <TextField source="title" />
      <FunctionField
        label="Comment"
        render={(record) => {
          const comment = record.comment || "";
          return comment.length > 80 ? `${comment.substring(0, 80)}...` : comment;
        }}
      />
      <BooleanField source="isPublished" label="Published" />
      <DateField source="createdAt" label="Created" />
      <ShowButton />
    </Datagrid>
  </List>
);

export default ReviewList;
