import { useEffect } from "react";
import EditProfileForm from "../components/molecules/EditProfileForm";
import SubscribeBanner from "../components/molecules/SubscribeBanner";
import useGetData from "../hooks/useGetData";
import useUser from "../hooks/useUsername";
import FavoriteList from "../components/molecules/FavoriteList";

const ProfilePage = () => {
  const {
    getFavoriteTVSeries,
    favoriteTVSeries,
    getFavoriteMovies,
    favoriteMovies,
  } = useGetData();

  const { user } = useUser();

  useEffect(() => {
    getFavoriteTVSeries(user!.id);
    getFavoriteMovies(user!.id);
  }, [user]);

  return (
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
            series={favoriteTVSeries}
            films={favoriteMovies}
            label="Daftar Saya"
          />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
