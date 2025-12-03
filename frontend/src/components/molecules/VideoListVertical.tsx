import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  CheckIcon,
  ChevronDownIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import Button from "../atoms/Button";
import Chip from "../atoms/Chip";

import useGetData from "../../hooks/useGetData";

//@ts-ignore
import "swiper/css";
import type DiscoverMovies from "../../types/discoverMovies";
import type DiscoverTVSeries from "../../types/discoverTVSeries";

type Props = {
  label: string;
  films?: Array<DiscoverMovies>;
  series?: Array<DiscoverTVSeries>;
};

const VideoListVertical = ({ label, films, series }: Props) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { getMovieDetails, movieDetail, getSeriesDetails, tvDetail } =
    useGetData();

  return (
    <div className="px-5 md:px-0">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        className="flex! flex-col-reverse! gap-5! pt-5! pb-10!"
        breakpoints={{
          768: { slidesPerView: 8 },
        }}
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
                <div
                  className="relative group w-full cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredId(vid.id);
                    getMovieDetails(vid.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                  }}
                >
                  <div className="aspect-2/3">
                    {/* Thumbnail */}
                    <img
                      src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${
                        vid.poster_path
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
                        vid.backdrop_path
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
                          value={vid.adult ? "18+" : "13+"}
                          variant="secondary"
                          size="small"
                        />
                        <p className="font-semibold text-sm">
                          {hoveredId === vid.id
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
              </SwiperSlide>
            ))}
          {series &&
            series.map((vid, i) => (
              <SwiperSlide key={i} className="z-0 hover:z-50">
                <div
                  className="relative group w-full cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredId(vid.id);
                    getSeriesDetails(vid.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                  }}
                >
                  <div className="aspect-2/3">
                    {/* Thumbnail */}
                    <img
                      src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${
                        vid.poster_path
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
                        vid.backdrop_path
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
                          {hoveredId === vid.id
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
                              (tvDetail?.genres.slice(0, 2).length ?? 0) -
                                1 && <span>•</span>}
                          </>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </div>
  );
};

export default VideoListVertical;
