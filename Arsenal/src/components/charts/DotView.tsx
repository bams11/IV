import React from "react";
import {convertSeasonFormat, MatchData} from "../../utils";
import {ChartFrame} from "../../styles/theme";
import {Square} from "../../styles/Square";
export interface DotViewProps {
  matchData: any;
  selectedMatch: MatchData | null;
  setSelectedMatch: React.Dispatch<React.SetStateAction<any>>;
  season: string;
}

const DotView: React.FC<DotViewProps> = ({
  matchData,
  selectedMatch,
  setSelectedMatch,
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
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: "20px",
        }}
      >
        Seasonal Match Data
      </div>
      <div
        style={{
          width: "280px",
          marginLeft: "10px",
          marginRight: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Object.keys(matchData).length &&
          matchData[season].map((d: any, index: number) => {
            return (
              <Square
                key={index}
                data={d}
                style={{
                  backgroundColor: getBackgroundColor(d.result),
                  borderColor: "black",
                  borderWidth: selectedMatch?.date === d.date ? "2px" : "0px",
                  borderStyle: "solid",
                  boxSizing: "border-box",
                }}
                onClick={() => {
                  setSelectedMatch(d);
                }}
              />
            );
          })}
      </div>
      <div
        style={{
          textAlign: "center",
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        <div>season: </div>
        <div style={{textAlign: "center", fontWeight: "bold"}}>
          {convertSeasonFormat(season)}
        </div>
      </div>
    </ChartFrame>
  );
};

export default DotView;
