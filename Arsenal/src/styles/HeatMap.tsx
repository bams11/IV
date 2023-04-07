import {ResponsiveHeatMap} from "@nivo/heatmap";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const HeatMap = ({data}: any) => (
  <ResponsiveHeatMap
    data={data}
    margin={{top: 60, right: 90, bottom: 60, left: 90}}
    valueFormat=">-.2s"
    xInnerPadding={0.1}
    yInnerPadding={0.1}
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: "middle",
      legend: "Position",
      legendOffset: -46,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Years",
      legendPosition: "middle",
      legendOffset: -72,
    }}
    colors={{
      type: "diverging",
      scheme: "red_yellow_blue",
      minValue: 0,
      maxValue: 10,
      divergeAt: 0.5,
    }}
    emptyColor="#555555"
    borderRadius={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.8]],
    }}
    legends={[
      {
        anchor: "bottom",
        translateX: 0,
        translateY: 30,
        length: 400,
        thickness: 6,
        direction: "row",
        tickPosition: "after",
        tickSize: 3,
        tickSpacing: 4,
        tickOverlap: false,
        tickFormat: " >-.2s",
        title: "Value →",
        titleAlign: "start",
        titleOffset: 4,
      },
    ]}
  />
);

export default HeatMap;
