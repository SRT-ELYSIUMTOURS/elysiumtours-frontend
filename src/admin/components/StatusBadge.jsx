import { useRecordContext } from "react-admin";
import Chip from "@mui/material/Chip";

const statusColorMap = {
  confirmed: "success",
  active: "success",
  pending_payment: "warning",
  cancelled: "error",
  suspended: "error",
  completed: "info",
  in_progress: "secondary",
  refunded: "default",
  inactive: "default",
};

const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc != null ? acc[key] : undefined), obj);

const StatusBadge = ({ source, label = "Status" }) => {
  const record = useRecordContext();
  if (!record) return null;

  const value = getNestedValue(record, source);
  if (!value) return null;

  const color = statusColorMap[value] || "default";
  const displayLabel = value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return <Chip label={displayLabel} color={color} size="small" />;
};

export default StatusBadge;
