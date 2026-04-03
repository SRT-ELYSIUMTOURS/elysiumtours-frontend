import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
} from "react-admin";

const StaffEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="firstName" validate={required()} fullWidth />
      <TextInput source="lastName" validate={required()} fullWidth />
      <TextInput source="email" disabled fullWidth />
      <TextInput source="phone" fullWidth />
      <SelectInput
        source="role"
        validate={required()}
        choices={[
          { id: "staff", name: "Staff" },
          { id: "admin", name: "Admin" },
        ]}
        fullWidth
      />
      <SelectInput
        source="status"
        validate={required()}
        choices={[
          { id: "active", name: "Active" },
          { id: "inactive", name: "Inactive" },
          { id: "suspended", name: "Suspended" },
        ]}
        fullWidth
      />
    </SimpleForm>
  </Edit>
);

export default StaffEdit;
