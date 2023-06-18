import React from "react";
import {getPlayerRadar} from "../../utils";
import Radar from "../../styles/Radar";
import {ChartFrame} from "../../styles/theme";

const RadarView = ({season}: {season: string}) => {
  const result = getPlayerRadar(season);
  return (
    <ChartFrame
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{fontWeight: "bold", fontSize: 20, lineHeight: "24px"}}>
        Seasonal Best Players
      </div>
      <div style={{width: "100%", height: `calc(50vh - 24px)`}}>
        <Radar data={result} />
      </div>
    </ChartFrame>
  );
};

export default RadarView;
