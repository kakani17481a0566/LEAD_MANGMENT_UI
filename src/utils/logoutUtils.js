// src/utils/logoutUtils.js



// Handle Logout function
export const handleLogout = () => {
  try {
    // Step 1: Clear authentication data (auth token and session storage)
    localStorage.removeItem("authToken");  // Remove auth token from local storage
    sessionStorage.clear();  // Clear session data if using session storage

    // Optional: Clear any other user-related data (if required)
    localStorage.removeItem("userData");  // Remove any user data from local storage

    // Step 2: (Optional) Call your logout API here if you need server-side invalidation
    // Example: Call logout API to invalidate session on the server
    // await apiLogout(); // Uncomment this if you have a logout API to call

    // Step 3: Refresh the page to reset the app state
    window.location.reload();  // Reload the browser

 
  } catch (error) {
    console.error("Logout failed:", error); // Error handling for failed logout
    // Optionally, show an error message or a toast notification
  }
};
