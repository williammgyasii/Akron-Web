import { format } from "date-fns";

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

const formatDate = (date) => {
  const d = new Date(date);
  return format(d, "yy/dd/MM"); // Custom format
};

const formatDateToWords = (date) => {
  const d = new Date(date);

  // Extract year, day, and month
  const year = d.getFullYear().toString().slice(-2); // Last 2 digits of the year
  const day = d.getDate(); // Day of the month
  const month = d.getMonth(); // Month (0-indexed)

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert to words
  return `${monthNames[month]} ${day}, ${year}`;
};

// Example usage
const selectedDate = new Date(); // Replace with your date picker value
const formattedDate = formatDateToWords(selectedDate);
console.log("Formatted Date in Words:", formattedDate);
