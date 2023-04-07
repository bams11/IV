import React from "react";
import {keyPlayer, testData3} from "../../data";
import Radar from "../../styles/Radar";
import playerData from "../../assets/players.json";

const Chart3 = () => {
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
  return (
    <div style={{flex: 1, width: "100%", height: "50vh", display: "flex"}}>
      <Radar data={result} />
    </div>
  );
};

export default Chart3;
