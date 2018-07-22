import React from 'react';
import PropTypes from 'prop-types';

import styles from './Highlights.css';

export default class Highlights extends React.Component {
  constructor(props) {
    super(props);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.state = {
      feedback: [],
    };
  }

  handleFeedback(index, value) {
    const { feedback } = this.state;
    feedback[index] = value;
    this.props.saveFeedback(index, value);
    this.setState({ feedback }, () => {
      this.props.saveFeedback(index, value);
    });
  }

  render() {
    const { highlights } = this.props;
    const { feedback } = this.state;
    return (
      <div className={styles.highlights}>
        <div className={styles.heading}>
home highlights
        </div>
        {highlights.map(highlight => (
          <div className={styles.highlight}>
            <div className={styles.details}>
              <span className={styles.tagline}>
                {highlight.tagline}
              </span>
              {' '}
·
              {' '}
              <span className={styles.description}>
                {highlight.description}
              </span>
            </div>
            <div className={styles.feedback}>
              {feedback[highlight.id] ? (
                <span className={styles.thankYou}>
Thank you for your feedback.
                </span>
              ) : (
                <span>
                  <span
                    className={styles.upvote}
                    onClick={() => this.handleFeedback(highlight.id, 1)}
                    onKeyUp={() => this.handleFeedback(highlight.id, 1)}
                    tabIndex="0"
                    role="link"
                  >
                    Helpful
                    {' '}
                    <span className="thumbsUp" />
                  </span>
                  {' '}
                  ·
                  {' '}
                  <span
                    className={styles.downvote}
                    onClick={() => this.handleFeedback(highlight.id, -1)}
                    onKeyUp={() => this.handleFeedback(highlight.id, -1)}
                    tabIndex="0"
                    role="link"
                  >
                    Not helpful
                  </span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Highlights.propTypes = {
  highlights: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tagline: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      upvotes: PropTypes.number.isRequired,
      downvotes: PropTypes.number.isRequired,
    }),
  ).isRequired,
  saveFeedback: PropTypes.func.isRequired,
};
