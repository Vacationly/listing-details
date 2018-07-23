import React from 'react';
import PropTypes from 'prop-types';

import { constants, functions } from '../../utils';
import styles from './Highlights.css';

const thumbsUpEmpty = `${constants.imagesEndpoint}/thumbs_up_empty.png`;
const thumbsUpFull = `${constants.imagesEndpoint}/thumbs_up_full.png`;
const { processKeyUp } = functions;

export default class Highlights extends React.Component {
  constructor(props) {
    super(props);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.state = {
      feedbackStatus: [],
    };
  }

  handleFeedback(index, value) {
    const { feedbackStatus } = this.state;
    feedbackStatus[index] = value;
    this.setState({ feedbackStatus }, () => {
      this.props.saveFeedback(index, value);
    });
  }

  render() {
    const { highlights } = this.props;
    const { feedbackStatus } = this.state;
    if (!highlights.length) {
      return <div />;
    }
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
            <HighlightFeedback
              id={highlight.id}
              feedbackStatus={feedbackStatus}
              handleFeedback={this.handleFeedback}
            />
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
    }),
  ).isRequired,
  saveFeedback: PropTypes.func.isRequired,
};

const HighlightFeedback = (props) => {
  const { id, feedbackStatus, handleFeedback } = props;
  const handleUpvoteHover = (e) => {
    const target = e.target.children[0] || e.target;
    const oldSource = target.src;
    target.src = oldSource === thumbsUpEmpty ? thumbsUpFull : thumbsUpEmpty;
  };
  return (
    <div className={styles.feedback}>
      {feedbackStatus[id] ? (
        <span>
Thank you for your feedback.
        </span>
      ) : (
        <span>
          <span
            id="upvote"
            className={styles.upvote}
            onMouseEnter={handleUpvoteHover}
            onMouseLeave={handleUpvoteHover}
            onClick={() => handleFeedback(id, 1)}
            onKeyUp={e => processKeyUp(e, () => handleFeedback(id, 1))}
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
            id="downvote"
            className={styles.downvote}
            onClick={() => handleFeedback(id, -1)}
            onKeyUp={e => processKeyUp(e, () => handleFeedback(id, -1))}
            tabIndex="0"
            role="link"
          >
            Not helpful
          </span>
        </span>
      )}
    </div>
  );
};

HighlightFeedback.propTypes = {
  id: PropTypes.number.isRequired,
  feedbackStatus: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleFeedback: PropTypes.func.isRequired,
};
