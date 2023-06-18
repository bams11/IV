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

interface PlayerSummaries {
  [LastName: string]: {
    LastName: string;
    FirstName: string;
    Passes: number;
    PassesA: number;
    Carries: number;
    Min: number;
    Touches: number;
    Count: number;
  };
}

const indices = ["Passes", "PassesA", "Carries", "Min", "Touches"];

export const getPlayerRadar = (season: string) => {
  const filteredPlayerData = playerData.filter((data) =>
    seasonObject[season].includes(data.Date)
  );

  const playerSummaries: PlayerSummaries = {};
  filteredPlayerData.forEach((player) => {
    const {LastName, FirstName, Passes, PassesA, Carries, Min, Touches} =
      player;

    if (!(LastName in playerSummaries)) {
      playerSummaries[LastName] = {
        LastName,
        FirstName,
        Passes: 0,
        PassesA: 0,
        Carries: 0,
        Min: 0,
        Touches: 0,
        Count: 0,
      };
    }

    playerSummaries[LastName].Passes += Passes;
    playerSummaries[LastName].PassesA += PassesA;
    playerSummaries[LastName].Carries += Carries;
    playerSummaries[LastName].Min += Min;
    playerSummaries[LastName].Touches += Touches;
    playerSummaries[LastName].Count += 1;
  });

  const summaries = Object.values(playerSummaries);
  const sortedPlayerData = summaries.sort((a: any, b: any) => b.Min - a.Min);
  const topPlayers = sortedPlayerData.slice(0, 5);
  const result = indices.map((index) => {
    const obj: any = {index: index};

    topPlayers.forEach((player: any) => {
      obj[player.LastName] = player[index] / player["Count"];
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

export const convertSeasonFormat = (season: string) => {
  const [startYear, endYear] = season.split("-");
  const shortStartYear = startYear.slice(2);
  return `${shortStartYear}/${endYear}`;
};

interface SeasonObject {
  [season: string]: string[];
}

export const seasonObject: SeasonObject = {
  "2017-18": [
    "2017-08-11",
    "2017-08-19",
    "2017-08-27",
    "2017-09-09",
    "2017-09-17",
    "2017-09-25",
    "2017-10-01",
    "2017-10-14",
    "2017-10-22",
    "2017-10-28",
    "2017-11-05",
    "2017-11-18",
    "2017-11-26",
    "2017-11-29",
    "2017-12-02",
    "2017-12-10",
    "2017-12-13",
    "2017-12-16",
    "2017-12-22",
    "2017-12-28",
    "2017-12-31",
    "2018-01-03",
    "2018-01-14",
    "2018-01-20",
    "2018-01-30",
    "2018-02-03",
    "2018-02-10",
    "2018-03-01",
    "2018-03-04",
    "2018-03-11",
    "2018-04-01",
    "2018-04-08",
    "2018-04-15",
    "2018-04-22",
    "2018-04-29",
    "2018-05-06",
    "2018-05-09",
    "2018-05-13",
  ],
  "2018-19": [
    "2018-08-12",
    "2018-08-18",
    "2018-08-25",
    "2018-09-02",
    "2018-09-15",
    "2018-09-23",
    "2018-09-29",
    "2018-10-07",
    "2018-10-22",
    "2018-10-28",
    "2018-11-03",
    "2018-11-11",
    "2018-11-25",
    "2018-12-02",
    "2018-12-05",
    "2018-12-08",
    "2018-12-16",
    "2018-12-22",
    "2018-12-26",
    "2018-12-29",
    "2019-01-01",
    "2019-01-12",
    "2019-01-19",
    "2019-01-29",
    "2019-02-03",
    "2019-02-09",
    "2019-02-24",
    "2019-02-27",
    "2019-03-02",
    "2019-03-10",
    "2019-04-01",
    "2019-04-07",
    "2019-04-15",
    "2019-04-21",
    "2019-04-24",
    "2019-04-28",
    "2019-05-05",
    "2019-05-12",
  ],
  "2019-20": [
    "2019-08-11",
    "2019-08-17",
    "2019-08-24",
    "2019-09-01",
    "2019-09-15",
    "2019-09-22",
    "2019-09-30",
    "2019-10-06",
    "2019-10-21",
    "2019-10-27",
    "2019-11-02",
    "2019-11-09",
    "2019-11-23",
    "2019-12-01",
    "2019-12-05",
    "2019-12-09",
    "2019-12-15",
    "2019-12-21",
    "2019-12-26",
    "2019-12-29",
    "2020-01-01",
    "2020-01-11",
    "2020-01-18",
    "2020-01-21",
    "2020-02-02",
    "2020-02-16",
    "2020-02-23",
    "2020-03-07",
    "2020-06-17",
    "2020-06-20",
    "2020-06-25",
    "2020-07-01",
    "2020-07-04",
    "2020-07-07",
    "2020-07-12",
    "2020-07-15",
    "2020-07-21",
    "2020-07-26",
  ],
  "2020-21": [
    "2020-09-12",
    "2020-09-19",
    "2020-09-28",
    "2020-10-04",
    "2020-10-17",
    "2020-10-25",
    "2020-11-01",
    "2020-11-08",
    "2020-11-22",
    "2020-11-29",
    "2020-12-06",
    "2020-12-13",
    "2020-12-16",
    "2020-12-19",
    "2020-12-26",
    "2020-12-29",
    "2021-01-02",
    "2021-01-14",
    "2021-01-18",
    "2021-01-26",
    "2021-01-30",
    "2021-02-02",
    "2021-02-06",
    "2021-02-14",
    "2021-02-21",
    "2021-02-28",
    "2021-03-06",
    "2021-03-14",
    "2021-03-21",
    "2021-04-03",
    "2021-04-11",
    "2021-04-18",
    "2021-04-23",
    "2021-05-02",
    "2021-05-09",
    "2021-05-12",
    "2021-05-19",
    "2021-05-23",
  ],
  "2021-22": [
    "2021-08-13",
    "2021-08-22",
    "2021-08-28",
    "2021-09-11",
    "2021-09-18",
    "2021-09-26",
    "2021-10-02",
    "2021-10-18",
    "2021-10-22",
    "2021-10-30",
    "2021-11-07",
    "2021-11-20",
    "2021-11-27",
    "2021-12-02",
    "2021-12-06",
    "2021-12-11",
    "2021-12-15",
    "2021-12-18",
    "2021-12-26",
    "2022-01-01",
    "2022-01-23",
    "2022-02-10",
    "2022-02-19",
    "2022-02-24",
    "2022-03-06",
    "2022-03-13",
    "2022-03-16",
    "2022-03-19",
    "2022-04-04",
    "2022-04-09",
  ],
};

export interface MatchData {
  date: string;
  result: string;
  opponent: string;
  Season: string;
  HomeTeam: string;
  AwayTeam: string;
  FTHG: number;
  FTAG: number;
  FTR: string;
  HTHG: number;
  HTAG: number;
  HTR: string;
  Referee: string;
  HS: number;
  AS: number;
  HST: number;
  AST: number;
  HC: number;
  AC: number;
  HF: number;
  AF: number;
  HY: number;
  AY: number;
  HR: number;
  AR: number;
}

interface ChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

export const transformData = (match: MatchData | null): ChartData[] => {
  if (match === null) {
    return [];
  }

  const {HomeTeam, AwayTeam, FTHG, FTAG} = match;
  const result = [];
  if (HomeTeam === "Arsenal") {
    result.push({
      id: HomeTeam,
      label: HomeTeam,
      value: FTHG,
      color: "red",
    });
    result.push({
      id: AwayTeam,
      label: AwayTeam,
      value: FTAG,
      color: "blue",
    });
  } else {
    result.push({
      id: AwayTeam,
      label: AwayTeam,
      value: FTAG,
      color: "red",
    });
    result.push({
      id: HomeTeam,
      label: HomeTeam,
      value: FTHG,
      color: "blue",
    });
  }
  return result;
};

interface GoalData {
  team: string;
  FHG: number;
  SHG: number;
}

export const goalData = (match: MatchData): GoalData[] => {
  if (match === null) {
    return [];
  }
  const result = [];
  result.push({
    team: match.HomeTeam,
    FHG: match.HTHG,
    SHG: match.FTHG - match.HTHG,
  });
  result.push({
    team: match.AwayTeam,
    FHG: match.HTAG,
    SHG: match.FTAG - match.HTAG,
  });

  return result;
};

interface ShootData {
  team: string;
  S: number;
}

export const shootData = (match: MatchData): ShootData[] => {
  const result = [];
  result.push({
    team: match.HomeTeam,
    S: match.HS,
  });
  result.push({
    team: match.AwayTeam,
    S: match.AS,
  });

  return result;
};

interface ShootOnTargetData {
  team: string;
  ST: number;
}

export const shootOnTargetData = (match: MatchData): ShootOnTargetData[] => {
  const result = [];
  result.push({
    team: match.HomeTeam,
    ST: match.HST,
  });
  result.push({
    team: match.AwayTeam,
    ST: match.AST,
  });

  return result;
};

interface CornerKickData {
  team: string;
  CK: number;
}

export const cornerKickData = (match: MatchData): CornerKickData[] => {
  const result = [];
  result.push({
    team: match.HomeTeam,
    CK: match.HC,
  });
  result.push({
    team: match.AwayTeam,
    CK: match.AC,
  });

  return result;
};

interface FoulData {
  team: string;
  F: number;
}

export const foulData = (match: MatchData): FoulData[] => {
  const result = [];
  result.push({
    team: match.HomeTeam,
    F: match.HF,
  });
  result.push({
    team: match.AwayTeam,
    F: match.AF,
  });

  return result;
};

interface CardData {
  team: string;
  YC: number;
  RC: number;
}

export const cardData = (match: MatchData): CardData[] => {
  const result = [];
  result.push({
    team: match.HomeTeam,
    YC: match.HY,
    RC: match.HR,
  });
  result.push({
    team: match.AwayTeam,
    YC: match.AY,
    RC: match.AR,
  });

  return result;
};
