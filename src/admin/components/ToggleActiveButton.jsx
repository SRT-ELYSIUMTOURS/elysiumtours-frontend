import { useRecordContext, useDataProvider, useRefresh, useNotify } from "react-admin";
import Button from "@mui/material/Button";
import { useState } from "react";

const ToggleActiveButton = ({ resource, label = "Toggle Active" }) => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const refresh = useRefresh();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);

  if (!record) return null;

  const handleClick = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await dataProvider.update(resource, {
        id: record.id,
        data: { isActive: !record.isActive },
        previousData: record,
      });
      notify(record.isActive ? "Deactivated successfully" : "Activated successfully", { type: "success" });
      refresh();
    } catch (error) {
      notify(`Error: ${error.message}`, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="small"
      color={record.isActive ? "error" : "success"}
      onClick={handleClick}
      disabled={loading}
    >
      {record.isActive ? "Deactivate" : "Activate"}
    </Button>
  );
};

export default ToggleActiveButton;
