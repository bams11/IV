import React from "react";
import {convertSeasonFormat, MatchData} from "../../utils";
import {ChartFrame, Square} from "../../styles/theme";
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
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <div className="season-name">{convertSeasonFormat(season)}</div>
      <div style={{width: "240px", marginLeft: "10px", marginRight: "10px"}}>
        {Object.keys(matchData).length &&
          matchData[season].map((d: any, index: number) => (
            <Square
              key={index}
              style={{backgroundColor: getBackgroundColor(d.result)}}
              onClick={() => {
                console.log(d);
                setSelectedMatch(d);
              }}
            />
          ))}
      </div>
    </ChartFrame>
  );
};

export default DotView;
