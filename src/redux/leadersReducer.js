import * as ActionTypes from "./actionTypes";

/**
 * This reducer is called to respond based on action type
 * @param state
 * @param action
 * @returns {{isLoading: boolean, errorMessage: null, leaders: []}|{isLoading: boolean, errorMessage: null, leaders: *}|{isLoading: boolean, errorMessage: *, leaders: []}}
 * @constructor
 */
export const LeadersReducer = (state = {
    isLoading: true,
    errorMessage: null,
    leaders: []
}, action) => {
    switch (action.type) {
        case ActionTypes.LEADERS_FAILED:
            // spread operator here will make the copy of state and apply new changes,
            // thereby keeping it immutable
            return {...state, isLoading: false, errorMessage: action.payload};
        case ActionTypes.LEADERS_LOADING:
            return {...state, isLoading: true, errorMessage: null, leaders: []}
        case ActionTypes.ADD_LEADERS:
            return {...state, isLoading: false, errorMessage: null, leaders: action.payload};
        default:
            return state;
    }
};