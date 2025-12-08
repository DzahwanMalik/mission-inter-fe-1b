import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Logo from "../../atoms/Logo";
import helpLinks from "./HelpLink";
import useGetData from "../../../hooks/useGetData";
import useUser from "../../../hooks/useUsername";
import { Link } from "react-router";

const Footer = () => {
  const [isOpenGenre, setIsOpenGenre] = useState<string>("hidden");
  const [isOpenHelp, setIsOpenHelp] = useState<string>("hidden");

  const { getMovieGenres, getTVSeriesGenres, movieGenres, tvGenres } =
    useGetData();

  const { user } = useUser();

  const handleDropdownGenre = () => {
    if (isOpenGenre === "hidden") {
      setIsOpenGenre("grid");
    } else {
      setIsOpenGenre("hidden");
    }
  };

  const handleDropdownHelp = () => {
    if (isOpenHelp === "hidden") {
      setIsOpenHelp("grid");
    } else {
      setIsOpenHelp("hidden");
    }
  };

  useEffect(() => {
    getMovieGenres();
    getTVSeriesGenres();
  }, []);

  const genreLinks = [
    ...(movieGenres || []).map((genre) => ({
      lable: genre.name,
      to: `/${user?.username}/movies/genre/${genre.id}`,
    })),
    ...(tvGenres || []).map((genre) => ({
      lable: genre.name,
      to: `/${user?.username}/tv/genre/${genre.id}`,
    })),
  ];

  return (
    <footer className="bg-page-header-bg border-t border-outline-border">
      <div className="w-full max-w-[1444px] m-auto text-text-light-primary py-10 px-5 flex gap-5 flex-col items-center md:px-0 md:flex-row md:gap-10">
        <div className="flex flex-col gap-5 w-full items-start md:basis-1/5">
          <Logo size="large" className="md:block hidden" />
          <Logo size="medium" className="md:hidden block" />
          <p className="text-text-light-secondary">
            @2023 Chill All Right Reserved.
          </p>
        </div>
        <div className="w-full md:basis-3/5">
          <div
            className="flex justify-between items-center mb-2"
            onClick={handleDropdownGenre}
          >
            <h3 className="font-semibold">Genre</h3>
            <span className="block md:hidden">
              <ChevronDownIcon className="size-4" />
            </span>
          </div>
          <ul
            className={`${isOpenGenre} gap-x-6 gap-y-1 text-text-light-secondary md:grid md:grid-flow-col md:grid-rows-4`}
          >
            {genreLinks.map((link, index) => (
              <li
                key={index}
                className="transition-colors duration-300 ease-in-out hover:text-text-light-primary"
              >
                <Link to={link.to} className="whitespace-nowrap">
                  {link.lable}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:basis-1/5">
          <div
            className="flex justify-between items-center mb-2"
            onClick={handleDropdownHelp}
          >
            <h3 className="font-semibold">Bantuan</h3>
            <span className="block md:hidden">
              <ChevronDownIcon className="size-4" />
            </span>
          </div>
          <ul
            className={`${isOpenHelp} gap-x-6 gap-y-1 text-text-light-secondary md:grid md:grid-flow-col md:grid-rows-4`}
          >
            {helpLinks.map((link, index) => (
              <li
                key={index}
                className="transition-colors duration-300 ease-in-out hover:text-text-light-primary"
              >
                <a href={link.to}>{link.lable}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
