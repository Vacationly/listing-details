import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../Utilities/Section/Section';

import styles from '../../Utilities/Section/Section.css';

export default class Descriptions extends React.Component {
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
    const content = (
      <div>
        <div className={styles.content}>
          {main}
        </div>
        <div className={expanded && styles.hidden}>
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
      </div>
    );
    return <Section content={content} link={expanded ? 'Hide ↑' : 'Read more about the space ↓'} />;
  }
}

Descriptions.propTypes = {
  descriptions: PropTypes.shape({
    main: PropTypes.string.isRequired,
    more: PropTypes.array.isRequired,
  }),
};

Descriptions.defaultProps = {
  descriptions: {
    main: 'placeholder',
    more: [],
  },
};
