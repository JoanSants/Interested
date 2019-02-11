import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    contacts: null,
    loading: false,
    error: null,
    
};

const unlockContactStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const unlockContactSuccess = (state, action) => {
    return updateObject( state, { 
        categories:action.categories,
        error: null,
        loading: false
     } );
};

const unlockContactFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CATEGORIES_START: return unlockContactStart(state,action);
        case actionTypes.FETCH_CATEGORIES_SUCCESS: return unlockContactSuccess(state,action);
        case actionTypes.FETCH_CATEGORIES_FAIL: return unlockContactFail(state,action);
        default:
            return state;
    }
};

export default reducer;