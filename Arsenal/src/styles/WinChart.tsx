import {ResponsiveBar} from "@nivo/bar";
import {useState} from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const WinChart = ({
  data,
  type,
  selectedSeason,
  setSelectedSeason,
}: {
  data: any;
  type: "grouped" | "stacked";
  selectedSeason: string;
  setSelectedSeason: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [isSelected, setIsSelected] = useState<string | number | null>(null);
  const colorScheme = ["#448CCB", "#959EA2", "#F15B5B"];
  const selectedColorScheme = ["#3964E5", "#616264", "red"];
  const nonSeletedcolorScheme = ["skyblue", "#A4AAA7", "pink"];
  const getColor = (bar: any) => {
    let temp: number = 0;
    if (bar.id === "W") {
      temp = 0;
    } else if (bar.id === "D") {
      temp = 1;
    } else {
      temp = 2;
    }
    if (isSelected === null) {
      return colorScheme[temp];
    }
    if (bar.data.season === selectedSeason) {
      return selectedColorScheme[temp];
    } else {
      return nonSeletedcolorScheme[temp];
    }
  };
  return (
    <ResponsiveBar
      data={data}
      keys={["W", "D", "L"]}
      onClick={(d) => {
        setSelectedSeason(d.data.season);
        setIsSelected((prev) =>
          prev === d.data.season ? null : d.data.season
        );
      }}
      indexBy="season"
      margin={{top: 50, right: 130, bottom: 50, left: 60}}
      padding={0.3}
      groupMode={type}
      valueScale={{type: "linear"}}
      indexScale={{type: "band", round: true}}
      colors={getColor}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "season",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "win/lose",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};
