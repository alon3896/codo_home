import React, { useState } from "react";
const Dot = ({ x, y, id, isClicked, onClick, isOpen, scale }) => {
  const [isHovered, setIsHovered] = useState(false);

  const dotStyle = {
    background:
      isOpen && isClicked
        ? "linear-gradient(180deg, rgb(255, 172, 6) 0%, rgb(255, 213, 78) 100%)"
        : !isOpen
        ? "#1F183E"
        : isOpen && !isClicked
        ? "#1F183E"
        : isClicked
        ? "#1F183E"
        : "#D9D9D9",
    borderRadius: "60%",
    height: isClicked && isOpen ? `${134 * scale}px` : `${78 * scale}px`,
    width: isClicked && isOpen ? `${134 * scale}px` : `${78 * scale}px`,
    position: "absolute",
    left: isClicked && isOpen ? `${x - 34}px` : `${x}px`,
    top: isClicked && isOpen ? `${y - 34}px` : `${y}px`,
    cursor: isOpen ? "pointer" : "default",
    opacity: isOpen ? 1 : 0.4,
  };
  const tooltipStyle = {
    top: "-78px", // Adjust position above the dot
    textAlign: "right",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    color: "black",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "24px",
    visibility: isHovered ? "visible" : "hidden",
    whiteSpace: "nowrap",
  };

  return (
    <div
      style={dotStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={tooltipStyle}>{id}</div>
    </div>
  );
};

export default Dot;
