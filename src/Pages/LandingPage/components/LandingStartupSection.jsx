import React from "react";
import SectionLayout from "../layouts/SectionLayout";
import FeaturesBanner from '../assets/FeaturesBanner.jpg'

function LandingStartupSection() {
  return (
    <SectionLayout className={'pt-10'}>
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
        <span className="bg-purple-100 border-purple-200 border text-purple-600 rounded-full text-xs font-medium px-3 py-1">
          TWO-COL FEATURES
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-2 text-center">
          Supercharge Your Workflows
        </h2>
        <p className="text-md mt-2 text-slate-600 text-center">
          Unlock your team's true potential with our state-of-the-art SaaS
          platform. From intelligent task management to real-time collaboration
          and top-notch data security, we have everything you need to streamline
          your workflows and achieve high productivity.
        </p>
      </div>

      <div className="grid grid-cols-2  py-10">
        <div className="grid place-items-center">
          <picture>
            <source srcSet="/_astro/6.Ep0jo6kx_jbH81.avif" type="image/avif" />
            <source
              srcSet="/_astro/6.Ep0jo6kx_Z1QgT1P.webp"
              type="image/webp"
            />
            <img
              src="/_astro/6.Ep0jo6kx_Z2s10bH.png"
              alt="Feature Image"
              loading="lazy"
              width="730"
              height="584"
              decoding="async"
            />
          </picture>
        </div>
        <div className="grid place-items-center">
          <div className="max-w-lg">
            <span className="bg-purple-100 border-purple-200 border text-purple-600 -ml-px rounded-full text-xs font-medium px-3 py-1">
              Simplified Workflows
            </span>
            <h3 className="text-2xl font-medium mt-4 text-wrap-balance">
              Experience the Ultimate Boost in Productivity with Our Intuitive
              Platform
            </h3>
            <p className="mt-4 text-slate-600 text-wrap-balance">
              Streamline your tasks and collaborate seamlessly with our
              cutting-edge SaaS startup platform. Unlock the potential of your
              team and take productivity to new heights.
            </p>
            <ul className="grid mt-6 text-left gap-y-4">
              <li className="flex items-center gap-3 text-neutral-800">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32" />
                </svg>
                <span className="text-sm">Intelligent Task Management</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-800">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32" />
                </svg>
                <span className="text-sm">Real-time Collaboration</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-800">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 256 256"
                  className="w-5 h-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32" />
                </svg>
                <span className="text-sm">Data Security & Privacy</span>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-800 inline-flex items-center group gap-px"
              >
                <span>Start 14-day trial</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 mt-px group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-sm px-2 transition py-1 text-slate-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>


      <div className="grid md:grid-cols-2 py-10">
      <div className="grid place-items-center pb-10 md:pb-0 md:order-2">
        <picture>
          <source srcSet="/_astro/2.ldT67BXv_ZIfUrc.avif" type="image/avif" />
          <source srcSet="/_astro/2.ldT67BXv_Z1VcUNt.webp" type="image/webp" />
          <img
            src="/_astro/2.ldT67BXv_ZgktxF.png"
            alt="Feature Image"
            loading="lazy"
            width="1280"
            height="800"
            decoding="async"
          />
        </picture>
      </div>
      <div className="grid place-items-center">
        <div className="max-w-lg">
          <span className="bg-purple-100 border-purple-200 border text-purple-600 -ml-px rounded-full text-xs font-medium px-3 py-1">
            AI-Powered Insights
          </span>
          <h3 className="text-2xl font-medium mt-4 text-wrap-balance">
            Supercharge Your Marketing Strategy with Advanced Analytics
          </h3>
          <p className="mt-4 text-slate-600 text-wrap-balance">
            Harness the potential of AI-driven marketing analytics to optimize your
            campaigns, understand your audience better, and achieve unprecedented
            growth.
          </p>
          <ul className="grid mt-6 text-left gap-y-4">
            <li className="flex items-center gap-3 text-neutral-800">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
                className="w-5 h-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32" />
              </svg>
              <span className="text-sm">Smart Audience Segmentation</span>
            </li>
            <li className="flex items-center gap-3 text-neutral-800">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
                className="w-5 h-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32" />
              </svg>
              <span className="text-sm">Predictive Campaign Performance</span>
            </li>
            <li className="flex items-center gap-3 text-neutral-800">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
                className="w-5 h-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32" />
              </svg>
              <span className="text-sm">Real-time Data Visualization</span>
            </li>
          </ul>
          <div className="flex items-center gap-4 mt-6">
            <a
              href="#"
              className="rounded-full text-center transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-800 inline-flex items-center group gap-px"
            >
              <span>Start 14-day trial</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mt-px group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-sm px-2 transition py-1 text-slate-600 hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:shadow-outline-indigo rounded-full"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>


    </SectionLayout>
  );
}

export default LandingStartupSection;
