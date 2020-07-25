import * as ActionTypes from './actionTypes';

export const DishesReducer = (state = {
    isLoading: true,
    errorMessage: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.DISHES_FAILED:
            // spread operator here will make the copy of state and apply new changes,
            // thereby keeping it immutable
            return {...state, isLoading: false, errorMessage: action.payload};
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errorMessage: null, dishes: []}
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errorMessage: null, dishes: action.payload};
        default:
            return state;
    }
};