import playerData from "./assets/players.json";

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
export const keyPlayer = ["Xhaka", "Saka", "Odegaard", "Jorginho", "Zinchenko"];

export const testData = [
  {
    id: "2017",
    data: [
      {
        x: "Xhaka",
        y: -9661,
      },
      {
        x: "Lacazette",
        y: -37687,
      },
      {
        x: "Ramsey",
        y: 43088,
      },
      {
        x: "Ozil",
        y: 84589,
      },
      {
        x: "Bellerin",
        y: -44567,
      },
      {
        x: "Aubameyang",
        y: 63580,
      },
      {
        x: "Moped",
        y: -60122,
      },
      {
        x: "Bicycle",
        y: 96849,
      },
      {
        x: "Oths",
        y: -49705,
      },
      {
        x: "Oers",
        y: -49705,
      },
      {
        x: "thers",
        y: -49705,
      },
      {
        x: "hers",
        y: -49705,
      },
      {
        x: "rs",
        y: -49705,
      },
    ],
  },
  {
    id: "2018",
    data: [
      {
        x: "Xhaka",
        y: 36830,
      },
      {
        x: "Lacazette",
        y: -86757,
      },
      {
        x: "Ramsey",
        y: 51532,
      },
      {
        x: "Ozil",
        y: -30274,
      },
      {
        x: "Bellerin",
        y: 76215,
      },
      {
        x: "Aubameyang",
        y: 19931,
      },
      {
        x: "Moped",
        y: -99544,
      },
      {
        x: "Others",
        y: -45951,
      },
    ],
  },
  {
    id: "2019",
    data: [
      {
        x: "Xhaka",
        y: -65358,
      },
      {
        x: "Lacazette",
        y: -78887,
      },
      {
        x: "Ramsey",
        y: -17620,
      },
      {
        x: "Ozil",
        y: 97848,
      },
      {
        x: "Bellerin",
        y: 43407,
      },
      {
        x: "Aubameyang",
        y: -76118,
      },
      {
        x: "Moped",
        y: 51662,
      },
      {
        x: "Bicycle",
        y: 77165,
      },
      {
        x: "Others",
        y: 1930,
      },
    ],
  },
  {
    id: "2020",
    data: [
      {
        x: "Lacazette",
        y: 32043,
      },
      {
        x: "Ramsey",
        y: 8948,
      },
      {
        x: "Ozil",
        y: 53195,
      },
      {
        x: "Bellerin",
        y: -49295,
      },
      {
        x: "Aubameyang",
        y: -74595,
      },
      {
        x: "Moped",
        y: 56045,
      },
      {
        x: "Bicycle",
        y: 19769,
      },
      {
        x: "Others",
        y: -13377,
      },
    ],
  },
  {
    id: "2021",
    data: [
      {
        x: "Xhaka",
        y: -93155,
      },
      {
        x: "Lacazette",
        y: 85305,
      },
      {
        x: "Ramsey",
        y: -11366,
      },
      {
        x: "Ozil",
        y: 69676,
      },
      {
        x: "Bellerin",
        y: 25509,
      },
      {
        x: "Aubameyang",
        y: 56667,
      },
      {
        x: "Moped",
        y: -31518,
      },
      {
        x: "Bicycle",
        y: 95185,
      },
      {
        x: "Others",
        y: 39835,
      },
    ],
  },
  {
    id: "2022",
    data: [
      {
        x: "Xhaka",
        y: -79856,
      },
      {
        x: "Lacazette",
        y: 21144,
      },
      {
        x: "Ramsey",
        y: -20097,
      },
      {
        x: "Ozil",
        y: 58530,
      },
      {
        x: "Bellerin",
        y: -38721,
      },
      {
        x: "Aubameyang",
        y: -95957,
      },
      {
        x: "Moped",
        y: 17403,
      },
      {
        x: "Bicycle",
        y: 16929,
      },
      {
        x: "Others",
        y: -87821,
      },
    ],
  },
  {
    id: "2023",
    data: [
      {
        x: "Xhaka",
        y: -55556,
      },
      {
        x: "Lacazette",
        y: 99004,
      },
      {
        x: "Ramsey",
        y: -451,
      },
      {
        x: "Ozil",
        y: -99451,
      },
      {
        x: "Bellerin",
        y: 23236,
      },
      {
        x: "Aubameyang",
        y: 51961,
      },
      {
        x: "Moped",
        y: -55200,
      },
      {
        x: "Bicycle",
        y: 10253,
      },
      {
        x: "Others",
        y: 99358,
      },
    ],
  },
];

export const testData2 = [
  {
    id: "JavaScript",
    data: [
      {
        x: 2017,
        y: 19,
      },
      {
        x: 2018,
        y: 23,
      },
      {
        x: 2019,
        y: 20,
      },
      {
        x: 2020,
        y: 21,
      },
      {
        x: 2021,
        y: 12,
      },
      {
        x: 2022,
        y: 10,
      },
      {
        x: 2023,
        y: 10,
      },
    ],
  },
  {
    id: "ReasonML",
    data: [
      {
        x: 2017,
        y: 12,
      },
      {
        x: 2018,
        y: 10,
      },
      {
        x: 2019,
        y: 14,
      },
      {
        x: 2020,
        y: 29,
      },
      {
        x: 2021,
        y: 12,
      },
      {
        x: 2022,
        y: 12,
      },
      {
        x: 2023,
        y: 10,
      },
    ],
  },
  {
    id: "TypeScript",
    data: [
      {
        x: 2017,
        y: 14,
      },
      {
        x: 2018,
        y: 18,
      },
      {
        x: 2019,
        y: 18,
      },
      {
        x: 2020,
        y: 26,
      },
      {
        x: 2021,
        y: 12,
      },
      {
        x: 2022,
        y: 22,
      },
    ],
  },
  {
    id: "Elm",
    data: [
      {
        x: 2017,
        y: 28,
      },
      {
        x: 2019,
        y: 26,
      },
      {
        x: 2020,
        y: 21,
      },
      {
        x: 2021,
        y: 10,
      },
      {
        x: 2022,
        y: 14,
      },
      {
        x: 2023,
        y: 10,
      },
    ],
  },
  {
    id: "CoffeeScript",
    data: [
      {
        x: 2017,
        y: 30,
      },
      {
        x: 2018,
        y: 19,
      },
      {
        x: 2019,
        y: 19,
      },
      {
        x: 2021,
        y: 25,
      },
      {
        x: 2022,
        y: 25,
      },
      {
        x: 2023,
        y: 10,
      },
    ],
  },
];

export const testData3 = [
  {
    player: "Xhaka",
    AM: 71,
    CM: 103,
    LB: 100,
    CB: 193,
    DM: 156,
    LM: 195,
  },
  {
    player: "Saka",
    AM: 39,
    CM: 103,
    LB: 100,
    CB: 193,
    DM: 156,
    LM: 195,
  },
  {
    player: "Zinchenko",
    AM: 113,
    CM: 103,
    LB: 100,
    CB: 193,
    DM: 156,
    LM: 195,
  },
  {
    player: "Odegaard",
    AM: 110,
    CM: 103,
    LB: 100,
    CB: 193,
    DM: 156,
    LM: 195,
  },
  {
    player: "Jorginho",
    AM: 165,
    CM: 103,
    LB: 100,
    CB: 193,
    DM: 156,
    LM: 195,
  },
];
