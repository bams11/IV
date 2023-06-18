import React from "react";
import {convertSeasonFormat, MatchData} from "../../utils";
import {ChartFrame, SquareView} from "../../styles/theme";
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
      return "#448CCB";
    } else if (result === "D") {
      return "#959EA2";
    } else if (result === "L") {
      return "#F15B5B";
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
          position: "relative",
          width: "280px",
          marginLeft: "10px",
          marginRight: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-100px",
            top: "128px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SquareView
              style={{
                backgroundColor: "#448CCB",
                width: "16px",
                height: "16px",
                margin: "1px",
              }}
            />
            <div style={{fontSize: 12, marginLeft: "10px"}}>W</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SquareView
              style={{
                backgroundColor: "#959EA2",
                width: "16px",
                height: "16px",
                margin: "1px",
              }}
            />
            <div style={{fontSize: 12, marginLeft: "10px"}}>D</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SquareView
              style={{
                backgroundColor: "#F15B5B",
                width: "16px",
                height: "16px",
                margin: "1px",
              }}
            />
            <div style={{fontSize: 12, marginLeft: "10px"}}>L</div>
          </div>
        </div>
        {Object.keys(matchData).length &&
          matchData[season].map((d: any, index: number) => {
            return (
              <Square
                key={index}
                data={d}
                style={{
                  backgroundColor: getBackgroundColor(d.result),
                  borderColor: "black",
                  borderWidth: selectedMatch?.date === d.date ? "3px" : "0px",
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
