import {
  InformationCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "../atoms/Button";
import Chip from "../atoms/Chip";
import { useEffect, useState } from "react";
import type AllTrending from "../../types/allTrending";
import useGetData from "../../hooks/useGetData";
import truncateDescription from "../../utils/truncateDesc";

type Props = {
  video: Array<AllTrending>;
  handleOpenPopUpMovieDetail?: (id: number) => void;
  handleOpenPopUpTVDetail?: (id: number) => void;
};

const HeroBanner = ({
  video,
  handleOpenPopUpMovieDetail,
  handleOpenPopUpTVDetail,
}: Props) => {
  const [isMuted, setIsMuted] = useState<number>(1);
  const [currentVideo, setCurrentVideo] = useState<AllTrending | null>(null);

  const {
    getMovieTrailerKey,
    getTVSeriesTrailerKey,
    movieTrailerKey,
    tvTrailerKey,
    getMovieCertification,
    movieCertification,
    getTVSeriesContentRating,
    tvContentRating,
  } = useGetData();

  // Set Current Video
  useEffect(() => {
    if (video.length > 0) {
      const randomVideo = video[Math.floor(Math.random() * video.length)];
      setCurrentVideo(randomVideo);
    }
  }, [video]);

  // Fetch Trailer Key
  useEffect(() => {
    if (!currentVideo) return;

    if (currentVideo) {
      if (currentVideo.media_type === "movie") {
        getMovieTrailerKey(currentVideo.id);
        getMovieCertification(currentVideo.id);
      } else if (currentVideo.media_type === "tv") {
        getTVSeriesTrailerKey(currentVideo.id);
        getTVSeriesContentRating(currentVideo.id);
      }
    }
  }, [currentVideo]);

  const trailerKey = movieTrailerKey ?? tvTrailerKey;

  const trailerUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${isMuted}&loop=1&playlist=${trailerKey}`;

  const handleMute = () => {
    setIsMuted(isMuted === 1 ? 0 : 1);
  };

  return (
    <div className="relative h-60 w-full md:h-[586px] px-5">
      <div className="absolute top-0 left-0 w-full h-full after:absolute after:inset-0 after:bg-linear-to-t after:from-page-header-bg after:to-transparent">
        <iframe
          src={trailerUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full object-cover object-center"
        ></iframe>
      </div>
      <div className="relative top-0 left-0 w-full h-full flex items-end">
        <div className="max-w-[1444px] mx-auto w-full py-5 flex gap-3 md:gap-8 flex-col md:py-10">
          <div className="w-full text-text-light-primary flex gap-3 md:gap-5 flex-col md:w-1/2">
            <h2 className="font-bold text-2xl md:text-4xl">
              {currentVideo?.title ?? currentVideo?.name}
            </h2>
            <p className="text-sm md:text-base">
              {truncateDescription(
                currentVideo?.overview ?? null,
                window.innerWidth < 768 ? 100 : 200
              )}
            </p>
          </div>
          <div className="flex justify-between items-center text-xs md:text-sm">
            <div className="flex gap-3">
              <Button value="Mulai" variant="primary" type="button" />
              <Button
                value={
                  <div className="flex gap-1 justify-center items-center">
                    <InformationCircleIcon className="size-4" />
                    <span>Selengkapnya</span>
                  </div>
                }
                variant="secondary"
                type="button"
                handleClick={() => {
                  if (currentVideo?.media_type === "movie") {
                    handleOpenPopUpMovieDetail?.(currentVideo.id);
                  } else if (currentVideo?.media_type === "tv") {
                    handleOpenPopUpTVDetail?.(currentVideo.id);
                  }
                }}
              />
              <Chip
                value={movieCertification ?? tvContentRating}
                variant="secondaryOutline"
                size="small"
              />
            </div>
            <div>
              <Button
                value={
                  isMuted ? (
                    <SpeakerXMarkIcon className="size-4" />
                  ) : (
                    <SpeakerWaveIcon className="size-4" />
                  )
                }
                variant="secondaryOutline"
                type="button"
                handleClick={handleMute}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
