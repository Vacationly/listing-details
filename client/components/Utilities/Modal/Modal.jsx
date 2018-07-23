import React from 'react';
import PropTypes from 'prop-types';
import { functions } from '../../utils';

import styles from './Modal.css';

const { processKeyUp } = functions;

const Modal = (props) => {
  const { title, content, dismiss } = props;
  const handleDismiss = (e) => {
    if (e.target.className === styles.backdrop || e.target.className === styles.dismiss) {
      e.stopPropagation();
      window.document.body.style.overflow = 'visible';
      dismiss();
    }
  };
  window.document.body.style.overflow = 'hidden';
  return (
    <div>
      <div
        id="backdrop"
        className={styles.backdrop}
        onClick={handleDismiss}
        onKeyUp={e => processKeyUp(e, handleDismiss)}
        tabIndex="0"
        role="menuitem"
      >
        <div id="frame" className={styles.frame}>
          <div
            id="dismiss"
            className={styles.dismiss}
            onClick={handleDismiss}
            onKeyUp={e => processKeyUp(e, handleDismiss)}
            tabIndex="0"
            role="button"
          >
            &times;
          </div>
          <div id="title" className={styles.title}>
            {title}
          </div>
          <div id="content" className={styles.content}>
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
