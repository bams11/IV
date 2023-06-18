import React, {useState} from "react";
import {SquareView} from "./theme";

export const Square = ({style, data, onClick}: any) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <SquareView
      style={{
        position: "relative",
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {isTooltipVisible && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            top: "-300%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "2px",
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* tooltip 내용 */}
          <div style={{display: "flex", flexDirection: "row"}}>
            opponent:
            <div style={{fontWeight: "bold"}}>{data.opponent}</div>
          </div>
          <div style={{display: "flex", flexDirection: "row"}}>
            date:
            <div style={{fontWeight: "bold"}}>
              {data.DateTime.substring(0, 10)}
            </div>
          </div>
        </div>
      )}
    </SquareView>
  );
};
