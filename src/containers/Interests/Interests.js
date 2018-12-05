import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios';

import Interest from '../../components/Interest/Interest';
import styles from './interests.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Interests extends Component {

    componentDidMount() {
        this.props.onFetchInterests();
    }

    postContactHandler = (id) => {
        const body = {
            _interest:id
        }
        axios.post('/users/contact', body, {headers:{
            "x-auth":this.props.token
        }})
    }

    render() {
        let interests = null;

        if(this.props.fetchingInterests){
            interests = <Spinner/>
        }

        if (this.props.interests !== null && this.props.interests.length > 0) {
            interests = this.props.interests.map(interest => {
                return <Interest 
                    key={interest._id}
                    id={interest._id}
                    name={interest.name}
                    price={interest.price}
                    description={interest.description}
                    postContactHandler={(id) => {this.postContactHandler(id)}}
                />
            })
        }


        return (
            <div className={styles.Interests}>
                {interests}
            </div>
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

const mapActionsToProps = dispatch => {
    return {
        onFetchInterests: () => dispatch(actions.fetchInterests())
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Interests);