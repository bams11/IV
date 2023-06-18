import React from "react";
import {
  cardData,
  cornerKickData,
  foulData,
  goalData,
  MatchData,
  shootData,
  shootOnTargetData,
  transformData,
} from "../../utils";
import {ChartFrame, SmallChartFrame} from "../../styles/theme";
import {PieChart} from "../../styles/PieChart";
import BarChart from "../../styles/BarChart";

const BarChartView = ({selectedMatch}: {selectedMatch: MatchData | null}) => {
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
        Opponent: {selectedMatch?.opponent}
      </div>
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
        }}
      >
        <SmallChartFrame>
          <BarChart
            data={
              selectedMatch
                ? goalData(selectedMatch)
                : [
                    {
                      team: "home",
                      FHG: 0,
                      SHG: 0,
                    },
                    {
                      team: "away",
                      FHG: 0,
                      SHG: 0,
                    },
                  ]
            }
            index={"team"}
            keys={["FHG", "SHG"]}
          />
          Total Goals
        </SmallChartFrame>
        <SmallChartFrame>
          <BarChart
            data={
              selectedMatch
                ? shootData(selectedMatch)
                : [
                    {
                      team: "home",
                      S: 0,
                    },
                    {
                      team: "away",
                      S: 0,
                    },
                  ]
            }
            index={"team"}
            keys={["S"]}
          />
          Total Shots
        </SmallChartFrame>
        <SmallChartFrame>
          <BarChart
            data={
              selectedMatch
                ? shootOnTargetData(selectedMatch)
                : [
                    {team: "home", ST: 0},
                    {team: "away", ST: 0},
                  ]
            }
            index={"team"}
            keys={["ST"]}
          />
          Shoots on Target
        </SmallChartFrame>
      </div>
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
        }}
      >
        <SmallChartFrame>
          <BarChart
            data={
              selectedMatch
                ? cornerKickData(selectedMatch)
                : [
                    {team: "home", S: 0},
                    {team: "away", S: 0},
                  ]
            }
            index={"team"}
            keys={["CK"]}
          />
          Corners
        </SmallChartFrame>
        <SmallChartFrame>
          <BarChart
            data={
              selectedMatch
                ? foulData(selectedMatch)
                : [
                    {
                      team: "home",
                      F: 0,
                    },
                    {
                      team: "away",
                      F: 0,
                    },
                  ]
            }
            index={"team"}
            keys={["F"]}
          />
          Fouls
        </SmallChartFrame>
        <SmallChartFrame>
          <BarChart
            data={
              selectedMatch
                ? cardData(selectedMatch)
                : [
                    {team: "home", YC: 0, RC: 0},
                    {team: "away", YC: 0, RC: 0},
                  ]
            }
            index={"team"}
            keys={["YC", "RC"]}
          />
          Cards
        </SmallChartFrame>
      </div>
    </ChartFrame>
  );
};

export default BarChartView;
