import React from "react";

function SectionLayout({ children, className }) {
  return (
    <section
      className={`max-w-screen-xl  mx-auto py-[7rem] md:px-2 px-huge ${className} `}
    >
      {children}
    </section>
  );
}

export default SectionLayout;
