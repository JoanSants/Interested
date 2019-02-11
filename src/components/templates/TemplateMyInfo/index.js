import React, { Component } from 'react';
import EditUserForm from '../../organisms/Forms/EditUser';
import styles from './styles.module.css';

class MyInfo extends Component {
  render() {
    return (
      <div className={styles.Container}>
        <EditUserForm/>
      </div>
    );
  }
}

export default MyInfo;