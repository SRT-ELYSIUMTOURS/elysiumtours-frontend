import { useRecordContext } from "react-admin";
import Typography from "@mui/material/Typography";

const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc != null ? acc[key] : undefined), obj);

const MoneyField = ({ source, currency, label = "Amount" }) => {
  const record = useRecordContext();
  if (!record) return null;

  const value = getNestedValue(record, source);
  if (value == null) return null;

  const resolvedCurrency = currency || record.currency || "GHS";

  const formatted = new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: resolvedCurrency,
    minimumFractionDigits: 2,
  }).format(value);

  return <Typography component="span" variant="body2">{formatted}</Typography>;
};

export default MoneyField;
