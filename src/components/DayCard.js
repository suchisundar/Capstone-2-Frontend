// src/components/DayCard.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Api from '../api/api';
import icons from '../icons/icons';
import { format } from 'date-fns';

const DayCard = ({ day, activities, tripId, unit, onActivityAdded }) => {
  const [activityDescription, setActivityDescription] = useState('');

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!activityDescription.trim()) return;

    try {
      const newActivity = await Api.addActivityToTrip(tripId, {
        date: day.datetime,
        description: activityDescription,
        source: 'user',
      });
      setActivityDescription('');
      onActivityAdded(newActivity);
    } catch (err) {
      console.error('Failed to add activity', err);
    }
  };

  // Get the icon from the icons object
  const iconSrc = icons[day.icon] || icons['default-icon'];

  return (
    <div>
      <h3>{format(new Date(day.datetime), 'MM-dd-yyyy')}</h3>
      <p>{day.description}</p>
      <p>
        High: {day.temperatureMax}°{unit} | Low: {day.temperatureMin}°{unit}
      </p>
      <img src={iconSrc} alt={day.description} />
      <div>
        <h4>Activities for this day:</h4>
        {activities.length > 0 ? (
          <ul>
            {activities.map((activity) => (
              <li key={activity.id}>{activity.description}</li>
            ))}
          </ul>
        ) : (
          <p>No activities for this day.</p>
        )}
        <form onSubmit={handleAddActivity}>
          <input
            type="text"
            placeholder="Add activity"
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

DayCard.propTypes = {
  day: PropTypes.shape({
    datetime: PropTypes.string.isRequired,
    temperatureMax: PropTypes.number.isRequired,
    temperatureMin: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  activities: PropTypes.array.isRequired,
  tripId: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  onActivityAdded: PropTypes.func.isRequired,
};

export default DayCard;
