import { useEffect, useState } from "react";
import type AllTrending from "../../types/allTrending";
import useGetData from "../../hooks/useGetData";
import HeroBannerTrailer from "../molecules/HeroBannerTrailer";
import HeroBannerContent from "../molecules/HeroBannerContent";
import type DiscoverTVSeries from "../../types/discoverTVSeries";
import type DiscoverMovies from "../../types/discoverMovies";

type Props = {
  video?: Array<AllTrending>;
  films?: Array<DiscoverMovies>;
  series?: Array<DiscoverTVSeries>;
  handleOpenPopUpMovieDetail?: (id: number) => void;
  handleOpenPopUpTVDetail?: (id: number) => void;
};

const HeroBanner = ({
  video,
  films,
  series,
  handleOpenPopUpMovieDetail,
  handleOpenPopUpTVDetail,
}: Props) => {
  const [genreId, setGenreId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<number>(1);
  const [commmonCurrentVideo, setCommonCurrentVideo] =
    useState<AllTrending | null>(null);
  const [seriesCurrentVideo, setSeriesCurrentVideo] =
    useState<DiscoverTVSeries | null>(null);
  const [movieCurrentVideo, setMovieCurrentVideo] =
    useState<DiscoverMovies | null>(null);

  const {
    getMovieTrailerKey,
    getTVSeriesTrailerKey,
    movieTrailerKey,
    tvTrailerKey,
    getMovieCertification,
    movieCertification,
    getTVSeriesContentRating,
    tvContentRating,
    getMovieGenres,
    movieGenres,
    getTVSeriesGenres,
    tvGenres,
    getMovieByGenre,
    movieByGenre,
    getTVByGenre,
    tvByGenre,
    getMovieExternalIds,
    movieExternalIds,
    getTVSeriesExternalIds,
    tvExternalIds,
  } = useGetData();

  // Set Current Video
  useEffect(() => {
    if (video && video!.length > 0) {
      const randomVideo = video![Math.floor(Math.random() * video!.length)];
      setCommonCurrentVideo(randomVideo);
    }
  }, [video]);

  useEffect(() => {
    if (series && series!.length > 0) {
      if (!genreId) {
        const randomVideo = series![Math.floor(Math.random() * series!.length)];
        setSeriesCurrentVideo(randomVideo);
      } else {
        const randomVideo =
          tvByGenre![Math.floor(Math.random() * tvByGenre!.length)];
        setSeriesCurrentVideo(randomVideo);
      }
    }
    getTVSeriesGenres();
  }, [series, tvByGenre]);

  useEffect(() => {
    if (films && films!.length > 0) {
      if (!genreId) {
        const randomVideo = films![Math.floor(Math.random() * films!.length)];
        setMovieCurrentVideo(randomVideo);
      } else {
        const randomVideo =
          movieByGenre![Math.floor(Math.random() * movieByGenre!.length)];
        setMovieCurrentVideo(randomVideo);
      }
    }
    getMovieGenres();
  }, [films, movieByGenre]);

  // Fetch Trailer Key
  useEffect(() => {
    if (!commmonCurrentVideo) return;

    if (commmonCurrentVideo) {
      if (commmonCurrentVideo.media_type === "movie") {
        getMovieTrailerKey(commmonCurrentVideo.id);
        getMovieCertification(commmonCurrentVideo.id);
        getMovieExternalIds(commmonCurrentVideo.id);
      } else if (commmonCurrentVideo.media_type === "tv") {
        getTVSeriesTrailerKey(commmonCurrentVideo.id);
        getTVSeriesContentRating(commmonCurrentVideo.id);
        getTVSeriesExternalIds(commmonCurrentVideo.id);
      }
    }
  }, [commmonCurrentVideo]);

  useEffect(() => {
    if (!seriesCurrentVideo) return;

    if (seriesCurrentVideo) {
      getTVSeriesTrailerKey(seriesCurrentVideo.id);
      getTVSeriesContentRating(seriesCurrentVideo.id);
      getTVSeriesExternalIds(seriesCurrentVideo.id);
    }
  }, [seriesCurrentVideo]);

  useEffect(() => {
    if (!movieCurrentVideo) return;

    if (movieCurrentVideo) {
      getMovieTrailerKey(movieCurrentVideo.id);
      getMovieCertification(movieCurrentVideo.id);
      getMovieExternalIds(movieCurrentVideo.id);
    }
  }, [movieCurrentVideo]);

  const commonTrailerKey = movieTrailerKey ?? tvTrailerKey;
  const commonTrailerUrl = `https://www.youtube.com/embed/${commonTrailerKey}?autoplay=1&mute=${isMuted}&loop=1&playlist=${commonTrailerKey}`;

  const seriesTrailerUrl = `https://www.youtube.com/embed/${tvTrailerKey}?autoplay=1&mute=${isMuted}&loop=1&playlist=${tvTrailerKey}`;

  const movieTrailerUrl = `https://www.youtube.com/embed/${movieTrailerKey}?autoplay=1&mute=${isMuted}&loop=1&playlist=${movieTrailerKey}`;

  const handleMute = () => {
    setIsMuted(isMuted === 1 ? 0 : 1);
  };

  const handleSetGenre = (id: string) => {
    if (movieCurrentVideo) {
      getMovieByGenre(id);
      setGenreId(id);
    } else if (seriesCurrentVideo) {
      getTVByGenre(id);
      setGenreId(id);
    }
  };

  return (
    <div className="relative h-60 w-full md:h-[586px] px-5">
      {commmonCurrentVideo && (
        <>
          <HeroBannerTrailer trailerUrl={commonTrailerUrl} />
          <HeroBannerContent
            title={commmonCurrentVideo?.title ?? commmonCurrentVideo?.name}
            description={commmonCurrentVideo?.overview}
            handleOpenPopUpDetail={() => {
              if (commmonCurrentVideo?.media_type === "movie") {
                handleOpenPopUpMovieDetail?.(commmonCurrentVideo.id);
              } else if (commmonCurrentVideo?.media_type === "tv") {
                handleOpenPopUpTVDetail?.(commmonCurrentVideo.id);
              }
            }}
            ageRating={movieCertification ?? tvContentRating}
            isMuted={isMuted}
            handleMute={handleMute}
            dropdownGenres={false}
            imdb_id={
              commmonCurrentVideo?.media_type === "movie"
                ? movieExternalIds?.imdb_id
                : tvExternalIds?.imdb_id
            }
          />
        </>
      )}
      {seriesCurrentVideo && (
        <>
          <HeroBannerTrailer trailerUrl={seriesTrailerUrl} />
          <HeroBannerContent
            title={seriesCurrentVideo?.name}
            description={seriesCurrentVideo?.overview}
            handleOpenPopUpDetail={() =>
              handleOpenPopUpTVDetail?.(seriesCurrentVideo.id)
            }
            ageRating={tvContentRating}
            isMuted={isMuted}
            handleMute={handleMute}
            genreLinks={tvGenres}
            dropdownGenres={true}
            handleSetGenre={handleSetGenre}
            imdb_id={tvExternalIds?.imdb_id}
          />
        </>
      )}
      {movieCurrentVideo && (
        <>
          <HeroBannerTrailer trailerUrl={movieTrailerUrl} />
          <HeroBannerContent
            title={movieCurrentVideo?.title}
            description={movieCurrentVideo?.overview}
            handleOpenPopUpDetail={() =>
              handleOpenPopUpMovieDetail?.(movieCurrentVideo.id)
            }
            ageRating={movieCertification}
            isMuted={isMuted}
            handleMute={handleMute}
            genreLinks={movieGenres}
            dropdownGenres={true}
            handleSetGenre={handleSetGenre}
            imdb_id={movieExternalIds?.imdb_id}
          />
        </>
      )}
    </div>
  );
};

export default HeroBanner;
