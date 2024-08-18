export const formatTimestamp = (timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleDateString(); // Formats the date to a readable string
};

export const formatTimestampToWords = (timestamp) => {
  const date = timestamp.toDate();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleDateString("en-US", options);
};
