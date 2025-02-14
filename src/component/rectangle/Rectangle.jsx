import React from "react";

const Rectangle = ({ startX, startY, endX, endY }) => {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const offset = 60;
  return (
    <div
      className="rectangle"
      style={{
        position: "absolute",
        left: `${startX}px`,
        top: `${startY}px`,
        width: `${length + offset}px`,
        height: `78px`,
        transformOrigin: "37px 37px",
        transform: `rotate(${angle}deg)`,
        backgroundColor: "#D9D9D9",
        borderRadius: "60px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    ></div>
  );
};

export default Rectangle;
