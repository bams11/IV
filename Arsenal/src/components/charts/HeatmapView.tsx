import React from "react";
import HeatMap from "../../styles/HeatMap";
import {ChartFrame} from "../../styles/theme";
import {groupedData} from "../../utils";

const HeatmapView = () => {
  return (
    <ChartFrame>
      <HeatMap data={groupedData} />
    </ChartFrame>
  );
};

export default HeatmapView;
