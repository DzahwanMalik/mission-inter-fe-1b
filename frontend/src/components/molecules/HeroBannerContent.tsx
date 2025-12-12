import {
  ChevronDownIcon,
  InformationCircleIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/20/solid";
import truncateDescription from "../../utils/truncateDesc";
import Button from "../atoms/Button";
import Chip from "../atoms/Chip";
import { useRef, useState } from "react";
import type Genres from "../../types/genres";

type Props = {
  title: string | undefined;
  description: string | undefined;
  handleOpenPopUpDetail: () => void;
  ageRating: string | null;
  isMuted: number;
  handleMute: () => void;
  genreLinks?: Array<Genres>;
  dropdownGenres: boolean;
  handleSetGenre?: (id: string) => void;
  imdb_id?: string;
};

const HeroBannerContent = ({
  title,
  description,
  handleOpenPopUpDetail,
  ageRating,
  isMuted,
  handleMute,
  genreLinks,
  dropdownGenres,
  handleSetGenre,
  imdb_id,
}: Props) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePlay = () => {
    const baseURL = import.meta.env.VITE_IMDB_BASE_URL;
    window.open(`${baseURL}/${imdb_id}`);
  };

  const dropdownToggle = () => {
    const el = dropdownRef.current;
    if (!el) return;

    if (openDropdown) {
      // Close
      el.style.height = el.scrollHeight + "px";
      requestAnimationFrame(() => {
        el.style.height = "0px";
      });
    } else {
      // Open
      el.style.height = el.scrollHeight + "px";

      el.addEventListener(
        "transitionend",
        () => {
          el.style.height = "auto";
        },
        { once: true }
      );
    }

    setOpenDropdown(!openDropdown);
  };

  return (
    <div
      className={`relative top-0 left-0 max-w-[1444px] mx-auto w-full h-full flex flex-col justify-end ${
        dropdownGenres && "md:justify-between"
      } md:py-10`}
    >
      <div className={`relative hidden ${dropdownGenres && "md:block"}`}>
        <Button
          value={
            <div className="flex gap-1 items-center">
              <span>Genre</span>
              <span>
                <ChevronDownIcon className="size-4" />
              </span>
            </div>
          }
          variant="secondary"
          type="button"
          className="rounded-md"
          handleClick={dropdownToggle}
        />
        <div
          ref={dropdownRef}
          className="absolute top-full bg-paper-bg rounded-md overflow-hidden transition-all duration-300 ease-in-out"
          style={{ height: "0px" }}
        >
          <ul className="grid grid-flow-col grid-rows-7 text-text-light-primary text-sm">
            {genreLinks?.map((link, index) => (
              <li key={index}>
                <Button
                  value={link.name}
                  variant="secondary"
                  type="button"
                  handleClick={() => handleSetGenre?.(link.id.toString())}
                  className="w-full text-start rounded-none min-w-[200px]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full py-5 flex gap-3 md:gap-8 flex-col md:py-10">
        <div className="w-full text-text-light-primary flex gap-3 md:gap-5 flex-col md:w-1/2">
          <h2 className="font-bold text-2xl md:text-4xl">{title}</h2>
          <p className="text-sm md:text-base">
            {truncateDescription(
              description ?? null,
              window.innerWidth < 768 ? 100 : 200
            )}
          </p>
        </div>
        <div className="flex justify-between items-center text-xs md:text-sm">
          <div className="flex gap-3">
            <Button
              value="Mulai"
              variant="primary"
              type="button"
              handleClick={handlePlay}
            />
            <Button
              value={
                <div className="flex gap-1 justify-center items-center">
                  <InformationCircleIcon className="size-4" />
                  <span>Selengkapnya</span>
                </div>
              }
              variant="secondary"
              type="button"
              handleClick={handleOpenPopUpDetail}
            />
            <Chip value={ageRating} variant="secondaryOutline" size="small" />
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
  );
};

export default HeroBannerContent;
