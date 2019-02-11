import React from 'react';
import PropTypes from 'prop-types';
import InputEmail from '../../../atoms/Inputs/InputEmail';
import styles from '../styles.module.css';

const Email = ({label, validationMessage, touched, valid, ...others}) => {

  const errorMessage = ( !valid ) ? <span className={styles.ErrorMessage}>{validationMessage}</span> : null;

  return (
    <div className={styles.Fields}>
      <InputEmail {...others} />
      {errorMessage}
    </div>
  );
}

Email.propTypes = {
  label: PropTypes.string,
  validationMessage: PropTypes.string,
  touched: PropTypes.bool,
  valid: PropTypes.bool
}

export default Email;