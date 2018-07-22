import React from 'react';
import PropTypes from 'prop-types';

import { baseUrl } from '../../../utils';
import styles from './Highlights.css';

const thumbsUpEmpty = `${baseUrl}/thumbs_up_empty.png`;
const thumbsUpFull = `${baseUrl}/thumbs_up_full.png`;

const handleUpvoteHover = (e) => {
  const target = e.target.children[0] || e.target;
  const oldSource = target.src;
  target.src = oldSource === thumbsUpEmpty ? thumbsUpFull : thumbsUpEmpty;
};

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
                <span>
Thank you for your feedback.
                </span>
              ) : (
                <span>
                  <span
                    className={styles.upvote}
                    onMouseEnter={handleUpvoteHover}
                    onMouseLeave={handleUpvoteHover}
                    onClick={() => this.handleFeedback(highlight.id, 1)}
                    onKeyUp={() => this.handleFeedback(highlight.id, 1)}
                    tabIndex="0"
                    role="link"
                  >
                    Helpful
                    {' '}
                    <img className={styles.thumbsUp} src={thumbsUpEmpty} alt="thumbs up" />
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
