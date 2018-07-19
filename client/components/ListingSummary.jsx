import React from 'react';
import './ListingSummary.scss';

export default (props) => {
  const {
    title, listingType, location, capacity, host,
  } = props;
  return (
    <div className="listingSummary">
      <div className="listingType">
        {listingType.value.toLowerCase()}
      </div>
      <div className="headline">
        <div>
          <div className="title">
            {title}
          </div>
          <div className="city">
            {location.city}
          </div>
        </div>
        <div className="host">
          <img src={host.avatar} className="avatar" />
          <span>
            {host.name}
          </span>
        </div>
      </div>
      <div className="capacity">
        {capacity.map(field => (
          <span>
            {field.name}
            :
            {field.value}
          </span>
        ))}
      </div>
    </div>
  );
};
