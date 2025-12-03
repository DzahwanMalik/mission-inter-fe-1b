import { Link } from "react-router";
import { useRef, useState, type JSX } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import LogoMobile from "../atoms/LogoMobile";
import Logo from "../atoms/Logo";
import useUser from "../../hooks/useUsername";

type Link = {
  to: string;
  label: string;
};

type DropdownLink = {
  action: () => void;
  label: string;
  icon: JSX.Element;
};

const Navbar = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { user } = useUser();

  const handleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
      dropdownRef.current?.classList.remove("opacity-100");
      dropdownRef.current?.classList.remove("top-full");
      dropdownRef.current?.classList.remove("scale-y-100");
    } else {
      setShowDropdown(true);
      dropdownRef.current?.classList.add("opacity-100");
      dropdownRef.current?.classList.add("top-full");
      dropdownRef.current?.classList.add("scale-y-100");
    }
  };

  const links: Link[] = [
    {
      to: "/:user/series",
      label: "Series",
    },
    {
      to: "/:user/films",
      label: "Film",
    },
    {
      to: "/:user/daftarSaya",
      label: "Daftar Saya",
    },
  ];

  const dropdownLinks: DropdownLink[] = [
    {
      action: () => {
        window.location.href = `/${user?.username}/profile`;
      },
      label: "Profil Saya",
      icon: <UserIcon className="size-4" />,
    },
    {
      action: () => {
        window.location.href = "/auth/login";
      },
      label: "Ubah Premium",
      icon: <StarIcon className="size-4" />,
    },
    {
      action: () => {
        localStorage.removeItem("user");
        window.location.href = "/auth/login";
      },
      label: "Keluar",
      icon: <ArrowLeftStartOnRectangleIcon className="size-4" />,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 shadow-xl w-full bg-page-header-bg py-1.5 px-5 text-text-light-primary text-sm md:text-base md:py-5">
      <div className="flex justify-between items-center max-w-[1444px] mx-auto">
        <ul className="flex items-center gap-5 md:gap-10">
          <li className="">
            <Link to={`/${user?.username}/home`}>
              <LogoMobile className="md:hidden block" />
              <Logo className="md:block hidden" />
            </Link>
          </li>
          {links.map((link, index) => (
            <li key={index} className="group">
              <Link to={link.to}>{link.label}</Link>
              <div className="h-0.5 bg-text-light-primary w-0 group-hover:w-full transition-all duration-300 ease-in-out"></div>
            </li>
          ))}
        </ul>
        <div
          onClick={handleDropdown}
          className="relative flex gap-2 items-center cursor-pointer px-3 py-2 rounded-md transition-all duration-300 ease-in-out group hover:bg-extra-bg"
        >
          <div className="rounded-full size-9 overflow-hidden">
            <img src={user?.avatar || "/profile.png"} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <ChevronDownIcon className="size-6" />

          {/* Dropdown Menu */}
          <div
            ref={dropdownRef}
            className="absolute top-10 opacity-0 scale-y-0 -left-16 md:left-1/2 md:-translate-x-1/2 overflow-hidden bg-page-header-bg rounded-md transition-all duration-300 ease-in-out"
          >
            <ul className="flex flex-col">
              {dropdownLinks.map((link, index) => (
                <li key={index} className="whitespace-nowrap">
                  <button
                    onClick={link.action}
                    className="flex items-center gap-3 px-4 py-3 transition-all duration-300 ease-in-out hover:text-primary hover:bg-paper-bg cursor-pointer w-full"
                  >
                    <span>{link.icon}</span> <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
