import React from "react";
import {getPositionCounts, keyPlayer} from "../../utils";
import {ChartFrame} from "../../styles/theme";
import {WinChart} from "../../styles/WinChart";

export interface WinChartViewProps {
  matchData: any;
  selectedSeason: string;
  setSelectedSeason: React.Dispatch<React.SetStateAction<any>>;
  season: string;
}

const WinChartView: React.FC<WinChartViewProps> = ({
  matchData,
  selectedSeason,
  setSelectedSeason,
  season,
}) => {
  const dataNormalized: {
    season: string;
    W: number;
    D: number;
    L: number;
  }[] = [];
  Object.values(matchData).map((d: any, index: number) => {
    const season: string = Object.keys(matchData)[index];
    let W: number = 0;
    let D: number = 0;
    let L: number = 0;
    d.forEach((match: any) => {
      if (match.result === "W") {
        W++;
      } else if (match.result === "D") {
        D++;
      } else {
        L++;
      }
    });
    dataNormalized.push({season, W, D, L});
    return 0;
  });
  return (
    <ChartFrame>
      <WinChart
        data={dataNormalized}
        type={"grouped"}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
      />
    </ChartFrame>
  );
};

export default WinChartView;
