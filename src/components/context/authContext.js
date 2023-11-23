import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("token") : null;
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("refreshToken")
      : null;
  });

  const updateToken = (newToken, newRefreshToken) => {
    setAuthToken(newToken);
    setRefreshToken(newRefreshToken);
    if (typeof window !== "undefined") {
      localStorage.setItem("token", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, refreshToken, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};
