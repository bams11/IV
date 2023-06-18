import React from "react";
import {getPositionCounts, keyPlayer, MatchData} from "../../utils";
import BarChart from "../../styles/BarChart";
import {ChartFrame, SmallChartFrame} from "../../styles/theme";

const BarChartView = ({selectedMatch}: {selectedMatch: MatchData | null}) => {
  const result = getPositionCounts(keyPlayer);

  return (
    <ChartFrame style={{flexDirection: "column"}}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        상대팀: {selectedMatch?.opponent}
      </div>
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
        }}
      >
        <SmallChartFrame>풀타임 결과</SmallChartFrame>
        <SmallChartFrame>점유율</SmallChartFrame>
        <SmallChartFrame>유효슛</SmallChartFrame>
      </div>
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
        }}
      >
        <SmallChartFrame>코너킥</SmallChartFrame>
        <SmallChartFrame>파울</SmallChartFrame>
        <SmallChartFrame>경고 및 퇴장</SmallChartFrame>
      </div>
    </ChartFrame>
  );
};

export default BarChartView;
