import playerData from "./assets/players.json";

export const keyPlayer = ["Xhaka", "Saka", "Odegaard", "Jorginho", "Zinchenko"];

interface PlayerStats {
  LastName: string;
  FirstName: string;
  Date: string;
  Start: number;
  Pos: string;
  Min: number;
  G: number;
  A: number;
  PK: number;
  PKA: number;
  S: number;
  SoT: number;
  YK: number;
  RK: number;
  Touches: number;
  Tackles: number;
  Ints: number;
  Blocks: number;
  xG: number;
  npxG: number;
  xAG: number;
  Passes: number;
  PassesA: number;
  PrgPas: number;
  Carries: number;
  PrgCar: number;
  Line: string;
  C: number;
}

interface PositionPasses {
  [key: string]: {sum: number; count: number};
  LW: {sum: number; count: number};
  FW: {sum: number; count: number};
  RW: {sum: number; count: number};
  LM: {sum: number; count: number};
  AM: {sum: number; count: number};
  CM: {sum: number; count: number};
  DM: {sum: number; count: number};
  RM: {sum: number; count: number};
  LB: {sum: number; count: number};
  CB: {sum: number; count: number};
  RB: {sum: number; count: number};
  WB: {sum: number; count: number};
}
interface YearlyPositionStats {
  [year: number]: PositionPasses;
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

export const getPositionCounts = (players: string[]) => {
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

const indices = [
  {index: "Passes"},
  {index: "PassesA"},
  {index: "Carries"},
  {index: "Min"},
  {index: "Touches"},
];
const filteredData = playerData.filter(
  (player) =>
    player.Date.startsWith("2023") && keyPlayer.includes(player.LastName)
);

export const getPlayerRadar = () => {
  const result = indices.map((index) => {
    const obj: any = {...index};
    keyPlayer.forEach((player) => {
      const filteredPlayerData = filteredData.filter(
        (data) => data.FirstName === player || data.LastName === player
      );
      const sum = filteredPlayerData.reduce((acc, curr: any) => {
        return acc + curr[obj.index];
      }, 0);
      obj[player] = sum / filteredPlayerData.length;
    });
    return obj;
  });
  return result;
};

const yearlyPositionStats: YearlyPositionStats = {};

// 데이터를 이용해 yearlyPositionStats를 채웁니다.
playerData.forEach((player: PlayerStats) => {
  const year = new Date(player.Date).getFullYear();
  const pos = player.Pos as keyof PositionPasses;
  if (!yearlyPositionStats[year]) {
    yearlyPositionStats[year] = {
      LW: {sum: 0, count: 0},
      FW: {sum: 0, count: 0},
      RW: {sum: 0, count: 0},
      LM: {sum: 0, count: 0},
      AM: {sum: 0, count: 0},
      CM: {sum: 0, count: 0},
      DM: {sum: 0, count: 0},
      RM: {sum: 0, count: 0},
      LB: {sum: 0, count: 0},
      CB: {sum: 0, count: 0},
      RB: {sum: 0, count: 0},
      WB: {sum: 0, count: 0},
    };
  }
  yearlyPositionStats[year][pos].sum += player.PrgPas;
  yearlyPositionStats[year][pos].count += 1;
});

// 각 연도와 포지션에 대해 Passes 평균을 계산합니다.
Object.keys(yearlyPositionStats).forEach((year: any) => {
  Object.keys(yearlyPositionStats[year]).forEach((pos) => {
    const count = yearlyPositionStats[year][pos].count;
    yearlyPositionStats[year][pos].sum /= count;
  });
});

type GroupedData = {
  id: string;
  data: {x: string; y: number}[];
}[];

export const groupedData: GroupedData = Object.keys(yearlyPositionStats).map(
  (year: any) => {
    const yearData = yearlyPositionStats[year];
    const positions = Object.keys(yearData);
    const data = positions.map((pos) => ({
      x: pos,
      y: yearData[pos].sum,
    }));
    return {id: year, data};
  }
);
