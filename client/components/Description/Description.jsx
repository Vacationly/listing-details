import React from 'react';
import PropTypes from 'prop-types';
import Expandable from '../Utilities/Expandable/Expandable';

import styles from './Description.css';

export default class Description extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    this.state = {
      expanded: false
    };
  }

  toggleMoreInfo(callback) {
    this.setState(prevState => ({ expanded: !prevState.expanded }), callback);
  }

  render() {
    const { description, additionalDescription } = this.props;
    const { expanded } = this.state;
    const mainContent = <DescriptionMain description={description} />;
    const moreContent = (
      <DescriptionMore additionalDescription={additionalDescription} />
    );
    const link = expanded ? 'Hide' : 'Read more about the space';
    return (
      <Expandable
        id="description"
        main={mainContent}
        more={moreContent}
        link={additionalDescription.length ? link : null}
        toggle={this.toggleMoreInfo}
        expandable
        expanded={expanded}
      />
    );
  }
}

// Description.propTypes = {
//   description: PropTypes.shape({
//     main: PropTypes.string,
//     more: PropTypes.array,
//   }).isRequired,
// };

const DescriptionMain = props => {
  const { main } = props;
  return <div>{main}</div>;
};

DescriptionMain.propTypes = {
  description: PropTypes.string.isRequired
};

const DescriptionMore = props => {
  const { additionalDescription } = props;
  return (
    <div>
      {
        additionalDescription /* &&
        additionalDescription.map(info => (
          <div key={`description_${info.title}`} className={styles.subsection}>
            <div className={styles.subtitle}>{info.title}</div>
            <div className={styles.content}>{info.text}</div>
          </div>
        ))*/
      }
    </div>
  );
};

DescriptionMore.propTypes = {
  additionalDescription: PropTypes.string.isRequired
};
