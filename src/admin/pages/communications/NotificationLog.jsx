import { Title, useGetList } from "react-admin";
import { useState } from "react";
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
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TablePagination,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const statusColors = {
  sent: "success",
  delivered: "success",
  failed: "error",
  pending: "warning",
  queued: "info",
  read: "default",
};

const channelIcons = {
  email: <EmailIcon fontSize="small" />,
  sms: <SmsIcon fontSize="small" />,
  whatsapp: <WhatsAppIcon fontSize="small" />,
  in_app: <NotificationsActiveIcon fontSize="small" />,
};

const NotificationLog = () => {
  const [channelFilter, setChannelFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);

  const filter = {};
  if (channelFilter) filter.channel = channelFilter;
  if (statusFilter) filter.status = statusFilter;

  const {
    data: notifications,
    total,
    isLoading,
    error,
  } = useGetList("notifications", {
    pagination: { page: page + 1, perPage },
    sort: { field: "createdAt", order: "DESC" },
    filter,
  });

  const handlePageChange = (_, newPage) => setPage(newPage);
  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const getRecipient = (notif) =>
    notif.recipientEmail ||
    notif.recipientPhone ||
    notif.recipient?.email ||
    notif.recipient?.phone ||
    notif.recipientId ||
    "--";

  return (
    <Box sx={{ p: 2 }}>
      <Title title="Notification Log" />
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
        Notification Log
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        View all sent notifications across email, SMS, WhatsApp, and in-app
        channels.
      </Typography>

      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Channel</InputLabel>
          <Select
            value={channelFilter}
            label="Channel"
            onChange={(e) => {
              setChannelFilter(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="">All Channels</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="sms">SMS</MenuItem>
            <MenuItem value="whatsapp">WhatsApp</MenuItem>
            <MenuItem value="in_app">In-App</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="sent">Sent</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Card>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">
              Failed to load notifications: {error.message || "Unknown error"}
            </Alert>
          ) : !notifications || notifications.length === 0 ? (
            <Typography color="text.secondary">
              No notifications found
              {channelFilter || statusFilter
                ? " matching the selected filters."
                : "."}
            </Typography>
          ) : (
            <>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Recipient</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Channel</TableCell>
                    <TableCell>Title / Subject</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Sent At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notifications.map((notif) => (
                    <TableRow key={notif.id} hover>
                      <TableCell sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>
                        {getRecipient(notif)}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={notif.type || notif.notificationType || "--"}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={channelIcons[notif.channel] || null}
                          label={notif.channel || "--"}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {notif.title || notif.subject || "--"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={notif.status || "unknown"}
                          size="small"
                          color={statusColors[notif.status] || "default"}
                        />
                      </TableCell>
                      <TableCell>
                        {notif.sentAt || notif.createdAt
                          ? new Date(
                              notif.sentAt || notif.createdAt
                            ).toLocaleString()
                          : "--"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={total || 0}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={perPage}
                onRowsPerPageChange={handlePerPageChange}
                rowsPerPageOptions={[10, 25, 50, 100]}
              />
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotificationLog;
