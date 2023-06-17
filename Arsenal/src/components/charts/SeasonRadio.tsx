import React, {useState} from "react";
import {convertSeasonFormat} from "../../utils";

interface SeasonRadioProps {
  seasons: string[];
  onSelectSeason: (selectedSeason: string) => void;
}

const SeasonRadio: React.FC<SeasonRadioProps> = ({seasons, onSelectSeason}) => {
  const [selectedSeason, setSelectedSeason] = useState("2017-18");

  const handleSeasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSeason(event.target.value);
    onSelectSeason(event.target.value);
  };

  return (
    <div style={{display: "flex", flexWrap: "wrap", width: "20%"}}>
      <label>시즌 선택:</label>
      {seasons.map((season) => (
        <label key={season}>
          <input
            type="radio"
            name="season"
            value={season}
            checked={season === selectedSeason}
            onChange={handleSeasonChange}
          />
          {convertSeasonFormat(season)}
        </label>
      ))}
    </div>
  );
};

export default SeasonRadio;
