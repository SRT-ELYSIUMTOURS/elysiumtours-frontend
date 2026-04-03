import { Title, useDataProvider, useNotify } from "react-admin";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Stack,
  TextField,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";

const QuoteDetail = () => {
  const { quoteId } = useParams();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const { data } = await dataProvider.getOne("pricing-desk", {
          id: quoteId,
        });
        setQuote(data);
      } catch (err) {
        console.error("Failed to load quote:", err);
        notify("Failed to load quote details", { type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, [dataProvider, quoteId, notify]);

  const handleAssign = () => {
    notify("Assign to Me - placeholder action", { type: "info" });
  };

  const handleSubmitQuote = () => {
    notify("Submit Quote - placeholder action", { type: "info" });
  };

  const handleSendToCustomer = () => {
    notify("Send to Customer - placeholder action", { type: "info" });
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Loading quote details...</Typography>
      </Box>
    );
  }

  if (!quote) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Quote not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Title title={`Quote #${quoteId}`} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" fontWeight={700}>
          Quote Details
        </Typography>
        <Chip
          label={quote.status || "unknown"}
          color={quote.status === "pending" ? "warning" : "default"}
        />
      </Stack>

      <Grid container spacing={3}>
        {/* Quote Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Request Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customer: {quote.customerName || quote.customerId || "\u2014"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Destination:{" "}
                {quote.destinationName || quote.destinationId || "\u2014"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Group Size: {quote.groupSize || "\u2014"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Travel Dates: {quote.travelDates || "\u2014"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                SLA Deadline:{" "}
                {quote.slaDeadline
                  ? new Date(quote.slaDeadline).toLocaleString()
                  : "\u2014"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Cost Breakdown */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cost Breakdown
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Fill in the cost breakdown to build the quote.
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Accommodation (GHS)"
                  type="number"
                  size="small"
                  fullWidth
                  disabled
                />
                <TextField
                  label="Transport (GHS)"
                  type="number"
                  size="small"
                  fullWidth
                  disabled
                />
                <TextField
                  label="Activities (GHS)"
                  type="number"
                  size="small"
                  fullWidth
                  disabled
                />
                <TextField
                  label="Meals (GHS)"
                  type="number"
                  size="small"
                  fullWidth
                  disabled
                />
                <Divider />
                <TextField
                  label="Total (GHS)"
                  type="number"
                  size="small"
                  fullWidth
                  disabled
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Actions */}
        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={handleAssign}>
                  Assign to Me
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitQuote}
                >
                  Submit Quote
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSendToCustomer}
                >
                  Send to Customer
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuoteDetail;
