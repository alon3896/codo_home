import React from "react";

const Dot = ({ x, y, id, isClicked, onClick, isOpen }) => {
  const dotStyle = {
    background:
      isOpen && isClicked
        ? "linear-gradient(180deg, rgb(255, 172, 6) 0%, rgb(255, 213, 78) 100%)"
        : !isOpen
        ? "lightblue"
        : isOpen && !isClicked
        ? "#1F183E"
        : isClicked
        ? "#1F183E"
        : "#D9D9D9",
    borderRadius: "60%",
    height: isClicked && isOpen ? "134px" : "78px",
    width: isClicked && isOpen ? "134px" : "78px",
    position: "absolute",
    left: isClicked && isOpen ? `${x - 34}px` : `${x}px`,
    top: isClicked && isOpen ? `${y - 34}px` : `${y}px`,
  };

  return <div className="dot" style={dotStyle} onClick={onClick}></div>;
};

export default Dot;
