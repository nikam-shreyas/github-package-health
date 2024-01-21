import React from "react";
import Loader from "../components/Loader";

export default function Insights({ aiInsights, getInsights, insightLoader }) {
  return (
    <div className="insights-container">
      <h4>
        <span>
          <button className="button" onClick={getInsights}>
            Generate New Insights{" "}
            <small>
              <i
                class="fa-solid fa-star"
                style={{ top: "-0.01rem", position: "relative" }}
              ></i>
            </small>
          </button>
          {insightLoader && <Loader />}
        </span>
      </h4>
      <br />
      <h4>Here are some insights on your repository:</h4>
      {aiInsights["insights"].map((insight, index) => (
        <div className="insight">
          {index + 1}. {insight}
        </div>
      ))}
      <br />
      <h4>Consider replacing the following packages:</h4>
      {Object.entries(aiInsights["replacements"]).map(([key, value]) => (
        <div className="insight">
          <code>{key}</code> with <code>{value}</code>
        </div>
      ))}
      <br />
      <h4>General Suggestions:</h4>
      {aiInsights["general_suggestions"].map((suggestion, index) => (
        <div className="insight">
          {index + 1}. {suggestion}
        </div>
      ))}
      <br />
      <h4>Other Suggestions:</h4>
      {aiInsights["other_suggestions"].map((suggestion, index) => (
        <div className="insight">
          {index + 1}. {suggestion}
        </div>
      ))}
    </div>
  );
}
