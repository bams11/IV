import React, {useState} from "react";
import {convertSeasonFormat} from "../../utils";

interface SeasonRadioProps {
  seasons: string[];
  selectedSeason: string;
  onSelectSeason: (selectedSeason: string) => void;
}

const SeasonRadio: React.FC<SeasonRadioProps> = ({
  seasons,
  selectedSeason,
  onSelectSeason,
}) => {
  const handleSeasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelectSeason(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "center",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <label>Select Season:</label>
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
