import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
  required,
  email,
} from "react-admin";

const StaffCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstName" validate={required()} fullWidth />
      <TextInput source="lastName" validate={required()} fullWidth />
      <TextInput source="email" validate={[required(), email()]} fullWidth />
      <PasswordInput source="password" validate={required()} fullWidth />
      <TextInput source="phone" fullWidth />
      <SelectInput
        source="role"
        validate={required()}
        choices={[
          { id: "staff", name: "Staff" },
          { id: "admin", name: "Admin" },
        ]}
        defaultValue="staff"
        fullWidth
      />
    </SimpleForm>
  </Create>
);

export default StaffCreate;
