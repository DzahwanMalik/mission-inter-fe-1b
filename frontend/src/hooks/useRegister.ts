import { useState } from "react";
import axiosInstance from "../lib/axios";

const useRegister = () => {
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  const registerUser = async (username: string, password: string) => {
    setRegisterLoading(true);
    try {
      const response = await axiosInstance.post("/user/register", {
        username,
        password,
      });
      setRegisterSuccess(response?.data?.message);
    } catch (error: any) {
      setRegisterError(error.response?.data?.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  return { registerUser, registerSuccess, registerError, registerLoading };
};

export default useRegister;
