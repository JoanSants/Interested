import React from 'react';
import InputPassword from '../../../atoms/Inputs/InputPassword';
import styles from '../styles.module.css';


const password = ({label, validationMessage, touched, valid, ...others}) => {

  const errorMessage = ( !valid ) ? <span className={styles.ErrorMessage}>{validationMessage}</span> : null;

  return (
    <div className={styles.Fields}>
      <InputPassword type="password" {...others} />
      {errorMessage}
    </div>
  );
}

export default password;