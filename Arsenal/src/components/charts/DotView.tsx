import React from "react";
import {convertSeasonFormat} from "../../utils";
import {ChartFrame, Square} from "../../styles/theme";
import {WinChartViewProps} from "./WinChartView";

const DotView: React.FC<WinChartViewProps> = ({
  matchData,
  selectedSeason,
  setSelectedSeason,
  season,
}) => {
  const getBackgroundColor = (result: string): string => {
    if (result === "W") {
      return "skyblue";
    } else if (result === "D") {
      return "gray";
    } else if (result === "L") {
      return "pink";
    }
    return "";
  };

  return (
    <ChartFrame
      style={{
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <div className="season-name">{convertSeasonFormat(season)}</div>
      <div style={{width: "200px", marginLeft: "10px", marginRight: "10px"}}>
        {Object.keys(matchData).length &&
          matchData[season].map((d: any, index: number) => (
            <Square
              key={index}
              style={{backgroundColor: getBackgroundColor(d.result)}}
            />
          ))}
      </div>
    </ChartFrame>
  );
};

export default DotView;
