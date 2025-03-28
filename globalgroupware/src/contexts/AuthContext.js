
import React, { createContext, useState, useContext, useEffect } from "react";
import { login } from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } 
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = () => !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loginUser,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
