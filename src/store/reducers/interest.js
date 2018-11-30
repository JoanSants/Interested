import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    interests: null,
    interest: null,
    loading: false,
    error: null
};

const addInterestStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const addInterestSuccess = (state, action) => {
    return updateObject( state, {
        interest: action.insertedInterest,
        error: null,
        loading: false
     } );
};

const addInterestFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const fetchInterestsStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const fetchInterestsSuccess = (state, action) => {
    return updateObject( state, { 
        interests:action.interests,
        error: null,
        loading: false
     } );
};

const fetchInterestsFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADDINTEREST_START: return addInterestStart(state,action);
        case actionTypes.ADDINTEREST_SUCCESS: return addInterestSuccess(state,action);
        case actionTypes.ADDINTEREST_FAIL: return addInterestFail(state,action);
        case actionTypes.FETCH_INTERESTS_START: return fetchInterestsStart(state, action);
        case actionTypes.FETCH_INTERESTS_SUCCESS: return fetchInterestsSuccess(state, action);
        case actionTypes.FETCH_INTERESTS_FAIL: return fetchInterestsFail(state, action);
        default:
            return state;
    }
};

export default reducer;