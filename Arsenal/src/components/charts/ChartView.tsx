import React from "react";
import {ChartBody} from "../../styles/theme";
import HeatmapView from "./HeatmapView";
import BarChartView from "./BarChartView";
import RadarView from "./RadarView";

const ChartView = () => {
  return (
    <ChartBody>
      <HeatmapView />
      <div
        style={{flex: 1, flexDirection: "row", display: "flex", width: "100%"}}
      >
        <BarChartView />
        <RadarView />
      </div>
    </ChartBody>
  );
};

export default ChartView;
