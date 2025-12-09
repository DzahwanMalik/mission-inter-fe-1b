import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useGetData from "../../hooks/useGetData";

//@ts-ignore
import "swiper/css";
import type DiscoverMovies from "../../types/discoverMovies";
import type DiscoverTVSeries from "../../types/discoverTVSeries";
import type User from "../../types/user";
import MovieCard from "../molecules/MovieCard/MovieCard";
import SeriesCard from "../molecules/SeriesCard/SeriesCard";
import { useEffect } from "react";

type Props = {
  label: string;
  films?: Array<DiscoverMovies>;
  series?: Array<DiscoverTVSeries>;
  handleAddFavoriteMovie?: (userId: string, videoId: string) => void;
  handleAddFavoriteTVSeries?: (userId: string, videoId: string) => void;
  handleRemoveFavoriteMovie?: (userId: string, videoId: string) => void;
  handleRemoveFavoriteTVSeries?: (userId: string, videoId: string) => void;
  addLoading: boolean;
  removeLoading: boolean;
  user: User | null;
  favoriteMovies?: Array<DiscoverMovies>;
  favoriteTVSeries?: Array<DiscoverTVSeries>;
  handleOpenPopUpMovieDetail?: (id: number) => void;
  handleOpenPopUpTVDetail?: (id: number) => void;
  topRatedMovies?: Array<DiscoverMovies>;
  newEpisode?: Array<DiscoverTVSeries>;
};

const VideoListVertical = ({
  label,
  films,
  series,
  handleAddFavoriteMovie,
  handleAddFavoriteTVSeries,
  handleRemoveFavoriteMovie,
  handleRemoveFavoriteTVSeries,
  addLoading,
  removeLoading,
  user,
  favoriteMovies,
  favoriteTVSeries,
  handleOpenPopUpMovieDetail,
  handleOpenPopUpTVDetail,
  topRatedMovies,
  newEpisode,
}: Props) => {
  const {
    getMovieDetails,
    movieDetail,
    getSeriesDetails,
    tvDetail,
    getTVSeriesContentRating,
    tvContentRating,
    getMovieCertification,
    movieCertification,
  } = useGetData();

  useEffect(() => {
    if (tvDetail) {
      getTVSeriesContentRating(tvDetail.id);
    } else if (movieDetail) {
      getMovieCertification(movieDetail.id);
    }
  }, [tvDetail, movieDetail]);

  return (
    <div className="px-5 md:px-0">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        className="flex! flex-col-reverse! gap-5! pt-5! pb-10!"
        breakpoints={{
          768: { slidesPerView: 8 },
        }}
        modules={[Autoplay]}
      >
        <div className="">
          <h3 className="text-xl text-text-light-primary font-semibold md:text-3xl">
            {label}
          </h3>
        </div>
        <div>
          {films &&
            films.map((vid, i) => (
              <SwiperSlide key={i} className="z-0 hover:z-50">
                <MovieCard
                  user={user}
                  video={vid}
                  favoriteMovies={favoriteMovies}
                  movieDetail={movieDetail}
                  handleAddFavoriteMovie={handleAddFavoriteMovie}
                  handleRemoveFavoriteMovie={handleRemoveFavoriteMovie}
                  addLoading={addLoading}
                  removeLoading={removeLoading}
                  getMovieDetails={getMovieDetails}
                  handleOpenPopUpMovieDetail={handleOpenPopUpMovieDetail}
                  aspectRatio="aspect-2/3"
                  videoCertification={movieCertification}
                  topRatedMovies={topRatedMovies}
                />
              </SwiperSlide>
            ))}
          {series &&
            series.map((vid, i) => (
              <SwiperSlide key={i} className="z-0 hover:z-50">
                <SeriesCard
                  user={user}
                  video={vid}
                  videoContentRatings={tvContentRating}
                  favoriteTVSeries={favoriteTVSeries}
                  tvDetail={tvDetail}
                  handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
                  handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
                  addLoading={addLoading}
                  removeLoading={removeLoading}
                  getSeriesDetails={getSeriesDetails}
                  handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
                  aspectRatio="aspect-2/3"
                  newEpisode={newEpisode}
                />
              </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </div>
  );
};

export default VideoListVertical;
