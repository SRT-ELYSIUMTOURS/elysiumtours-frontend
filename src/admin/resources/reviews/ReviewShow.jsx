import {
  Show,
  SimpleShowLayout,
  TextField,
  BooleanField,
  DateField,
  ReferenceField,
  FunctionField,
  NumberField,
  Labeled,
  useRecordContext,
  useDataProvider,
  useRefresh,
} from "react-admin";
import { Box, Typography, Button, TextField as MuiTextField, Divider, Chip } from "@mui/material";
import { useState } from "react";

const StarRating = () => {
  const record = useRecordContext();
  if (!record) return null;
  const stars = "\u2605".repeat(record.rating || 0) + "\u2606".repeat(5 - (record.rating || 0));
  return <span style={{ color: "#f5a623", fontSize: "1.4em" }}>{stars} ({record.rating}/5)</span>;
};

const ImageGallery = () => {
  const record = useRecordContext();
  if (!record?.images?.length) return null;
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
      {record.images.map((url, i) => (
        <img key={i} src={url} alt={`Review image ${i + 1}`} style={{ width: 120, height: 90, objectFit: "cover", borderRadius: 4 }} />
      ))}
    </Box>
  );
};

const ResponseSection = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const refresh = useRefresh();
  const [responseText, setResponseText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!record) return null;

  const hasResponse = record.response && record.response.text;

  const handleSubmit = async () => {
    if (!responseText.trim()) return;
    setSubmitting(true);
    try {
      await dataProvider.create("reviews", {
        data: { reviewId: record.id, text: responseText },
      });
      refresh();
      setResponseText("");
    } catch (err) {
      console.error("Failed to submit response:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (hasResponse) {
    return (
      <Box sx={{ mt: 2, p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>Admin Response</Typography>
        <Typography variant="body2">{record.response.text}</Typography>
        {record.response.respondedAt && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
            Responded: {new Date(record.response.respondedAt).toLocaleString()}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>Respond to Review</Typography>
      <MuiTextField
        value={responseText}
        onChange={(e) => setResponseText(e.target.value)}
        multiline
        rows={3}
        fullWidth
        placeholder="Write a response..."
        variant="outlined"
        size="small"
      />
      <Button
        variant="contained"
        size="small"
        sx={{ mt: 1 }}
        onClick={handleSubmit}
        disabled={submitting || !responseText.trim()}
      >
        {submitting ? "Submitting..." : "Submit Response"}
      </Button>
    </Box>
  );
};

const ReviewShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField source="tourPackageId" reference="tours" link="show" label="Tour">
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="customerId" reference="customers" link="show" label="Customer">
        <FunctionField render={(r) => `${r.firstName} ${r.lastName}`} />
      </ReferenceField>
      <ReferenceField source="bookingId" reference="bookings" link="show" label="Booking">
        <TextField source="bookingRef" />
      </ReferenceField>

      <Labeled label="Rating">
        <StarRating />
      </Labeled>
      <TextField source="title" />
      <TextField source="comment" />
      <BooleanField source="isVerified" label="Verified" />
      <BooleanField source="isPublished" label="Published" />

      <Labeled label="Images">
        <ImageGallery />
      </Labeled>

      <DateField source="createdAt" label="Created" showTime />

      <Divider sx={{ my: 2 }} />

      <Labeled label="Response">
        <ResponseSection />
      </Labeled>
    </SimpleShowLayout>
  </Show>
);

export default ReviewShow;
