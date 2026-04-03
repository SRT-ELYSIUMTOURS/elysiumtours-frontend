import { Title, useDataProvider } from "react-admin";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";

const statusColors = {
  sent: "success",
  delivered: "success",
  failed: "error",
  pending: "warning",
  queued: "info",
};

const NotificationLog = () => {
  const dataProvider = useDataProvider();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await dataProvider.getList("notifications", {
          pagination: { page: 1, perPage: 50 },
          sort: { field: "sentAt", order: "DESC" },
          filter: {},
        });
        setNotifications(data);
      } catch (err) {
        console.error("Failed to load notification log:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [dataProvider]);

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Notification Log" />
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
        Notification Log
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        View all sent notifications across email, SMS, and WhatsApp channels.
      </Typography>

      <Card>
        <CardContent>
          {loading ? (
            <Typography>Loading notifications...</Typography>
          ) : notifications.length === 0 ? (
            <Typography color="text.secondary">
              No notifications found.
            </Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Recipient</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Sent At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map((notif) => (
                  <TableRow key={notif.id} hover>
                    <TableCell>
                      {notif.recipientEmail ||
                        notif.recipientPhone ||
                        notif.recipientId ||
                        "\u2014"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={notif.type || notif.channel || "unknown"}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{notif.subject || "\u2014"}</TableCell>
                    <TableCell>
                      <Chip
                        label={notif.status || "unknown"}
                        size="small"
                        color={statusColors[notif.status] || "default"}
                      />
                    </TableCell>
                    <TableCell>
                      {notif.sentAt
                        ? new Date(notif.sentAt).toLocaleString()
                        : "\u2014"}
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

export default NotificationLog;
