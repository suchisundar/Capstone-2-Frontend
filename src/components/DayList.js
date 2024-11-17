import React from "react";
import PropTypes from "prop-types"; 
import DayCard from "./DayCard";
import Row from "react-bootstrap/Row";

const DayList = ({ weatherData, unit, formatDateTime, onDayClick, selectedDay }) => {
  const handleDayCardClick = (dayIndex) => {
    onDayClick(dayIndex);
  };

  if (!weatherData?.days || weatherData.days.length === 0) {
    return <p>No weather data available.</p>;
  }

  return (
    <div className="pb-5">
      <Row className="flex-nowrap overflow-auto py-4 my-5 mx-3">
        {weatherData.days.map((day, index) => {
          const date = formatDateTime
            ? formatDateTime(weatherData.days[0]?.hours?.[0]?.datetime, day.datetime)[1]
            : day.datetime;

          return (
            <DayCard
              key={day.datetime}
              icon={day.icon}
              conditions={day.conditions}
              tempMax={`${Math.round(day.tempmax)}${unit === "us" ? "\xB0F" : "\xB0C"}`}
              tempMin={`${Math.round(day.tempmin)}${unit === "us" ? "\xB0F" : "\xB0C"}`}
              precip={day.precipprob}
              date={date}
              onClick={() => handleDayCardClick(index)}
              isSelected={selectedDay === index}
            />
          );
        })}
      </Row>
    </div>
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
        conditions: PropTypes.string,
        icon: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  unit: PropTypes.string.isRequired,
  formatDateTime: PropTypes.func,
  onDayClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.number,
};

export default DayList;
