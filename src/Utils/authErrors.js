// src/utils/authErrors.js
export const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email address is already in use.";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/invalid-credential":
      return "Invalid Email/Password";
    case "auth/operation-not-allowed":
      return "Email/password accounts are not enabled.";
    case "auth/weak-password":
      return "The password is too weak.";
    case "auth/user-disabled":
      return "The user account has been disabled by an administrator.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    default:
      return "An unknown error occurred. Please try again later.";
  }
};
