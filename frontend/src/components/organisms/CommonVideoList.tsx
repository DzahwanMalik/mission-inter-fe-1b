import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";
import type DiscoverTVSeries from "../../types/discoverTVSeries";
import type DiscoverMovies from "../../types/discoverMovies";
import MovieCard from "../molecules/MovieCard/MovieCard";
import useUser from "../../hooks/useUsername";
import SeriesCard from "../molecules/SeriesCard/SeriesCard";

type Props = {
  films?: Array<DiscoverMovies>;
  series?: Array<DiscoverTVSeries>;
  handleAddFavoriteMovie?: (userId: string, videoId: string) => void;
  handleAddFavoriteTVSeries?: (userId: string, videoId: string) => void;
  handleRemoveFavoriteMovie?: (userId: string, videoId: string) => void;
  handleRemoveFavoriteTVSeries?: (userId: string, videoId: string) => void;
  handleOpenPopUpMovieDetail?: (id: number) => void;
  handleOpenPopUpTVDetail?: (id: number) => void;
  favoriteMovies?: Array<DiscoverMovies>;
  favoriteTVSeries?: Array<DiscoverTVSeries>;
  label: string;
  addLoading: boolean;
  removeLoading: boolean;
};

const CommonVideoList = ({
  films,
  series,
  label,
  handleAddFavoriteMovie,
  handleAddFavoriteTVSeries,
  handleRemoveFavoriteMovie,
  handleRemoveFavoriteTVSeries,
  handleOpenPopUpMovieDetail,
  handleOpenPopUpTVDetail,
  favoriteMovies,
  favoriteTVSeries,
  addLoading,
  removeLoading,
}: Props) => {
  const {
    getMovieDetails,
    movieDetail,
    getSeriesDetails,
    tvDetail,
    tvContentRating,
    movieCertification,
    getTVSeriesContentRating,
    getMovieCertification,
  } = useGetData();

  useEffect(() => {
    if (tvDetail) {
      getTVSeriesContentRating(tvDetail.id);
    } else if (movieDetail) {
      getMovieCertification(movieDetail.id);
    }
  }, [tvDetail, movieDetail]);

  const { user } = useUser();

  const [showAll, setShowAll] = useState<boolean>(false);

  const displayedFilms = showAll ? films : films?.slice(0, 7);
  const displayedSeries = showAll ? series : series?.slice(0, 7);

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-text-light-primary text-2xl font-semibold">
          {label}
        </h2>
        <span className="text-text-light-secondary cursor-pointer">
          {showAll ? (
            <span onClick={() => setShowAll(false)}>Tampilkan Sedikit</span>
          ) : (
            <span onClick={() => setShowAll(true)}>Tampilkan Semua</span>
          )}
        </span>
      </div>
      <ul className="grid grid-cols-3 md:grid-cols-7 gap-4 py-5">
        {films?.length === 0 && series?.length === 0 && (
          <p className="col-span-3 md:col-span-7 text-center text-text-light-secondary">
            Tidak ada data
          </p>
        )}
        {displayedFilms?.map((item) => (
          <li key={item.id}>
            <MovieCard
              user={user}
              video={item}
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
            />
          </li>
        ))}
        {displayedSeries?.map((item) => (
          <li key={item.id}>
            <SeriesCard
              user={user}
              video={item}
              favoriteTVSeries={favoriteTVSeries}
              tvDetail={tvDetail}
              handleAddFavoriteTVSeries={handleAddFavoriteTVSeries}
              handleRemoveFavoriteTVSeries={handleRemoveFavoriteTVSeries}
              addLoading={addLoading}
              removeLoading={removeLoading}
              getSeriesDetails={getSeriesDetails}
              handleOpenPopUpTVDetail={handleOpenPopUpTVDetail}
              aspectRatio="aspect-2/3"
              videoContentRatings={tvContentRating}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommonVideoList;
