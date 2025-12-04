import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import type User from "../types/user";

const useLogin = () => {
  const [userData, setUserData] = useState<User | null>(null);

  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  useEffect(() => {
      if (!loginSuccess && !loginError) return;
  
      const timer = setTimeout(() => {
        setLoginSuccess(null);
        setLoginError(null);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [loginSuccess, loginError]);

  const loginUser = async (username: string, password: string) => {
    setLoginLoading(true);
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      setUserData(response?.data?.data);
      setLoginSuccess(response?.data?.message);
    } catch (error: any) {
      setLoginError(error.response?.data?.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return { loginUser, loginSuccess, loginError, loginLoading, userData };
};

export default useLogin;
