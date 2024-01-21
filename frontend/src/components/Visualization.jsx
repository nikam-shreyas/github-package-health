import React, { useMemo, useState } from "react";

import LineUpLite, {
  asTextColumn,
  asCategoricalColumn,
  asNumberBoxPlotColumn,
  asNumberColumn,
  featureDefault,
  featureResizeColumns,
  actionIconsRemixicon,
  featureFlexLayout,
  LineUpLiteStateContextProvider,
  LineUpLitePanel,
  paginationIconsRemixicon,
} from "@lineup-lite/table";

import "@lineup-lite/table/dist/table.css";
import FlipMove from "react-flip-move";

const BodyWrapper = ({ children, style, ref, ...rest }) => {
  return (
    <FlipMove enterAnimation="fade" leaveAnimation="fade" {...rest}>
      {children}
    </FlipMove>
  );
};

const colors = {
  healthy: "green",
  sustainable: "gold",
  needReview: "orange",
  unknown: "red",
};

function Table({ data, showSidePanel, setShowSidePanel }) {
  const columns = useMemo(
    () => [
      asTextColumn("title"),
      asTextColumn("lastRelease"),
      asNumberBoxPlotColumn("Contributors", {}),
      asNumberColumn("weeklyDownloads", {}),
      asNumberColumn("packageHealthScore", {
        color: (value) =>
          `rgba(0, ${Math.floor(value * 255)}, 0, ${0.2 + value * 0.8})`,
      }),
      asCategoricalColumn("status", {
        categories: ["healthy", "sustainable", "needsReview", "unknown"],
        color: (val) => colors[val],
      }),
    ],
    []
  );

  const features = useMemo(
    () => [featureResizeColumns, featureDefault(), featureFlexLayout],
    []
  );

  const icons = useMemo(
    () => ({ ...actionIconsRemixicon(), ...paginationIconsRemixicon() }),
    []
  );

  const components = useMemo(
    () => ({
      tbody: BodyWrapper,
    }),
    []
  );

  return (
    <LineUpLiteStateContextProvider>
      <div className="table-container">
        <div>
          <LineUpLite
            data={data}
            columns={columns}
            features={features}
            icons={icons}
            components={components}
          />
        </div>
        <LineUpLitePanel icons={icons} />
      </div>
    </LineUpLiteStateContextProvider>
  );
}

export default function Visualization({ data }) {
  return (
    <div className="visualization-container" id="visualization">
      <div className="viz-header-container plus-border">
        <div className="viz-header">
          What is going on with your dependencies?
        </div>
        <div className="viz-sub-header">
          We analyze your dependencies' health and present detailed stats on
          your dependencies' well-being. We decode every factor affecting your
          dependency health, metric by metric and provide you detailed stats.
        </div>
      </div>

      <Table data={data} />
    </div>
  );
}
