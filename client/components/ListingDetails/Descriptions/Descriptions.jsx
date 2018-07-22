import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../Utilities/Section/Section';
import { functions } from '../../utils';

import styles from './Descriptions.css';

const { expandCollapse } = functions;

export default class Descriptions extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.state = {
      expanded: false,
    };
  }

  toggleMoreInfo() {
    this.setState(
      prevState => ({ expanded: !prevState.expanded }),
      () => expandCollapse(styles.moreWrapper, styles.moreContent, this.state.expanded),
    );
  }

  render() {
    const { main, more } = this.props.descriptions;
    const { expanded } = this.state;
    const content = (
      <div>
        <div>
          {main}
        </div>
        <div className={styles.moreWrapper}>
          <div className={styles.moreContent}>
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
      </div>
    );
    return (
      <div>
        <Section
          content={content}
          link={expanded ? 'Hide' : 'Read more about the space'}
          action={this.toggleMoreInfo}
          expandable
          expanded={expanded}
        />
        <hr />
      </div>
    );
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
