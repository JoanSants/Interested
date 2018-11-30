import axios from '../../axios';
import * as actionTypes from './actionTypes';

export const fetchCategoriesStart = () => {
    return {
        type: actionTypes.FETCH_CATEGORIES_START
    };
};

export const fetchCategoriesSuccess = (receivedCategories) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories: receivedCategories
    };
};

export const fetchCategoriesFail = (error) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAIL,
        error: error
    };
};

export const fetchCategories = () => {
    return dispatch => {
        dispatch(fetchCategoriesStart());
        axios.get('/categories')
            .then((response) => {
                return dispatch(fetchCategoriesSuccess(response.data.categories));
            })
            .catch(err => {
                dispatch(fetchCategoriesFail(err));
            });
    };
};