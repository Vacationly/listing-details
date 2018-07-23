import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../Utilities/Section/Section';
import Modal from '../../Utilities/Modal/Modal';

import styles from './CancellationPolicy.css';

export default class CancellationPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      modalVisible: false,
    };
  }

  toggleModal() {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible }));
  }

  render() {
    const { cancellationPolicy } = this.props;
    const { modalVisible } = this.state;
    const cancellationPolicyOverview = <CancellationPolicyOverview {...this.props} />;
    const cancellationPolicyDetails = <CancellationPolicyDetails {...this.props} />;
    return (
      <div>
        {cancellationPolicy.name && (
          <Section
            title="Cancellation policy"
            content={cancellationPolicyOverview}
            link={cancellationPolicy.description ? 'Show more' : null}
            action={this.toggleModal}
          />
        )}
        {modalVisible && (
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

CancellationPolicy.propTypes = {
  cancellationPolicy: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const CancellationPolicyOverview = (props) => {
  const { cancellationPolicy } = props;
  return (
    <div>
      <div className={styles.cancellationPolicyName}>
        {cancellationPolicy.name}
      </div>
      <div className={styles.cancellatinPolicyOverview}>
        {cancellationPolicy.overview}
      </div>
    </div>
  );
};

CancellationPolicyOverview.propTypes = {
  cancellationPolicy: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const CancellationPolicyDetails = (props) => {
  const { cancellationPolicy } = props;
  return (
    <div>
      <div className={styles.cancellationPolicyName}>
        {cancellationPolicy.name}
      </div>
      <div className={styles.cancellationPolicyDescription}>
        {cancellationPolicy.description}
      </div>
    </div>
  );
};

CancellationPolicyDetails.propTypes = {
  cancellationPolicy: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
