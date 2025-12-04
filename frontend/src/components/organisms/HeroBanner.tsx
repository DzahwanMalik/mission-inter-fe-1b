import {
  InformationCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import Button from "../atoms/Button";
import Chip from "../atoms/Chip";
import { useEffect, useState } from "react";
import type Film from "../../types/film";

type Props = {
  video: Array<Film>;
};

const HeroBanner = ({ video }: Props) => {
  const [randomVideo, setRandomVideo] = useState<Film>(video[0]);
  const [isMuted, setIsMuted] = useState<number>(1);

  const trailerUrl = `https://www.youtube.com/embed/${randomVideo?.trailerKey}?autoplay=1&mute=${isMuted}&loop=1&playlist=${randomVideo?.trailerKey}`;

  const handleMute = () => {
    setIsMuted(isMuted === 1 ? 0 : 1);
  };

  useEffect(() => {
    const randomFilm = () => {
      const random = Math.floor(Math.random() * video.length);
      setRandomVideo(video[random]);
    };

    randomFilm();

    const interval = setInterval(randomFilm, 30000);

    return () => clearInterval(interval);
  }, [video]);

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
        <div className="max-w-[1444px] mx-auto w-full py-5 flex gap-3 flex-col md:py-10">
          <div className="w-full text-text-light-primary flex gap-3 flex-col md:w-1/2">
            <h2 className="font-bold text-2xl md:text-4xl">
              {randomVideo?.title}
            </h2>
            <p className="text-sm md:text-base">{randomVideo?.description}</p>
          </div>
          <div className="flex justify-between items-center">
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
              />
              <Chip
                value={randomVideo?.ageRating}
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
