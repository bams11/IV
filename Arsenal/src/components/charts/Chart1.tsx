import React from "react";
import HeatMap from "../../styles/HeatMap";
import {testData} from "../../data";

const Chart1 = ({data}: any) => {
  return (
    <div style={{flex: 1, width: "100%", height: "50vh", display: "flex"}}>
      <HeatMap data={data} />
    </div>
  );
};

export default Chart1;
