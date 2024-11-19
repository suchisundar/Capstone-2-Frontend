// src/components/DayList.js
import React from 'react';
import PropTypes from 'prop-types';
import DayCard from './DayCard';

const DayList = ({ weatherData, activities, tripId, unit, onActivityAdded }) => {
  return (
    <div>
      {weatherData.days.map((day, index) => {
        const dayActivities = activities.filter(
          (activity) => activity.date === day.datetime
        );

        return (
          <DayCard
            key={day.datetime || index}
            day={day}
            activities={dayActivities}
            tripId={tripId}
            unit={unit}
            onActivityAdded={onActivityAdded}
          />
        );
      })}
    </div>
  );
};

DayList.propTypes = {
  weatherData: PropTypes.shape({
    days: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  activities: PropTypes.array.isRequired,
  tripId: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  onActivityAdded: PropTypes.func.isRequired,
};

export default DayList;
