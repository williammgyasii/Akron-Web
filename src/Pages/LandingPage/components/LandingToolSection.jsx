import React from "react";
import FeatureBox from "./FeatureBox";
import SectionLayout from "../layouts/SectionLayout";

const LandingToolSection = () => {
  return (
    <SectionLayout className={"!px-6"}>
      <div className="mt-24">
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight">
          Everything you need to{" "}
          <span className="text-indigo-600">start a website</span>
        </h2>
        <p className="text-lg mt-4 text-slate-600">
          Astro comes batteries included. It takes the best parts of
          state-of-the-art tools and adds its own innovations.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 mt-16 gap-10">
        <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg lg:col-span-3">
          <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10"></div>
            <picture>
              <source
                srcSet="/_astro/2.ldT67BXv_ZIfUrc.avif"
                type="image/avif"
              />
              <source
                srcSet="/_astro/2.ldT67BXv_Z1VcUNt.webp"
                type="image/webp"
              />
              <img
                src="/_astro/2.ldT67BXv_ZgktxF.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width="1280"
                height="800"
                decoding="async"
              />
            </picture>
          </div>
          <div className="mt-2">
            <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
              Astroship
            </span>
            <h3 className="text-xl lg:text-2xl font-medium mt-2">
              Responsive Template
            </h3>
            <p className="text-slate-600 mt-2 [text-wrap:balance]">
              Astroship is a creative and modern mobile responsive website
              template that helps you create any kind of marketing websites or
              landing pages.
            </p>
          </div>
        </div>
        <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg lg:col-span-2">
          <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-80">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10"></div>
            <picture>
              <source
                srcSet="/_astro/2.ldT67BXv_ZIfUrc.avif"
                type="image/avif"
              />
              <source
                srcSet="/_astro/2.ldT67BXv_Z1VcUNt.webp"
                type="image/webp"
              />
              <img
                src="/_astro/2.ldT67BXv_ZgktxF.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width="1280"
                height="800"
                decoding="async"
              />
            </picture>
          </div>
          <div className="mt-2">
            <span className="bg-indigo-100 border-indigo-200 border text-indigo-600 rounded-full text-xs font-medium px-3 py-1">
              Creative
            </span>
            <h3 className="text-xl lg:text-2xl font-medium mt-2">
              Next Level Template
            </h3>
            <p className="text-slate-600 mt-2 [text-wrap:balance]">
              Astroship is a new kind of website template that integrates your
              favorite tools and workflows.
            </p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10">
        <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
          <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10"></div>
            <picture>
              <source
                srcSet="/_astro/3.XiLsQFjx_Z1JuNDf.avif"
                type="image/avif"
              />
              <source
                srcSet="/_astro/3.XiLsQFjx_27JjNp.webp"
                type="image/webp"
              />
              <img
                src="/_astro/3.XiLsQFjx_Z1hzmJI.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width="1280"
                height="800"
                decoding="async"
              />
            </picture>
          </div>
          <div className="mt-2">
            <span className="bg-indigo-100 border-indigo-200 border text-indigo-600 rounded-full text-xs font-medium px-3 py-1">
              Template
            </span>
            <h3 className="text-xl lg:text-2xl font-medium mt-2">
              Modern Design
            </h3>
            <p className="text-slate-600 mt-2 [text-wrap:balance]">
              Feeling old? Try this template and be a part of the modern design.
            </p>
          </div>
        </div>
        <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
          <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10"></div>
            <picture>
              <source
                srcSet="/_astro/2.ldT67BXv_ZIfUrc.avif"
                type="image/avif"
              />
              <source
                srcSet="/_astro/2.ldT67BXv_Z1VcUNt.webp"
                type="image/webp"
              />
              <img
                src="/_astro/2.ldT67BXv_ZgktxF.png"
                alt="Feature image"
                className="h-full w-full object-contain"
                loading="lazy"
                width="1280"
                height="800"
                decoding="async"
              />
            </picture>
          </div>
          <div className="mt-2">
            <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
              Product
            </span>
            <h3 className="text-xl lg:text-2xl font-medium mt-2">
              Highlight Features
            </h3>
            <p className="text-slate-600 mt-2 [text-wrap:balance]">
              You can highlight your features in a trendy grid like this one.
            </p>
          </div>
        </div>
        <div className="rounded-2xl p-8 bg-gray-50 transition-all ring-1 ring-gray-200/50 shadow hover:shadow-lg">
          <div className="overflow-hidden flex items-start justify-center h-auto relative lg:h-60">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent z-10"></div>
            <img
              src="/_astro/integrations.HhfHOMQB.svg"
              alt="Feature image"
              className="h-full w-full object-contain"
              loading="lazy"
              width="909"
              height="823"
              decoding="async"
            />
          </div>
          <div className="mt-2">
            <span className="bg-gray-100 border-gray-200 border text-gray-800 rounded-full text-xs font-medium px-3 py-1">
              Webhooks
            </span>
            <h3 className="text-xl lg:text-2xl font-medium mt-2">
              100+ Integrations
            </h3>
            <p className="text-slate-600 mt-2 [text-wrap:balance]">
              Astroship can be integrated with hundreds of tools using Zapier.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-24 max-w-3xl mx-auto flex flex-col items-center justify-center">
        <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
          MORE FEATURES
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-4 text-center">
          We've got you covered
        </h2>
        <p className="text-lg mt-4 text-slate-600 text-center [text-wrap:pretty]">
          Our template covers all things SAAS. If you don't find what you're
          looking for, contact us and we'll either help you or steer you in the
          right direction.
        </p>
      </div>

      <div className="grid md:grid-cols-6 grid-cols-12 mt-3 gap-4 md:gap-2">
        <FeatureBox />
        <FeatureBox />
        <FeatureBox />
        <FeatureBox />

        {/* Repeat similar divs for the other items */}
      </div>
    </SectionLayout>
  );
};

export default LandingToolSection;
