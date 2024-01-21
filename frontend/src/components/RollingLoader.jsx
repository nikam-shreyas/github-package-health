import React, { useState, useEffect } from "react";
import Loader from "./Loader";

function RollingLoader() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const messages = [
    "Getting requirements.txt...",
    "Getting health of repository...",
    "Scraping data for all the packages...",
    "Processing data...",
    "Parsing the data for visualization...",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => Math.min(prevIndex + 1, 4));
    }, 2000); // Change the interval as needed

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loader">
      <br />
      <Loader />
      <span className="loading-messages">{messages[currentMessageIndex]}</span>
    </div>
  );
}

export default RollingLoader;
