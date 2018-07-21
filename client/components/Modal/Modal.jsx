import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.css';

const Modal = (props) => {
  const {
    show, title, content, dismiss,
  } = props;
  return (
    <div>
      <div className={`${styles.background} ${show && styles.show}`}>
        <div className={styles.frame}>
          <div
            className={styles.dismiss}
            onClick={dismiss}
            onKeyUp={dismiss}
            tabIndex="0"
            role="button"
          >
            &times;
          </div>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.content}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  dismiss: PropTypes.func.isRequired,
  content: PropTypes.element,
};

Modal.defaultProps = {
  content: null,
};

module.exports = Modal;
