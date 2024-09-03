import React from "react";

function SectionLayout({ children, className }) {
  return (
    <section
      className={`${className} max-w-screen-xl  mx-auto py-[7rem] md:px-2 px-huge`}
    >
      {children}
    </section>
  );
}

export default SectionLayout;
