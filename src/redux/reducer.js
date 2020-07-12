




/**
 * Initial state
 * @type {{promotions: [{image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string}], comments, dishes: [{image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string}, {image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string}, {image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string}, {image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string}], leaders: [{image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string}, {image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string}, {image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string}, {image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string}]}}
 */
export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
}
/**
 * Reducer: Pure javascript function that takes previous state and action and returns the new state
 * @param state
 * @param action
 * @returns {{promotions: {image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string}[], comments, dishes: ({image: string, featured: boolean, price: string, name: string, description: string, id: number, label: string, category: string})[], leaders: ({image: string, featured: boolean, name: string, description: string, id: number, designation: string, abbr: string})[]}}
 * @constructor
 */
export const Reducer = (state = initialState, action) => {
    return state;
}