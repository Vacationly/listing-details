import React from 'react';

require('./ListingDescriptions.scss');

export default class ListingDescriptions extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.state = {
      expanded: false,
    };
  }

  toggleMoreInfo() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { main, more } = this.props.descriptions;
    const { expanded } = this.state;
    return (
      <div>
        <ListingDescription value={main} />
        <div className={`moreInfo ${expanded ? '' : 'hidden'}`}>
          {more.map(info => <ListingDescription title={info.title} value={info.value} />)}
        </div>
        <div className="expandHide" onClick={this.toggleMoreInfo}>
          {expanded ? 'Hide ↑' : 'Read more about the space ↓'}
        </div>
      </div>
    );
  }
}

const ListingDescription = (props) => {
  const { title, value } = props;
  return (
    <div className="description">
      {title ? (
        <div className="title">
          {title}
        </div>
      ) : ''}
      <div className="value">
        {value}
      </div>
    </div>
  );
};
