import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import styles from './index.module.css';
import Button from '../../atoms/Buttons/Button';

class Interest extends Component {

    render() {
        return (
            <Fragment>
                <div className={styles.InterestBox}>
                    <div className={styles.InterestImage}>
                        <img src={this.props.interestData.urlImage} alt="Imagem referente ao interesse" />
                    </div>
                    <div className={styles.InterestInfo}>
                        <p className={styles.InterestName}>{this.props.interestData.name}</p>
                        <p className={styles.InterestPrice}>R${this.props.interestData.price},00</p>
                    </div>
                    {this.props.myInterest
                        ?
                        null
                        :
                        <div className={styles.InterestButtonBox}>
                            <Button
                                key={this.props.id + 1}
                                onClick={(id) => this.props.InterestPopupHandler(this.props.interestData.id)}>Detalhes
                            </Button>
                        </div>
                    }
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(Interest);