import { useEffect } from "react";
import EditProfileForm from "../components/organisms/EditProfileForm";
import SubscribeBanner from "../components/molecules/SubscribeBanner";
import useGetData from "../hooks/useGetData";
import useUser from "../hooks/useUsername";
import FavoriteList from "../components/organisms/FavoriteList";
import useAddData from "../hooks/useAddData";
import useRemoveData from "../hooks/useRemoveData";
import Alert from "../components/atoms/Alert";

const ProfilePage = () => {
  const { user } = useUser();

  const {
    getFavoriteTVSeries,
    favoriteTVSeries,
    getFavoriteMovies,
    favoriteMovies,
  } = useGetData();

  const {
    addFavoriteMovie,
    addFavoriteTVSeries,
    addLoading,
    addError,
    addSuccess,
  } = useAddData();

  const {
    removeFavoriteMovie,
    removeFavoriteTVSeries,
    removeLoading,
    removeError,
    removeSuccess,
  } = useRemoveData();

  const handleAddFavoriteMovie = (userId: string, videoId: string) => {
    addFavoriteMovie(userId, videoId);
  };

  const handleAddFavoriteTVSeries = (userId: string, videoId: string) => {
    addFavoriteTVSeries(userId, videoId);
  };

  const handleRemoveFavoriteMovie = (userId: string, videoId: string) => {
    removeFavoriteMovie(userId, videoId);
  };

  const handleRemoveFavoriteTVSeries = (userId: string, videoId: string) => {
    removeFavoriteTVSeries(userId, videoId);
  };

  useEffect(() => {
    getFavoriteMovies(user!.id);
    getFavoriteTVSeries(user!.id);
  }, [addSuccess, removeSuccess]);

  useEffect(() => {
    getFavoriteTVSeries(user!.id);
    getFavoriteMovies(user!.id);
  }, []);

  return (
    <>
      {addError && <Alert message={addError} variant="error" />}
      {removeError && <Alert message={removeError} variant="error" />}
      {addSuccess && <Alert message={addSuccess} variant="success" />}
      {removeSuccess && <Alert message={removeSuccess} variant="success" />}
      <section className="bg-page-header-bg px-5 py-5">
        <div className="w-full max-w-[1444px] m-auto">
          <div className="flex flex-col gap-20 mb-20 md:flex-row-reverse">
            <div className="">
              <SubscribeBanner />
            </div>
            <div className="w-full">
              <EditProfileForm />
            </div>
          </div>
          <div className="col-span-2">
            <FavoriteList
              films={favoriteMovies}
              series={favoriteTVSeries}
              label="Daftar Saya"
              handleAddFavoriteMovie={handleAddFavoriteMovie}
              handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
              handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
              handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
              addLoading={addLoading}
              removeLoading={removeLoading}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
