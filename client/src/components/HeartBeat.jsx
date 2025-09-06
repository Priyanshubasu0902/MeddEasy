import React from "react";

const HeartBeat = () => {
  return (
    <div className="w-full h-40 bg-transparent flex items-center justify-center px-30 max-sm:hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 200"
        preserveAspectRatio="none"
      >
        {/* ECG Path */}
        <path
          d="M0 100 L80 100 L100 60 L120 120 L150 15 L180 190 L200 0 L220 140 L250 60 L300 100 L1000 100 L1000"
          fill="none"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="heartbeat-path"
        />
      </svg>

      {/* Animation Styles */}
      <style>{`
        .heartbeat-path {
          stroke-dasharray: 1100;    /* total path length */
          stroke-dashoffset: 950;
          animation: draw 4s linear infinite;
        }

        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HeartBeat;
