import {
  Create,
  TabbedForm,
  TextInput,
  NumberInput,
  SelectInput,
  required,
  useNotify,
  useRedirect,
} from "react-admin";
import { Typography, Box } from "@mui/material";

/**
 * Create Organization — Tenant Onboarding
 *
 * Backend: superAdmin.createOrganization
 * Creates org record + first admin user with organizationId
 */
const OrganizationCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSave = async (values) => {
    const token = localStorage.getItem("token");
    const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

    const res = await fetch(`${API_URL}/platform/organizations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      notify(err.message || "Failed to create organization", { type: "error" });
      return;
    }

    const data = await res.json();
    notify(
      `Organization "${data.organization?.name}" created with admin ${data.adminUser?.email}`,
      { type: "success" }
    );
    redirect("list", "organizations");
  };

  return (
    <Create>
      <TabbedForm onSubmit={handleSave}>
        <TabbedForm.Tab label="Organization">
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Organization Details
          </Typography>
          <TextInput source="name" label="Organization Name" validate={required()} fullWidth />
          <TextInput source="contactEmail" label="Contact Email" validate={required()} fullWidth />
          <TextInput source="contactPhone" label="Contact Phone" fullWidth />
          <TextInput source="domain" label="Domain / Subdomain" helperText="e.g. ghana-tours.elysiumtours.com" fullWidth />
        </TabbedForm.Tab>

        <TabbedForm.Tab label="Subscription">
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Plan & Billing
          </Typography>
          <SelectInput
            source="plan"
            label="Subscription Plan"
            defaultValue="free"
            choices={[
              { id: "free", name: "Free" },
              { id: "basic", name: "Basic" },
              { id: "professional", name: "Professional" },
              { id: "enterprise", name: "Enterprise" },
            ]}
            fullWidth
          />
          <SelectInput
            source="subscriptionStatus"
            label="Subscription Status"
            defaultValue="trial"
            choices={[
              { id: "active", name: "Active" },
              { id: "trial", name: "Trial" },
              { id: "expired", name: "Expired" },
              { id: "cancelled", name: "Cancelled" },
            ]}
            fullWidth
          />
        </TabbedForm.Tab>

        <TabbedForm.Tab label="Config">
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Organization Config
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Default operational settings. Can be updated later by the org admin.
          </Typography>
          <NumberInput source="config.payment.defaultCommitmentFeePercent" label="Commitment Fee %" defaultValue={15} fullWidth />
          <NumberInput source="config.payment.gracePeriodDays" label="Payment Grace Period (days)" defaultValue={5} fullWidth />
          <SelectInput
            source="config.comms.smsProvider"
            label="SMS Provider"
            defaultValue="hubtel"
            choices={[
              { id: "hubtel", name: "Hubtel" },
              { id: "twilio", name: "Twilio" },
            ]}
            fullWidth
          />
          <NumberInput source="config.operations.defaultSlaHours" label="Default SLA (hours)" defaultValue={72} fullWidth />
          <NumberInput source="config.operations.maxGroupSize" label="Max Group Size" defaultValue={50} fullWidth />
        </TabbedForm.Tab>

        <TabbedForm.Tab label="Branding">
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            Brand Identity
          </Typography>
          <TextInput source="branding.logoUrl" label="Logo URL" fullWidth />
          <TextInput source="branding.brandColor" label="Brand Color" defaultValue="#2c3e50" helperText="Hex color code e.g. #7b2cbf" fullWidth />
          <TextInput source="branding.faviconUrl" label="Favicon URL" fullWidth />
        </TabbedForm.Tab>

        <TabbedForm.Tab label="Admin Account">
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            First Admin User
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This admin will manage the organization — tours, staff, partners, and bookings.
          </Typography>
          <TextInput source="adminFirstName" label="First Name" validate={required()} fullWidth />
          <TextInput source="adminLastName" label="Last Name" validate={required()} fullWidth />
          <TextInput source="adminEmail" label="Email" validate={required()} fullWidth />
          <TextInput source="adminPassword" label="Password" validate={required()} fullWidth />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};

export default OrganizationCreate;
