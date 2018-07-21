import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../Utilities/Section/Section';
import Modal from '../../Utilities/Modal/Modal';

import styles from './CancellationPolicy.css';

export default class CancellationType extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      showModal: false,
    };
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { cancellationPolicy } = this.props;
    const { showModal } = this.state;
    const cancellationPolicyName = (
      <div className={styles.cancellationPolicyName}>
        {cancellationPolicy.name}
      </div>
    );
    const cancellationPolicyDetails = (
      <div>
        {cancellationPolicyName}
        <div className={styles.cancellationPolicyDescription}>
          {cancellationPolicy.description}
        </div>
      </div>
    );
    const link = 'See more';
    const action = this.toggleModal;
    return (
      <div>
        <Section
          title="Cancellation policy"
          content={cancellationPolicyName}
          link={link}
          action={action}
        />
        {showModal && (
          <Modal
            title="Cancellation policy"
            content={cancellationPolicyDetails}
            dismiss={this.toggleModal}
          />
        )}
      </div>
    );
  }
}

CancellationType.propTypes = {
  cancellationPolicy: PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};
