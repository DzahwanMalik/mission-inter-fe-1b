import {
  PlusIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import Button from "../atoms/Button";
import Chip from "../atoms/Chip";
import type TVSeriesDetail from "../../types/TVSeriesDetail";
import type VideoCredits from "../../types/videoCredits";
import truncateDescription from "../../utils/truncateDesc";
import { useState } from "react";
import type DiscoverTVSeries from "../../types/discoverTVSeries";
import type User from "../../types/user";

type Props = {
  isShow: boolean;
  videoDetail: TVSeriesDetail | null;
  videoContentRatings: string | null;
  videoCredits: VideoCredits | null;
  videoEpisodes: Array<EpisodeSeries> | null;
  videoTrailerKey: string | null;
  handleClose: () => void;
  handleAddFavoriteTVSeries: (userId: string, videoId: string) => void;
  handleRemoveFavoriteTVSeries: (userId: string, videoId: string) => void;
  addLoading: boolean;
  removeLoading: boolean;
  favoriteTVSeries: Array<DiscoverTVSeries> | null;
  user: User | null;
};

const SeriesPopUpDetail = ({
  isShow,
  videoDetail,
  videoContentRatings,
  videoCredits,
  videoEpisodes,
  videoTrailerKey,
  handleClose,
  handleAddFavoriteTVSeries,
  handleRemoveFavoriteTVSeries,
  addLoading,
  removeLoading,
  favoriteTVSeries,
  user,
}: Props) => {
  const [isMuted, setIsMuted] = useState<number>(1);

  const seriesSpec = [
    {
      name: "Cast",
      data: videoCredits?.cast.slice(0, 5).map((item) => item.name),
    },
    {
      name: "Genre",
      data: videoDetail?.genres.map((item) => item.name),
    },
    {
      name: "Director",
      data: videoDetail?.created_by.map((item) => item.name),
    },
  ];

  const TrailerBaseUrl = "https://www.youtube.com/embed/";

  const trailerUrl = videoTrailerKey
    ? `${TrailerBaseUrl}${videoTrailerKey}?autoplay=1&mute=${isMuted}&loop=1&playlist=${videoTrailerKey}`
    : null;

  return (
    <div
      className={`${
        isShow ? "scale-100" : "scale-0"
      } fixed z-40 top-0 left-0 bottom-0 right-0 transition-all duration-300 ease-in-out bg-page-header-bg/70 flex justify-center items-center p-5`}
    >
      <div className="relative max-w-[933px] max-h-[90%] overflow-y-auto bg-page-header-bg shadow-xl text-text-light-primary rounded-xl overflow-hidden">
        <Button
          value={<XMarkIcon className="size-5" />}
          handleClick={handleClose}
          type="button"
          variant="secondary"
          className="absolute z-20 top-5 right-5 px-2!"
        />
        <div className="relative">
          <div className="aspect-video flex items-end after:absolute after:z-10 after:top-0 after:left-0 after:w-full after:h-full after:bg-linear-to-t after:from-page-header-bg after:to-transparent">
            {trailerUrl && (
              <iframe
                src={trailerUrl}
                frameBorder="0"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            )}
            <div className="absolute w-full z-50 px-5 md:px-20 py-3 md:py-10">
              <h1 className="text-xl md:text-3xl text-text-light-primary font-semibold mb-2 md:mb-5">
                {truncateDescription(videoDetail?.name ?? null, 40)}
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 md:gap-5">
                  <Button
                    value="Mulai"
                    type="button"
                    variant="primary"
                    className="text-xs md:text-sm md:px-10!"
                  />
                  <Button
                    value={
                      addLoading || removeLoading ? (
                        "..."
                      ) : (
                        <PlusIcon className="size-4 md:size-5" />
                      )
                    }
                    variant={
                      favoriteTVSeries?.some((m) => m.id === videoDetail?.id)
                        ? "primary"
                        : "secondaryOutline"
                    }
                    type="button"
                    className="px-2!"
                    handleClick={
                      favoriteTVSeries?.some((m) => m.id === videoDetail?.id)
                        ? () => {
                            handleRemoveFavoriteTVSeries?.(
                              user?.id.toString() ?? "",
                              videoDetail!.id.toString()
                            );
                          }
                        : () => {
                            handleAddFavoriteTVSeries?.(
                              user?.id.toString() ?? "",
                              videoDetail!.id.toString()
                            );
                          }
                    }
                  />
                </div>
                <div>
                  <Button
                    value={
                      isMuted ? (
                        <SpeakerXMarkIcon className="size-4 md:size-5" />
                      ) : (
                        <SpeakerWaveIcon className="size-4 md:size-5" />
                      )
                    }
                    variant="secondaryOutline"
                    type="button"
                    className="px-2!"
                    handleClick={() =>
                      isMuted === 1 ? setIsMuted(0) : setIsMuted(1)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 md:px-20 py-10 flex flex-col gap-5 md:gap-10">
          <div className="flex flex-col gap-5 md:gap-10 md:flex-row">
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-5 items-center text-text-light-secondary">
                <p className="text-xs md:text-sm">
                  {videoDetail?.first_air_date.split("-")[0]}
                </p>
                <p className="text-xs md:text-sm">
                  {videoDetail?.number_of_episodes} Episode
                </p>
                <Chip
                  value={videoContentRatings}
                  variant="secondaryOutline"
                  size="small"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm">
                  {truncateDescription(videoDetail?.overview ?? null, 200)}
                </p>
              </div>
            </div>
            <div className="w-full">
              <ul>
                {seriesSpec.map((item) => (
                  <li className="flex gap-2 text-xs md:text-sm">
                    <h5 className="basis-1/3 text-text-light-secondary">
                      {item.name}
                    </h5>
                    <span className="text-text-light-secondary">:</span>
                    <p className="w-full">{item.data?.join(", ")}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl text-text-light-primary font-semibold mb-5 md:mb-10">
              Episode
            </h2>
            <ul className="flex flex-col">
              {videoEpisodes?.slice(0, 5).map((item) => (
                <li className="flex items-center gap-5 md:gap-10 text-xs md:text-sm p-1 md:p-5 transition-all duration-300 ease-in-out hover:bg-extra-bg cursor-pointer">
                  <div className="max-w-2">{item.episode_number}</div>
                  <div className="aspect-video max-w-[100px] md:max-w-[200px] rounded-md overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_TMDB_IMG_BASE_URL}${
                        item.still_path
                      }`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <h3>
                        {truncateDescription(
                          item.name,
                          window.innerWidth > 768 ? 50 : 15
                        )}
                      </h3>
                      <p>{item.runtime} min</p>
                    </div>
                    <p className="text-text-light-secondary">
                      {truncateDescription(
                        item.overview ?? null,
                        window.innerWidth > 768 ? 100 : 40
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesPopUpDetail;
