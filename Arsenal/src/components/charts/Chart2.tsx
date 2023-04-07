import React from "react";
import {keyPlayer, testData3} from "../../data";
import BarChart from "../../styles/BarChart";
import playerData from "../../assets/players.json";

const Chart2 = () => {
  interface PositionCount {
    player: string;
    LW: number;
    RW: number;
    AM: number;
    CM: number;
    LB: number;
    CB: number;
    DM: number;
    LM: number;
  }
  interface PositionData {
    [key: string]: string[];
  }

  const getPlayerPositions = (playerName: string) => {
    // 각 선수가 어떤 포지션에서 경기를 했다고 가정한 데이터
    const playerPositions: PositionData = {
      Xhaka: ["DM", "LM", "LB"],
      Saka: ["LW", "LM", "RW", "CM"],
      Zinchenko: ["LB"],
      Odegaard: ["AM", "CM"],
      Jorginho: ["DM", "CM"],
    };

    return playerPositions[playerName] || [];
  };

  const getPositionCounts = (players: string[]) => {
    const filteredData = playerData.filter(
      (d) => d.Date.startsWith("2023") || d.Date.startsWith("2022")
    );
    const counts: any[] = players.map((p) => ({
      player: p,
      AM: 0,
      CM: 0,
      LB: 0,
      CB: 0,
      DM: 0,
      LW: 0,
      RW: 0,
    }));

    filteredData.forEach((d: any) => {
      const playerIndex = players.indexOf(d.LastName);
      if (playerIndex > -1) {
        const positions = getPlayerPositions(d.LastName);
        positions.forEach((p: any) => {
          if (p === d.Pos) {
            counts[playerIndex][p]++;
          }
        });
      }
    });

    return counts;
  };
  const result = getPositionCounts(keyPlayer);
  console.log(result);
  return (
    <div style={{flex: 1, width: "100%", height: "50vh", display: "flex"}}>
      <BarChart data={result} />
    </div>
  );
};

export default Chart2;
