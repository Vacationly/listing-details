import React from 'react';
import PropTypes from 'prop-types';

import styles from './ListingDescriptions.css';

export default class ListingDescriptions extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.state = {
      expanded: false,
    };
  }

  toggleMoreInfo() {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  render() {
    const { main, more } = this.props.descriptions;
    const { expanded } = this.state;
    return (
      <div>
        <ListingDescription value={main} />
        <div className={`${styles.moreInfo} ${expanded && styles.hidden}`}>
          {more.map(info => <ListingDescription title={info.title} value={info.value} />)}
        </div>
        <div
          className={styles.expandHide}
          onClick={this.toggleMoreInfo}
          onKeyDown={this.toggleMoreInfo}
          tabIndex="0"
          role="link"
        >
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

ListingDescriptions.propTypes = {
  descriptions: PropTypes.shape({
    main: PropTypes.string.isRequired,
    more: PropTypes.array.isRequired,
  }),
};

ListingDescriptions.defaultProps = {
  descriptions: {
    main: 'placeholder',
    more: [],
  },
};

ListingDescription.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string.isRequired,
};

ListingDescription.defaultProps = {
  title: null,
};
