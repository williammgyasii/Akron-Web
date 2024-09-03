import React, { useState } from "react";
import { navbarLinks } from "../../../Routes/landingRoutes";
import LandingNavbarLinks from "./LandingNavbarLinks";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [scroll, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileNav = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeAllDropdowns = (event) => {
    if (
      !event.target.closest(".astronav-dropdown") &&
      !event.target.closest("#astronav-menu")
    ) {
      setIsDropdownOpen(false);
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  React.useEffect(() => {
    document.addEventListener("click", closeAllDropdowns);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    return () => {
      document.removeEventListener("click", closeAllDropdowns);
    };
  }, []);

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      className={`astronav-sticky-header fixed z-10  ${
        isScrolled ? "bg-dark" : "bg-transparent"
      }
       top-0 font-normal flex items-center justify-between w-full top-0 border-b z-20 transition-all py-2 border-transparent`}
    >
      <div className="max-w-screen-xl mx-auto w-full px-10">
        <div className="flex flex-row md:flex-col  justify-between items-center relative z-10">
          <div className="flex md:w-full items-center justify-between">
            <a
              href="/"
              className="text-lg flex items-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full px-2 -ml-2"
            >
              <span className="font-bold text-indigo-600 font-sans">Akron</span>
              <span className="text-slate-600">task</span>
              <span className="uppercase mt-0.5 leading-none text-[10px] ml-1 bg-gray-200 text-slate-700 px-2 py-1 rounded-md font-sans">
                Management
              </span>
            </a>
            <div className="hidden md:block">
              <button
                id="astronav-menu"
                aria-label="Toggle Menu"
                onClick={toggleMobileNav}
              >
                <svg
                  fill="currentColor"
                  className="w-4 h-4 text-gray-800"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Toggle Menu</title>
                  {isMenuOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
                    ></path>
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                    ></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
          <nav
            className={`astronav-items  ${
              isMenuOpen ? "md:block" : "md:hidden"
            } ${
              isMenuOpen ? "" : ""
            }   md:w-full md:flex-col mt-2 flex lg:mt-0`}
          >
            <ul className="flex flex-row md:flex-col gap-3 md:gap-1">
              {navbarLinks.map((item, index) => {
                return (
                  <LandingNavbarLinks
                    key={index}
                    title={item.title}
                    link={item.link}
                  />
                );
              })}
            </ul>
            <div className="md:flex hidden items-center mt-3 gap-4">
              <a
                href="#"
                className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none bg-slate-300 focus-visible:shadow-outline-indigo w-full px-5 py-2 bg-gray-100 hover:bg-gray-200 border-2 border-transparent"
              >
                Log in
              </a>
              <a
                href="/dashboard"
                className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo w-full px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-800"
              >
                Try for Free
              </a>
            </div>
          </nav>
          <div>
            <div className="flex justify-center md:hidden items-center gap-2">
              <a
                href="/login"
                className="text-sm w-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-lg"
              >
                Log in
              </a>
              <a
                href="/dashboard"
                className="rounded-lg text-sm text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo w-full px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-800"
              >
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default LandingNavbar;
