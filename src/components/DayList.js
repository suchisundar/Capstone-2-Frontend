import React from "react";
import PropTypes from "prop-types";
import DayCard from "./DayCard";
import Row from "react-bootstrap/Row";

const DayList = ({ weatherData, unit, onDayClick }) => {
  const handleDayClick = (index) => {
    onDayClick && onDayClick(index);
  };

  return (
    <Row className="flex-nowrap overflow-auto py-4">
      {weatherData.days.map((day, index) => (
        <DayCard
          key={day.datetime}
          date={day.datetime}
          tempMax={`${day.tempmax}°${unit === "us" ? "F" : "C"}`}
          tempMin={`${day.tempmin}°${unit === "us" ? "F" : "C"}`}
          precip={day.precipprob}
          onClick={() => handleDayClick(index)}
        />
      ))}
    </Row>
  );
};

DayList.propTypes = {
  weatherData: PropTypes.shape({
    days: PropTypes.arrayOf(
      PropTypes.shape({
        datetime: PropTypes.string.isRequired,
        tempmax: PropTypes.number.isRequired,
        tempmin: PropTypes.number.isRequired,
        precipprob: PropTypes.number,
      })
    ),
  }).isRequired,
  unit: PropTypes.string.isRequired,
  onDayClick: PropTypes.func,
};

export default DayList;
