import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.css';

const Modal = (props) => {
  const { title, content, dismiss } = props;
  const handleDismiss = (e) => {
    if (e.target.className === styles.background || e.target.className === styles.dismiss) {
      e.stopPropagation();
      dismiss();
    }
  };
  return (
    <div>
      <div
        className={styles.background}
        onClick={handleDismiss}
        onKeyUp={handleDismiss}
        tabIndex="0"
        role="menuitem"
      >
        <div className={styles.frame}>
          <div
            className={styles.dismiss}
            onClick={handleDismiss}
            onKeyUp={handleDismiss}
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
  title: PropTypes.string.isRequired,
  dismiss: PropTypes.func.isRequired,
  content: PropTypes.element.isRequired,
};

module.exports = Modal;
