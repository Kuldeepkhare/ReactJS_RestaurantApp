import * as ActionTypes from './actionTypes';

export const CommentsReducer = (state = {
    errorMessage: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errorMessage: null, comments: action.payload};
        case ActionTypes.COMMENTS_FAILED:
            return {...state, errorMessage: action.payload};
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            return { ...state, comments: state.comments.concat(comment)};
        default:
            return state;
    }
};