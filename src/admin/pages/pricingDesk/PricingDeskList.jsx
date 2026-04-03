import { Title, useDataProvider } from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PricingDeskList = () => {
  const dataProvider = useDataProvider();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        // pricing-desk maps to /api/v1/pricing-desk/queue
        const { data } = await dataProvider.getList("pricing-desk", {
          pagination: { page: 1, perPage: 25 },
          sort: { field: "createdAt", order: "DESC" },
          filter: {},
        });
        setQuotes(data);
      } catch (err) {
        console.error("Failed to load pricing desk queue:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, [dataProvider]);

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Pricing Desk" />
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Quote Queue
      </Typography>
      <Card>
        <CardContent>
          {loading ? (
            <Typography>Loading queue...</Typography>
          ) : quotes.length === 0 ? (
            <Typography color="text.secondary">
              No quotes in the queue.
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>Group Size</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>SLA Deadline</TableCell>
                  <TableCell>Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quotes.map((quote) => (
                  <TableRow
                    key={quote.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/admin/pricing-desk/${quote.id}`)}
                  >
                    <TableCell>
                      {quote.customerName || quote.customerId}
                    </TableCell>
                    <TableCell>
                      {quote.destinationName || quote.destinationId}
                    </TableCell>
                    <TableCell>{quote.groupSize}</TableCell>
                    <TableCell>
                      <Chip
                        label={quote.status}
                        size="small"
                        color={
                          quote.status === "pending" ? "warning" : "default"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {quote.slaDeadline
                        ? new Date(quote.slaDeadline).toLocaleDateString()
                        : "\u2014"}
                    </TableCell>
                    <TableCell>
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PricingDeskList;
