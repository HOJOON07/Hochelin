import React from "react";

export default function Loading() {
  return (
    <React.Fragment>
      {Array.from({ length: 10 }).map((e, i) => {
        return (
          <div
            className="w-full h-20 animate-pulse bg-gray-200 rounded-md mt-2"
            key={i}
          ></div>
        );
      })}
    </React.Fragment>
  );
}
