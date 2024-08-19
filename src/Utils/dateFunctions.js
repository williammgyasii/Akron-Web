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

export const formatDateToCustomFormat = (date) => {
    const d = new Date(date);
  
    // Extract components
    const day = String(d.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const monthIndex = d.getMonth(); // Month (0-indexed)
    const year = d.getFullYear(); // Full year
  
    // Array of month abbreviations
    const monthAbbreviations = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    // Convert to formatted string
    return `${day}-${monthAbbreviations[monthIndex]}-${year}`;
  };