import React from 'react';
import PropTypes from 'prop-types';

const ActivityList = ({ activities }) => {
  return (
    <div>
      {activities.map((activity) => (
        <div key={activity.id}>
          <h4>{activity.date}</h4>
          <p>{activity.description}</p>
        </div>
      ))}
    </div>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ActivityList;
