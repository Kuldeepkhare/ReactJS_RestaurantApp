import {createStore} from 'redux';
import {initialState, Reducer} from './reducer';

/**
 * This exportable method creates a redux store with two required params(reducer fn, previous state)
 * @returns {Store<{promotions: {image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string}[], comments, dishes: ({image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string})[], leaders: ({image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string})[]}>}
 * @constructor
 */
export const ConfigureStore = () => {
    return createStore(
        Reducer, // reducer
        initialState, // our initialState
    );
}