import React from "react";
import landingImage from "../assets/LandingBanner.jpg";

const LandingHeroSection = () => {
  return (
    <section className="overflow-x-clip bg-background  min-h-screen">
      <div className="max-w-screen-xl  mx-auto py-huge md:px-2 px-huge">
        <div className="grid grid-cols-5 relative">
          {/* Background Gradients */}
          <div className="absolute w-96 h-96 blur-2xl  bg-gradient-radial from-red-800 right-0 top-0"></div>
          <div className="absolute w-96 h-96 blur-2xl -z-10 bg-gradient-radial from-purple-800 right-56 top-10"></div>

          <div className="max-w-sm place-items-center justify-center flex flex-col col-span-2 text-center md:col-span-5">
            <h1 className=" md:text-4xl text-6xl font-bold tracking-tight tracking-tighter [text-wrap:balance] text-center lg:text-start">
              Group Task Management at its best
            </h1>
            <p className="text-lg mt-1 max-w-lg font-medium text-slate-600 [text-wrap:balance] text-center md:text-start">
              A dynamic task management platform that empowers teams to
              collaborate effortlessly, manage tasks efficiently, and customize
              their workspace for optimal productivity.
            </p>
            <div className="mt-2 flex flex-row md:flex-col justify-center justify-start gap-3">
              <a
                href="https://web3templates.com/templates/astroship-pro-astro-saas-website-template"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-7 py-2.5 bg-indigo-600 text-white hover:bg-indigo-800 flex gap-1 items-center justify-center"
              >
                Get Started
              </a>
              {/* <a
                href="https://github.com/surjithctly/astroship"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-7 py-2.5 bg-white border-2 border-indigo-500 hover:bg-indigo-50 text-indigo-600 flex gap-1 items-center justify-center"
              >
                Free Version
              </a> */}
            </div>
          </div>

          {/* Image Section */}
          <div className="py-3 col-span-3 md:col-span-5 -mr-44">
            <picture>
              {/* <source
                srcSet="/_astro/hero-screenshot.HaV5_ts2_2kX9IQ.avif 240w, /_astro/hero-screenshot.HaV5_ts2_p47kV.avif 540w, /_astro/hero-screenshot.HaV5_ts2_2r7UJA.avif 720w, /_astro/hero-screenshot.HaV5_ts2_ZE0EX9.avif 1183w"
                type="image/avif"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <source
                srcSet="/_astro/hero-screenshot.HaV5_ts2_Z1gf1Ry.webp 240w, /_astro/hero-screenshot.HaV5_ts2_1S34xs.webp 540w, /_astro/hero-screenshot.HaV5_ts2_Z1a5fQO.webp 720w, /_astro/hero-screenshot.HaV5_ts2_ZEzjxP.webp 1183w"
                type="image/webp"
                sizes="(max-width: 1024px) 100vw, 50vw"
              /> */}
              <img
                src={landingImage}
                // srcSet="/_astro/hero-screenshot.HaV5_ts2_ZSMuoP.png 240w, /_astro/hero-screenshot.HaV5_ts2_2fuB1b.png 540w, /_astro/hero-screenshot.HaV5_ts2_ZMCIo6.png 720w, /_astro/hero-screenshot.HaV5_ts2_10u77m.png 1183w"
                alt="Astronaut in the air"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="eager"
                fetchPriority="high"
                width="1183"
                height="787"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHeroSection;
