import { useState } from "react";
import type MovieDetail from "../../types/movieDetail";
import type TVSeriesDetail from "../../types/TVSeriesDetail";
import useGetData from "../../hooks/useGetData";
import Button from "../atoms/Button";
import {
  CheckIcon,
  ChevronDownIcon,
  PlayIcon,
} from "@heroicons/react/20/solid";
import Chip from "../atoms/Chip";

type Props = {
  films?: Array<MovieDetail>;
  series?: Array<TVSeriesDetail>;
  label: string;
};

const FavoriteList = ({ films, series, label }: Props) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { getMovieDetails, movieDetail, getSeriesDetails, tvDetail } =
    useGetData();

  const [showAll, setShowAll] = useState<boolean>(false);

  const displayedFilms = showAll ? films : films?.slice(0, 7);
  const displayedSeries = showAll ? series : series?.slice(0, 7);

  return (
    <div className="">
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
        {displayedSeries?.map((item) => (
          <li key={item.id}>
            <div
              className="relative group w-full cursor-pointer"
              onMouseEnter={() => {
                setHoveredId(item.id);
                getSeriesDetails(item.id);
              }}
              onMouseLeave={() => {
                setHoveredId(null);
              }}
            >
              <div className="aspect-2/3">
                {/* Thumbnail */}
                <img
                  src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${
                    item.poster_path
                  }`}
                  className="w-full h-full object-cover object-center rounded-xl"
                  alt=""
                  loading="lazy"
                />
              </div>

              {/* Hover Card */}
              <div
                className="
                  absolute left-1/2 -translate-1/2 top-1/2 w-72 rounded-xl bg-page-header-bg text-white shadow-2xl
                  opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300
                  z-999
                "
              >
                <img
                  src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${
                    item.backdrop_path
                  }`}
                  className="w-full h-36 object-cover object-center rounded-lg"
                  loading="lazy"
                />

                <div className="p-4 flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <Button
                        type="button"
                        value={<PlayIcon className="size-4" />}
                        variant="secondary"
                      />
                      <Button
                        type="button"
                        value={<CheckIcon className="size-4" />}
                        variant="secondaryOutline"
                      />
                    </div>
                    <div>
                      <Button
                        type="button"
                        value={<ChevronDownIcon className="size-4" />}
                        variant="secondaryOutline"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Chip
                      value={tvDetail?.adult ? "18+" : "13+"}
                      variant="secondary"
                      size="small"
                    />
                    <p className="font-semibold text-sm">
                      {hoveredId === item.id
                        ? tvDetail?.number_of_episodes + " Episodes"
                        : ""}
                    </p>
                  </div>
                  <ul className="flex justify-around items-center text-text-light-secondary font-semibold">
                    {tvDetail?.genres?.slice(0, 2).map((g, i) => (
                      <>
                        <li key={i} className="whitespace-nowrap">
                          {g.name}
                        </li>
                        {i !==
                          (tvDetail?.genres.slice(0, 2).length ?? 0) - 1 && (
                          <span>•</span>
                        )}
                      </>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
        {displayedFilms?.map((item) => (
          <li key={item.id}>
            <div
                  className="relative group w-full cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredId(item.id);
                    getMovieDetails(item.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                  }}
                >
                  <div className="aspect-2/3">
                    {/* Thumbnail */}
                    <img
                      src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${
                        item.poster_path
                      }`}
                      className="w-full h-full object-cover object-center rounded-xl"
                      alt=""
                      loading="lazy"
                    />
                  </div>

                  {/* Hover Card */}
                  <div
                    className="
                  absolute left-1/2 -translate-1/2 top-1/2 w-72 rounded-xl bg-page-header-bg text-white shadow-2xl
                  opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-300
                  z-999
                "
                  >
                    <img
                      src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${
                        item.backdrop_path
                      }`}
                      className="w-full h-36 object-cover object-center rounded-lg"
                      loading="lazy"
                    />

                    <div className="p-4 flex flex-col gap-5">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                          <Button
                            type="button"
                            value={<PlayIcon className="size-4" />}
                            variant="secondary"
                          />
                          <Button
                            type="button"
                            value={<CheckIcon className="size-4" />}
                            variant="secondaryOutline"
                          />
                        </div>
                        <div>
                          <Button
                            type="button"
                            value={<ChevronDownIcon className="size-4" />}
                            variant="secondaryOutline"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <Chip
                          value={item.adult ? "18+" : "13+"}
                          variant="secondary"
                          size="small"
                        />
                        <p className="font-semibold text-sm">
                          {hoveredId === item.id
                            ? Math.floor((movieDetail?.runtime ?? 0) / 60) +
                              "h " +
                              ((movieDetail?.runtime ?? 0) % 60) +
                              "m"
                            : ""}
                        </p>
                      </div>
                      <ul className="flex justify-around items-center text-text-light-secondary font-semibold">
                        {movieDetail?.genres?.slice(0, 2).map((g, i) => (
                          <>
                            <li key={i} className="whitespace-nowrap">
                              {g.name}
                            </li>
                            {i !==
                              (movieDetail?.genres.slice(0, 2).length ?? 0) -
                                1 && <span>•</span>}
                          </>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;
