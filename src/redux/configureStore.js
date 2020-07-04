import {createStore} from 'redux';
import {initialState, Reducer} from './reducer';

export const ConfigureStore = () => {
    return createStore(
        Reducer, // reducer
        initialState, // our initialState
    );
}