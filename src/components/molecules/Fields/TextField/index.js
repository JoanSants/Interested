import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../../../atoms/Inputs/InputText';
import styles from '../styles.module.css';

const text = ({label, validationMessage, touched, valid, ...others}) => {

  const errorMessage = ( !valid ) ? <span className={styles.ErrorMessage}>{validationMessage}</span> : null;

  return (
    <div className={styles.Fields}>
      <InputText {...others} />
      {errorMessage}
    </div>
  );
}

text.propTypes = {
  label: PropTypes.string,
  validationMessage: PropTypes.string,
  touched: PropTypes.bool,
  valid: PropTypes.bool
}

export default text;