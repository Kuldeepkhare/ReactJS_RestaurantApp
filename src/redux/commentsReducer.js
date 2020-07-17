import {COMMENTS} from "../shared/comments";
import * as ActionTypes from './actionTypes';
import * as moment from "moment";

export const CommentsReducer = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            let comment = action.payload;
            comment.id = state.length;
            comment.date = moment().format('MMM DD, YYYY');
            return state.concat(comment);
        default:
            return state;
    }
};