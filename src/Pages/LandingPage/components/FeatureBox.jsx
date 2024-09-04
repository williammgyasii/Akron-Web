import React from "react";

function FeatureBox({className}) {
  return (
    <div className={`flex flex-col col-span-4 gap-4 items-start group hover:bg-slate-50 hover:border-slate-100 border border-transparent rounded-lg transition-all md:-m-5 p-2 ${className}`}>
      <div className="mt-1 bg-indigo-50 border shadow shadow-indigo-100/50 border-indigo-100 transition-colors rounded-lg grid place-items-center p-2 w-10 h-10 shrink-0">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="text-indigo-500"
          data-icon="fluent:document-javascript-24-regular"
        >
          <symbol id="ai:fluent:document-javascript-24-regular">
            <path
              fill="currentColor"
              d="M18 20.5h-7.034a2.939 2.939 0 0 1-.702 1.5H18a2 2 0 0 0 2-2V9.828a2 2 0 0 0-.586-1.414l-5.829-5.828a.491.491 0 0 0-.049-.04a.63.63 0 0 1-.036-.03a2.072 2.072 0 0 0-.219-.18a.652.652 0 0 0-.08-.044l-.048-.024l-.05-.029c-.054-.031-.109-.063-.166-.087a1.977 1.977 0 0 0-.624-.138a.56.56 0 0 1-.059-.007a.605.605 0 0 0-.082-.007H6a2 2 0 0 0-2 2v10.018a1.745 1.745 0 0 1 1.5.508V4a.5.5 0 0 1 .5-.5h6V8a2 2 0 0 0 2 2h4.5v10a.5.5 0 0 1-.5.5m-.622-12H14a.5.5 0 0 1-.5-.5V4.621zM4.25 15a.75.75 0 0 1 .75.75V20a2 2 0 1 1-4 0v-.25a.75.75 0 0 1 1.5 0V20a.5.5 0 0 0 1 0v-4.25a.75.75 0 0 1 .75-.75m3.7 0A1.95 1.95 0 0 0 6 16.95v.234c0 .614.323 1.184.85 1.5l1.529.918a.25.25 0 0 1 .121.214v.234a.45.45 0 0 1-.45.45h-.1a.45.45 0 0 1-.45-.45V20A.75.75 0 0 0 6 20v.05A1.95 1.95 0 0 0 7.95 22h.1A1.95 1.95 0 0 0 10 20.05v-.234a1.75 1.75 0 0 0-.85-1.5l-1.529-.918a.25.25 0 0 1-.121-.214v-.234a.45.45 0 0 1 .45-.45h.1a.45.45 0 0 1 .45.45V17a.75.75 0 0 0 1.5 0v-.05A1.95 1.95 0 0 0 8.05 15z"
            />
          </symbol>
          <use xlinkHref="#ai:fluent:document-javascript-24-regular" />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-lg">Bring Your Own Framework</h3>
        <p className="text-slate-500 mt-2 leading-relaxed">
          Build your site using React, Svelte, Vue, Preact, web components, or
          just plain ol' HTML + JavaScript.
        </p>
      </div>
    </div>
  );
}

export default FeatureBox;
