import axios from '../../axios';
import * as actionTypes from './actionTypes';

export const fetchInterestsStart = () => {
    return {
        type: actionTypes.FETCH_INTERESTS_START
    };
};

export const fetchInterestsSuccess = (interests) => {
    return {
        type: actionTypes.FETCH_INTERESTS_SUCCESS,
        interests: interests
    };
};

export const fetchInterestsFail = (error) => {
    return {
        type: actionTypes.FETCH_INTERESTS_FAIL,
        error: error
    };
}

export const fetchInterests = () => {
    return dispatch => {
        dispatch(fetchInterestsStart());
        axios.get('/interests').then(response => {
            return dispatch(fetchInterestsSuccess(response.data.interests));
        }).catch(error => {
            return dispatch(fetchInterestsFail(error.data));
        });
    }
}