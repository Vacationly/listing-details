import React from 'react';

require('./ListingSummary.scss');

export default class ListingDescriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  toggleMoreInfo() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { descriptions } = this.props;
    const { expanded } = this.state;
    <ListingDescription description={descriptions[0]} showName={false} />
    <div className="moreInfo">

    </div>
    <div className="expandHide">{expanded ? "Hide" : "Read more about the space"}</div>
  }

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
