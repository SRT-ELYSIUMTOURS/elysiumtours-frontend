import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";

/**
 * SLA Countdown Timer
 *
 * Displays a colored chip showing time remaining until SLA deadline.
 * Updates every 60 seconds.
 *
 * Props:
 *   deadline  — ISO date string (slaDeadline or createdAt + 72h fallback)
 */
const SlaTimer = ({ deadline }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!deadline) {
    return <Chip label="No SLA" size="small" variant="outlined" />;
  }

  const deadlineMs = new Date(deadline).getTime();
  const remainingMs = deadlineMs - now;
  const remainingHours = remainingMs / (1000 * 60 * 60);

  // Breached
  if (remainingMs <= 0) {
    const breachedHours = Math.abs(Math.floor(remainingHours));
    return (
      <Chip
        label={`BREACHED ${breachedHours}h ago`}
        size="small"
        sx={{
          bgcolor: "#7f1d1d",
          color: "#fff",
          fontWeight: 700,
          animation: "slaPulse 1s ease-in-out infinite",
          "@keyframes slaPulse": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.5 },
          },
        }}
      />
    );
  }

  // < 12 hours — red
  if (remainingHours < 12) {
    const hours = Math.floor(remainingHours);
    const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
    return (
      <Chip
        label={`${hours}h ${minutes}m left`}
        size="small"
        sx={{ bgcolor: "#dc2626", color: "#fff", fontWeight: 600 }}
      />
    );
  }

  // 12-48 hours — yellow/amber
  if (remainingHours < 48) {
    const hours = Math.floor(remainingHours);
    return (
      <Chip
        label={`${hours}h left`}
        size="small"
        sx={{ bgcolor: "#f59e0b", color: "#000", fontWeight: 600 }}
      />
    );
  }

  // > 48 hours — green
  const days = Math.floor(remainingHours / 24);
  const hours = Math.floor(remainingHours % 24);
  return (
    <Chip
      label={`${days}d ${hours}h left`}
      size="small"
      sx={{ bgcolor: "#16a34a", color: "#fff", fontWeight: 600 }}
    />
  );
};

export default SlaTimer;
