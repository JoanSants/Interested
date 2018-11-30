import axios from '../../axios';
import * as actionTypes from './actionTypes';

export const addInterestStart = () => {
    return {
        type: actionTypes.ADDINTEREST_START
    };
};

export const addInterestSuccess = (insertedInterest) => {
    return {
        type: actionTypes.ADDINTEREST_SUCCESS,
        insertedInterest: insertedInterest
    };
};

export const addInterestFail = (error) => {
    return {
        type: actionTypes.ADDINTEREST_FAIL,
        error: error
    };
};

export const addInterest = (interest, token) => {
    return dispatch => {
        dispatch(addInterestStart());
        axios.post('/interests', interest, {headers: {
            "x-auth" : token
          }})
            .then((response) => {
                if(response.status === 200 || response.status === 201){
                    return dispatch(addInterestSuccess(response.data.interest));
                }
                return dispatch(addInterestFail(response.data))
            })
            .catch(err => {
                dispatch(addInterestFail(err));
            });
    };
};

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