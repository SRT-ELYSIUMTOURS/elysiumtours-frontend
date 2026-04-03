import {
  Edit,
  TabbedForm,
  TextInput,
  SelectInput,
  useNotify,
  useRedirect,
  useRecordContext,
} from "react-admin";
import { Box, Typography } from "@mui/material";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

const statusChoices = [
  { id: "active", name: "Active" },
  { id: "trial", name: "Trial" },
  { id: "suspended", name: "Suspended" },
  { id: "inactive", name: "Inactive" },
];

const planChoices = [
  { id: "free", name: "Free" },
  { id: "starter", name: "Starter" },
  { id: "professional", name: "Professional" },
  { id: "enterprise", name: "Enterprise" },
];

const subscriptionStatusChoices = [
  { id: "active", name: "Active" },
  { id: "trialing", name: "Trialing" },
  { id: "past_due", name: "Past Due" },
  { id: "cancelled", name: "Cancelled" },
  { id: "expired", name: "Expired" },
];

const BrandingPreview = () => {
  const record = useRecordContext();
  if (!record?.branding?.logoUrl) return null;
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="text.secondary">Current Logo Preview</Typography>
      <Box sx={{ mt: 0.5 }}>
        <img src={record.branding.logoUrl} alt="Logo" style={{ maxHeight: 60, borderRadius: 4 }} />
      </Box>
    </Box>
  );
};

const OrganizationEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSave = async (values) => {
    const token = localStorage.getItem("token");
    const orgId = values.id;

    try {
      // Update basic fields via dataProvider-compatible endpoint
      const basicRes = await fetch(`${API_URL}/platform/organizations/${orgId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: values.name,
          contactEmail: values.contactEmail,
          contactPhone: values.contactPhone,
          domain: values.domain,
          status: values.status,
        }),
      });
      if (!basicRes.ok) {
        const err = await basicRes.json().catch(() => ({}));
        throw new Error(err.message || `Failed to update organization (${basicRes.status})`);
      }

      // Update config (subscription + branding) via config endpoint
      const configPayload = {
        subscription: {
          plan: values["subscription.plan"] || values.subscription?.plan,
          status: values["subscription.status"] || values.subscription?.status,
        },
        branding: {
          logoUrl: values["branding.logoUrl"] || values.branding?.logoUrl,
          brandColor: values["branding.brandColor"] || values.branding?.brandColor,
          faviconUrl: values["branding.faviconUrl"] || values.branding?.faviconUrl,
        },
      };

      const configRes = await fetch(`${API_URL}/platform/organizations/${orgId}/config`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(configPayload),
      });
      if (!configRes.ok) {
        const err = await configRes.json().catch(() => ({}));
        throw new Error(err.message || `Failed to update config (${configRes.status})`);
      }

      notify("Organization updated successfully", { type: "success" });
      redirect("show", "organizations", orgId);
    } catch (err) {
      notify(err.message, { type: "error" });
    }
  };

  return (
    <Edit mutationMode="pessimistic">
      <TabbedForm onSubmit={handleSave}>
        {/* Details Tab */}
        <TabbedForm.Tab label="Details">
          <TextInput source="name" label="Organization Name" fullWidth isRequired />
          <TextInput source="contactEmail" label="Contact Email" fullWidth />
          <TextInput source="contactPhone" label="Contact Phone" fullWidth />
          <TextInput source="domain" label="Domain" fullWidth />
          <SelectInput source="status" choices={statusChoices} />
        </TabbedForm.Tab>

        {/* Subscription Tab */}
        <TabbedForm.Tab label="Subscription">
          <SelectInput source="subscription.plan" label="Plan" choices={planChoices} />
          <SelectInput source="subscription.status" label="Subscription Status" choices={subscriptionStatusChoices} />
        </TabbedForm.Tab>

        {/* Branding Tab */}
        <TabbedForm.Tab label="Branding">
          <BrandingPreview />
          <TextInput source="branding.logoUrl" label="Logo URL" fullWidth />
          <TextInput source="branding.brandColor" label="Brand Color" fullWidth helperText='Hex color, e.g. "#2c3e50"' />
          <TextInput source="branding.faviconUrl" label="Favicon URL" fullWidth />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

export default OrganizationEdit;
