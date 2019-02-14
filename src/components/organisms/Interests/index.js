import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import InterestPopUp from '../../organisms/InterestPopUp';
import HeadingPrimary from '../../atoms/Headers/HeadingPrimary';
import MainAdvice from '../../atoms/Advices/MainAdvice';

import Interest from '../../molecules/Interest';

class MyInterests extends Component {

    state = {
        selectedInterest: null
    }

    render() {
        let myInterests;
        let advice = null;

        if (this.props.myInterests !== null && this.props.myInterests.length > 0) {
            myInterests = this.props.myInterests.map(interest => {
                return <Interest
                    key={interest._id}
                    interestData={{ id: interest._id, name: interest.name, description: interest.description, price: interest.price, urlImage: interest.urlImage }}
                    myInterest={true}
                />
            });
        }

        if (this.props.myInterests !== null && this.props.myInterests.length === 0) {
            advice = <MainAdvice>Você não possui interesses</MainAdvice>
        }

        return (
            <Fragment>
                <HeadingPrimary>Meus Interesses</HeadingPrimary>
                {advice}
                <section className={styles.MyInterests}>
                    <InterestPopUp id={this.state.selectedInterest} />
                    {myInterests}
                </section>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        myInterests: state.auth.user.interests,
    }
}

export default connect(mapStateToProps, null)(MyInterests);