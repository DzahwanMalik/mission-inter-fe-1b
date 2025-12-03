import HeroBanner from "../components/molecules/HeroBanner";
import { useEffect } from "react";
import useGetData from "../hooks/useGetData";
import VideoListVertical from "../components/molecules/VideoListVertical";

const HomePage = () => {
  const {
    topRatedMovies,
    getTopRatedMovies,
    topRatedTVSeries,
    getTopRatedTVSeries,
    getPopularMovies,
    popularMovies,
    newReleaseMovies,
    getNewReleaseMovies,
  } = useGetData();

  useEffect(() => {
    getTopRatedMovies();
    getTopRatedTVSeries();
    getPopularMovies();
    getNewReleaseMovies();
  }, []);

  return (
    <>
      <header>{/* <HeroBanner video={films} /> */}</header>
      <main className="bg-page-header-bg flex flex-col justify-center">
        <section className="w-full max-w-[1444px] m-auto">
          <VideoListVertical
            label="Top Rating Film dan Series Hari Ini"
            films={topRatedMovies}
            series={topRatedTVSeries}
          />
          <VideoListVertical label="Film Trending" films={popularMovies} />
          <VideoListVertical label="Film Rilis Baru" films={newReleaseMovies} />
        </section>
      </main>
    </>
  );
};

export default HomePage;
