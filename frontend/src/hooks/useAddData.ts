import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useAddData = () => {
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!addSuccess && !addError) return;

    const timer = setTimeout(() => {
      setAddSuccess(null);
      setAddError(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [addSuccess, addError]);

  const handleError = (err: any) => {
    setAddError(err);
  };

  const addFavoriteMovie = async (userId: string, videoId: string) => {
    setAddLoading(true);
    try {
      const response = await axiosInstance.post("/user/favorite/movie", {
        userId,
        videoId,
      });
      setAddSuccess(response?.data?.message);
    } catch (error) {
      handleError(error);
    } finally {
      setAddLoading(false);
    }
  };

  const addFavoriteTVSeries = async (userId: string, videoId: string) => {
    setAddLoading(true);
    try {
      const response = await axiosInstance.post("/user/favorite/tv", {
        userId,
        videoId,
      });
      setAddSuccess(response?.data?.message);
    } catch (error) {
      handleError(error);
    } finally {
      setAddLoading(false);
    }
  };

  return {
    addFavoriteMovie,
    addFavoriteTVSeries,
    addLoading,
    addError,
    addSuccess,
  };
};

export default useAddData;
