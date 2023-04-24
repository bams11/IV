import React from "react";
import {getPositionCounts, keyPlayer} from "../../utils";
import BarChart from "../../styles/BarChart";
import {ChartFrame} from "../../styles/theme";

const BarChartView = () => {
  const result = getPositionCounts(keyPlayer);

  return (
    <ChartFrame>
      <BarChart data={result} />
    </ChartFrame>
  );
};

export default BarChartView;
