export const validateGroupName = (name) => {
    // Check if name is empty
    if (!name.trim()) {
      return "Group name cannot be empty.";
    }
  
    // Check if name contains only letters and spaces and is within the max length
    const regex = /^[A-Za-z\s]+$/; // Allow only letters and spaces
    if (!regex.test(name)) {
      return "Group name can only contain letters and spaces.";
    }
  
    if (name.length > 20) {
      return "Group name cannot exceed 20 characters.";
    }
  
    return ""; // No error
  };
  