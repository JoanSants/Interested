import React, { Component } from 'react';
import FormAddInterest from '../../organisms/Forms/AddInterest';

import styles from './styles.module.css';

class TemplateAddInterest extends Component {

    render() {
        return (
            <div className={styles.Container}>
                <FormAddInterest/>
            </div>
        );
    }
}

export default TemplateAddInterest;