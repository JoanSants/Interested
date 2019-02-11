import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Interest from '../../molecules/Interest';
import Spinner from '../../atoms/Spinner';
import styles from './interests.module.css';
import InterestPopUp from '../../organisms/InterestPopUp';

class Interests extends Component {

    state = {
        selectedInterest: null,
        error: null
    }

    //Show Popup
    InterestPopupHandler(id) {
        return this.setState({selectedInterest:id});
    }
    
    render() {
        let interests = null;
        let fetchingInterests = null;

        if (this.props.fetchingInterests) {
            fetchingInterests = <Spinner />
        }

        if (this.props.interests !== null && this.props.interests.length > 0) {
            interests = this.props.interests.map(interest => {
                return <Interest
                        key={interest._id}
                        interestData={{ id: interest._id ,name: interest.name, price: interest.price, description: interest.description, urlImage: interest.urlImage }}
                        InterestPopupHandler={(id) => { this.InterestPopupHandler(id) }}
                        error={this.state.error}
                    />
            })
        }


        return (
            <Fragment>
                <InterestPopUp id={this.state.selectedInterest} />
                {fetchingInterests}
                <section className={styles.AllInterests}>
                    {interests}
                </section>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        interests: state.interest.interests,
        fetchingInterests: state.interest.loading,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Interests);