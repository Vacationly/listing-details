import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Section/Section';

import styles from '../Section/Section.css';

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
        <div className={styles.content}>
          {main}
        </div>
        <div className={!expanded && styles.hidden}>
          {more.map(info => (
            <Section
              title={info.title}
              content={(
                <div>
                  {info.value}
                </div>
)}
            />
          ))}
        </div>
        <div
          className={styles.link}
          onClick={this.toggleMoreInfo}
          onKeyUp={this.toggleMoreInfo}
          tabIndex="0"
          role="link"
        >
          {expanded ? 'Hide ↑' : 'Read more about the space ↓'}
        </div>
      </div>
    );
  }
}

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
