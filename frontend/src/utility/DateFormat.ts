export const formatDate = (input?: string | Date): string => {
  if (!input) return "N/A";

  const date = typeof input === "string" ? new Date(input) : input;

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
