import React from "react";
import {getPlayerRadar} from "../../utils";
import Radar from "../../styles/Radar";
import {ChartFrame} from "../../styles/theme";

const RadarView = () => {
  const result = getPlayerRadar();
  return (
    <ChartFrame>
      <Radar data={result} />
    </ChartFrame>
  );
};

export default RadarView;
