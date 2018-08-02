import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Utilities/Section/Section';
import Modal from '../Utilities/Modal/Modal';

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
    const { name, overview, description } = cancellationPolicy;
    const { modalVisible } = this.state;
    const cancellationPolicyOverview = (
      <CancellationPolicyDetails name={name} overview={overview} />
    );
    const cancellationPolicyDetails = (
      <CancellationPolicyDetails name={name} description={description} />
    );
    return (
      <div>
        {cancellationPolicy.name && (
          <Section
            title="Cancellation policy"
            link={cancellationPolicy.description ? 'Show more' : null}
            action={this.toggleModal}
          >
            {cancellationPolicyOverview}
          </Section>
        )}
        {modalVisible && (
          <Modal title="Cancellation policy" dismiss={this.toggleModal}>
            {cancellationPolicyDetails}
          </Modal>
        )}
      </div>
    );
  }
}

CancellationPolicy.propTypes = {
  cancellationPolicy: PropTypes.shape({
    name: PropTypes.string,
    overview: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

const CancellationPolicyDetails = (props) => {
  const { name, overview, description } = props;
  return (
    <div>
      <div className={styles.cancellationPolicyName}>
        {name}
      </div>
      {overview && (
      <div className={styles.cancellationPolicyOverview}>
        {overview}
      </div>
      )}
      {description && (
      <div className={styles.cancellationPolicyDescription}>
        {description}
      </div>
      )}
    </div>
  );
};

CancellationPolicyDetails.propTypes = {
  name: PropTypes.string.isRequired,
  overview: PropTypes.string,
  description: PropTypes.string,
};

CancellationPolicyDetails.defaultProps = {
  overview: null,
  description: null,
};
