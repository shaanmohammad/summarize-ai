"use client";

import { createContext, useEffect, useState } from "react";
import axiosApi from "@/utils/axios.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const refreshUser = async () => {
    try {
      const response = await axiosApi.get("/auth/me");
      setUser(response.data.data);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    const tokenExist = localStorage.getItem("authToken");

    if (!tokenExist) {
      setIsLoading(false);
      return;
    } else {
      setToken(tokenExist);
    }

    refreshUser().finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
