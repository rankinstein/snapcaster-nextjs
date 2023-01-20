import React from "react";

export default function Homebanner() {
  return (
    <div className="pt-24">
      {" "}
      <div className="text-6xl font-bold bg-clip-text bg-gradient-to-r from-purple-600 to-purple-700 text-transparent">
        <a href="https://snapcaster.ca">snapcaster</a>
      </div>
      <p className="mt-5 text-2xl">Get started by searching for a card </p>
    </div>
  );
}
