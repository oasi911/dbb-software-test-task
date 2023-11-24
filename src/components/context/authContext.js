import { createContext, useState, useContext } from "react";

// Creating a context for authentication data
const AuthContext = createContext(null);

// Custom hook for easy access to the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app and provide auth state
export const AuthProvider = ({ children }) => {
  // State for storing the authentication token
  const [authToken, setAuthToken] = useState(() => {
    // Attempt to get the token from localStorage if it's available
    return typeof window !== "undefined" ? localStorage.getItem("token") : null;
  });

  // State for storing the refresh token
  const [refreshToken, setRefreshToken] = useState(() => {
    // Attempt to get the refresh token from localStorage if it's available
    return typeof window !== "undefined"
      ? localStorage.getItem("refreshToken")
      : null;
  });

  // Function to update both tokens in the state and localStorage
  const updateToken = (newToken, newRefreshToken) => {
    setAuthToken(newToken);
    setRefreshToken(newRefreshToken);

    // Update localStorage with new tokens if it's available
    if (typeof window !== "undefined") {
      localStorage.setItem("token", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    }
  };

  // Providing auth state and updater function via context to child components
  return (
    <AuthContext.Provider value={{ authToken, refreshToken, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};
