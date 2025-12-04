import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import type User from "../types/user";

const useUpdate = () => {
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

  useEffect(() => {
      if (!updateSuccess && !updateError) return;
  
      const timer = setTimeout(() => {
        setUpdateSuccess(null);
        setUpdateError(null);
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [updateSuccess, updateError]);

  const handleError = (err: any) => {
    setUpdateError(err);
  };

  const updateUserProfile = async (data: any, id: string) => {
    setUpdateLoading(true);

    try {
      const response = await axiosInstance.put(`/user/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUpdatedUser(response?.data?.data);
      setUpdateSuccess(response?.data?.message);
    } catch (error) {
      handleError(error);
    } finally {
      setUpdateLoading(false);
    }
  };

  return { updateUserProfile, updateLoading, updateError, updateSuccess, updatedUser };
};

export default useUpdate;
