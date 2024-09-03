import React, { useState } from "react";

const LandingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  React.useEffect(() => {
    document.addEventListener("click", closeAllDropdowns);
    return () => {
      document.removeEventListener("click", closeAllDropdowns);
    };
  }, []);

  return (
    <header className="astronav-sticky-header sticky top-0 border-b z-20 transition-all py-5 border-transparent">
      <div className="max-w-screen-xl mx-auto px-5">
        <div className="flex flex-row md:flex-col justify-between items-center relative z-10">
          <div className="flex w-full lg:w-auto items-center justify-between">
            <a
              href="/"
              className="text-lg flex items-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full px-2 -ml-2"
            >
              <span className="font-bold text-indigo-600">Astro</span>
              <span className="text-slate-600">ship</span>
              <span className="uppercase mt-0.5 leading-none text-[10px] ml-1 font-bold bg-gray-200 text-slate-700 px-2 py-1 rounded-md">
                PRO
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
            className={`astronav-items ${
              isMenuOpen ? "" : "hidden"
            } w-full md:w-auto mt-2 flex lg:mt-0`}
          >
            <ul className="flex flex-row md:flex-col lg:gap-3">
              {/* <li className="relative z-50 isolate">
                <div className="astronav-dropdown group">
                  <button
                    className="flex items-center gap-1 text-sm w-full lg:w-auto transition lg:px-3 py-2 text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
                    onClick={toggleDropdownMenu}
                  >
                    <span>Pages</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className={`w-3 h-3 mt-0.5 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                    </svg>
                  </button>
                  <div className={`astronav-dropdown dropdown-toggle ${isDropdownOpen ? '' : 'hidden'}`}>
                    <div className="lg:absolute w-full lg:w-48 z-50 border-l lg:border-0 border-slate-200 lg:left-0 origin-top-left">
                      <div className="px-3 lg:py-2 lg:bg-white lg:rounded-md lg:shadow lg:border flex flex-col">
                        <a href="/features" className="py-1 text-sm text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded">
                          Features
                        </a>
                        <a href="/integrations" className="py-1 text-sm text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded">
                          Integrations
                        </a>
                        <a href="/blog//typography-example" className="py-1 text-sm text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded">
                          Blog Details
                        </a>
                        <a href="/404" className="py-1 text-sm text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded">
                          404 Page
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li> */}
              <li>
                <a
                  href="/pricing"
                  className="flex lg:px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 transition focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="flex md:px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 transition focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="flex md:px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 transition focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="flex md:px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 transition focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
                >
                  Contact
                </a>
              </li>
            </ul>
            <div className="md:flex hidden items-center mt-3 gap-4">
              <a
                href="#"
                className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo w-full px-5 py-2 bg-gray-100 hover:bg-gray-200 border-2 border-transparent"
              >
                Log in
              </a>
              <a
                href="#"
                className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo w-full px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-800"
              >
                Try for Free
              </a>
            </div>
          </nav>
        </div>
        <div className="flex sm:hidden items-center gap-4">
          <a
            href="#"
            className="text-sm px-2 py-1 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
          >
            Log in
          </a>
          <a
            href="#"
            className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo w-full px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-800"
          >
            Try for Free
          </a>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
