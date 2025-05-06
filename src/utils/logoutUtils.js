
export const handleLogout = () => {
  try {

    localStorage.removeItem("authToken");  
    sessionStorage.clear(); 

    
    localStorage.removeItem("userData"); 

    window.location.reload();  

 
  } catch (error) {
    console.error("Logout failed:", error); 
  
  }
};
