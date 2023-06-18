import {ResponsiveBar} from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarChart = ({
  data,
  index,
  keys,
}: {
  data: any;
  index: string;
  keys: string[];
}) => {
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={index}
      margin={{top: 60, right: 20, bottom: 30, left: 40}}
      padding={0.3}
      valueScale={{type: "linear"}}
      indexScale={{type: "band", round: true}}
      axisLeft={{
        tickValues: 3,
      }}
      enableGridY={false}
      colors={{scheme: "nivo"}}
      defs={[]}
      fill={[]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "top",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: -30,
          itemWidth: 20,
          itemHeight: 20,
          itemsSpacing: 30,
          symbolSize: 10,
          itemDirection: "left-to-right",
        },
      ]}
      role="application"
    />
  );
};

export default BarChart;
