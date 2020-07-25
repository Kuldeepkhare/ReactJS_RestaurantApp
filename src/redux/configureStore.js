import {applyMiddleware, combineReducers, createStore} from 'redux';
import {DishesReducer} from "./dishesReducer";
import {CommentsReducer} from "./commentsReducer";
import {LeadersReducer} from "./leadersReducer";
import {PromotionsReducer} from "./promotionsReducer";
import thunk from "redux-thunk";
import logger from "redux-logger/src";
import {createForms} from "react-redux-form";
import {InitialFeedback} from "./forms";

/**
 * This exportable method creates a redux store with two required params(reducer fn, previous state)
 * @returns {Store<{promotions: {image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string}[], comments, dishes: ({image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string})[], leaders: ({image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string})[]}>}
 * @constructor
 */
export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            dishes: DishesReducer,
            comments: CommentsReducer,
            leaders: LeadersReducer,
            promotions: PromotionsReducer,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
}