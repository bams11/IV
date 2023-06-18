import React, {useEffect, useState} from "react";
import {ChartBody, ChartFrame, SmallChartFrame} from "../../styles/theme";
import HeatmapView from "./HeatmapView";
import BarChartView from "./BarChartView";
import RadarView from "./RadarView";
import WinChartView from "./WinChartView";
import matchResult from "../../assets/results.json";
import {MatchData} from "../../utils";
import DotView from "./DotView";
import SeasonRadio from "./SeasonRadio";

const ChartView = () => {
  const [matchData, setMatchData] = useState<{[season: string]: MatchData[]}>(
    {}
  );
  const [selectedSeason, setSelectedSeason] = useState<string>("2017-18");
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);

  const [seasons, setSeasons] = useState<string[]>([]);
  useEffect(() => {
    const filteredData: {[season: string]: MatchData[]} = {};
    const seasonsArr: string[] = [];
    matchResult.forEach((d) => {
      if (d.HomeTeam === "Arsenal" || d.AwayTeam === "Arsenal") {
        const date = d.DateTime.substring(0, 10);
        const season = d.Season;
        seasonsArr.push(season);

        const result =
          (d.FTR === "H" && d.HomeTeam === "Arsenal") ||
          (d.FTR === "A" && d.AwayTeam === "Arsenal")
            ? "W"
            : (d.FTR === "H" && d.AwayTeam === "Arsenal") ||
              (d.FTR === "A" && d.HomeTeam === "Arsenal")
            ? "L"
            : "D";

        const opponent = d.HomeTeam === "Arsenal" ? d.AwayTeam : d.HomeTeam;

        if (!filteredData[season]) {
          filteredData[season] = [];
        }

        filteredData[season].push({
          ...d,
          date: date,
          result: result,
          opponent: opponent,
        });
      }
    });
    setSeasons(seasonsArr.filter((v, i) => seasonsArr.indexOf(v) === i));
    setMatchData(filteredData);
  }, []);

  return (
    <ChartBody>
      <div
        style={{
          flex: 1,
          flexDirection: "column",
          display: "flex",
          height: "100%",
          boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ChartFrame style={{display: "flex", flexDirection: "column"}}>
          <SeasonRadio
            seasons={seasons}
            selectedSeason={selectedSeason}
            onSelectSeason={setSelectedSeason}
          />
          <DotView
            matchData={matchData}
            selectedMatch={selectedMatch}
            setSelectedMatch={setSelectedMatch}
            season={selectedSeason}
          />
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
            }}
          ></div>
        </ChartFrame>

        <RadarView season={selectedSeason} />
      </div>
      <div
        style={{
          flex: 1,
          flexDirection: "column",
          display: "flex",
          height: "100%",
        }}
      >
        <WinChartView
          matchData={matchData}
          selectedSeason={selectedSeason}
          setSelectedSeason={setSelectedSeason}
          season={selectedSeason}
        />
        <BarChartView selectedMatch={selectedMatch} />
      </div>
    </ChartBody>
  );
};

export default ChartView;
