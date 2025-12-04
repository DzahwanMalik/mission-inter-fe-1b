import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";

const useRemoveData = () => {
  const [removeSuccess, setRemoveSuccess] = useState<string | null>(null);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!removeSuccess && !removeError) return;

    const timer = setTimeout(() => {
      setRemoveSuccess(null);
      setRemoveError(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [removeSuccess, removeError]);

  const handleError = (err: any) => {
    setRemoveError(err);
  };

  const removeFavoriteMovie = async (userId: string, videoId: string) => {
    setRemoveLoading(true);

    try {
      const response = await axiosInstance.delete(
        `/user/favorite/movie/${userId}/${videoId}`
      );
      setRemoveSuccess(response?.data?.message);
    } catch (error) {
      handleError(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  const removeFavoriteTVSeries = async (userId: string, videoId: string) => {
    setRemoveLoading(true);

    try {
      const response = await axiosInstance.delete(
        `/user/favorite/tv/${userId}/${videoId}`
      );
      setRemoveSuccess(response?.data?.message);
    } catch (error) {
      handleError(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  return {
    removeFavoriteMovie,
    removeFavoriteTVSeries,
    removeSuccess,
    removeError,
    removeLoading,
  };
};

export default useRemoveData;
