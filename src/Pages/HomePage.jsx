import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./HomePage.css";
import Rectangle from "../component/rectangle/Rectangle";
import Dot from "../component/dot/Dot";
import { getUsers, getHome } from "../lib/api_handler";
import { calculateNextNodePos } from "../lib/home_helpers";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [homeData, setHomeData] = useState(null);
  const [clickedDots, setClickedDots] = useState(() => {
    // Load clicked dots from local storage on initial render
    const storedClickedDots = localStorage.getItem("clickedDots");
    return storedClickedDots ? JSON.parse(storedClickedDots) : [];
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        console.log("Fetched users:", users); // Debugging log
        const userOptions = users.map((user) => ({
          value: user.id,
          label: user.name,
        }));
        setOptions(userOptions);
        console.log("User options:", userOptions); // Debugging log
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Save clicked dots to local storage whenever clickedDots changes
    localStorage.setItem("clickedDots", JSON.stringify(clickedDots));
  }, [clickedDots]);

  const handleChange = async (selectedOption) => {
    setSelectedOption(selectedOption);
    try {
      const homeData = await getHome(selectedOption.value);
      setHomeData(homeData);
      console.log("Fetched home data:", homeData); // Debugging log
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  const calculatePositions = (data) => {
    let positions = [{ x: 173, y: 621.59 }];
    let lastPos = { x: 173, y: 621.59 };

    for (let i = 1; i < data.length; i++) {
      const nextPos = calculateNextNodePos(data[i].id, lastPos);
      positions.push(nextPos);
      lastPos = nextPos;
    }

    return positions;
  };

  const handleDotClick = (id) => {
    setClickedDots((prevClickedDots) => {
      if (prevClickedDots.includes(id)) {
        // If dot is already clicked, remove it from the array
        return prevClickedDots.filter((dotId) => dotId !== id);
      } else {
        // If dot is not clicked, add it to the array
        return [...prevClickedDots, id];
      }
    });
  };

  const positions = homeData ? calculatePositions(homeData) : [];

  return (
    <div className="page">
      <div className="header">
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder="Select a user..."
        />
      </div>

      {positions.map((pos, index) => (
        <React.Fragment key={index}>
          {index < positions.length - 1 && (
            <Rectangle
              startX={pos.x}
              startY={pos.y}
              endX={positions[index + 1].x}
              endY={positions[index + 1].y}
            />
          )}
          <Dot
            x={pos.x}
            y={pos.y}
            id={index} // Use index as a unique identifier
            isClicked={clickedDots.includes(index)}
            onClick={() => handleDotClick(index)}
            isOpen={homeData && homeData[index].isOpen}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default HomePage;
