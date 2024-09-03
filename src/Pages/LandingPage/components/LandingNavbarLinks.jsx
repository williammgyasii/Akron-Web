import React from "react";

function LandingNavbarLinks({ link, className, title }) {
  return (
    <li>
      <a
        href={link}
        className={`flex lg:px-3 py-2 text-sm text-gray-600
             hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 
             transition focus-visible:ring-indigo-500 focus-visible:outline-none 
            focus-visible:shadow-outline-indigo rounded-full`}
      >
        {title}
      </a>
    </li>
  );
}

export default LandingNavbarLinks;
