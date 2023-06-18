import React from "react";
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
      {seasons.map((season) => (
        <label
          key={season}
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          <input
            type="radio"
            name="season"
            value={season}
            checked={season === selectedSeason}
            onChange={handleSeasonChange}
            style={{marginRight: "5px"}}
          />
          <span style={{fontSize: "14px", color: "#333"}}>
            {convertSeasonFormat(season)}
          </span>
        </label>
      ))}
    </div>
  );
};

export default SeasonRadio;
