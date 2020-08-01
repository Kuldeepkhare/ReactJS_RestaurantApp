import * as ActionTypes from './actionTypes';
import {baseURL} from '../shared/baseURL';

/**
 * This method is called to add comment
 * @param comment
 * @returns {{payload: *, type: string}}
 */
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

/**
 * This method is called when user submits comment
 * @param dishId
 * @param rating
 * @param author
 * @param comment
 * @returns {function(*): Promise<any>}
 */
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    return fetch(baseURL + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error :' + response.status + ' : ' + response.statusText);
                    error.message = response.message;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comments', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
}

/**
 * This action is called when user posts feedback
 * @param feedback
 * @returns {function(*): Promise<void>}
 */
export const postFeedback = (feedback) => (dispatch) => {
    const newFeedback = {
        firstName: feedback.firstName,
        lastName: feedback.lastName,
        phone: feedback.phone,
        email: feedback.email,
        agree: feedback.agree,
        contactType: feedback.contactType,
        message: feedback.message,
        date: new Date().toISOString()
    };
    return fetch(baseURL + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error :' + response.status + ' : ' + response.statusText);
                    error.message = response.message;
                    throw error;
                }
            },
            error => {
                throw error;
            })
        .then(response => response.json())
        .then(response => alert('Your feedback has been submitted: ' + JSON.stringify(response)))
        .catch(error => {
            console.log('post comments', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
}

/**
 * This method is called to fetch dishes
 * @returns {function(*): Promise<any>}
 */
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseURL + 'dishes')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error :' + response.status + ' : ' + response.statusText);
                    error.message = response.message;
                    throw error;
                }
            },
            error => {
                let errorMessage = new Error(error.message);
                throw errorMessage;
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

/**
 * Action for dishes loading
 * @returns {{type: string}}
 */
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

/**
 * Action for dishes failed
 * @param errorMessage: error message of failure
 * @returns {{payload: *, type: string}}
 */
export const dishesFailed = (errorMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errorMessage
});

/**
 * This action is called when user adds dishes
 * @param dishes
 * @returns {{payload: *, type: string}}
 */
export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

/**
 * This action is called to fetch leader data from API
 * @returns {function(*): Promise<any>}
 */
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true));
    return fetch(baseURL + 'leaders')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error :' + response.status + ' : ' + response.statusText);
                    error.message = response.message;
                    throw error;
                }
            },
            error => {
                let errorMessage = new Error(error.message);
                throw errorMessage;
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

/**
 * This action is called when leaders are in loading state
 * @returns {{type: string}}
 */
export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

/**
 * This action is called when retrieval of leaders gets failed
 * @param errorMessage
 * @returns {{payload: *, type: string}}
 */
export const leadersFailed = (errorMessage) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errorMessage
});

/**
 * This action is called when leaders are to be added
 * @param leaders
 * @returns {{payload: *, type: string}}
 */
export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});
/**
 * This action is called to retrieve comments from API
 * @returns {function(*): Promise<any>}
 */
export const fetchComments = () => (dispatch) => {
    return fetch(baseURL + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error :' + response.status + ' : ' + response.statusText);
                    error.message = response.message;
                    throw error;
                }
            },
            error => {
                let errorMessage = new Error(error.message);
                throw errorMessage;
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

/**
 * This action is called when comments fails
 * @param errorMessage
 * @returns {{payload: *, type: string}}
 */
export const commentsFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMessage
});

/**
 * This action is called when comments fails
 */
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

/**
 * This action is called when comments fails
 */
export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());
    return fetch(baseURL + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error :' + response.status + ' : ' + response.statusText);
                    error.message = response.message;
                    throw error;
                }
            },
            error => {
                let errorMessage = new Error(error.message);
                throw errorMessage;
            })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

/**
 * This action is called when comments fails
 */
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

/**
 * This action is called when promos fails
 */
export const promosFailed = (errorMessage) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errorMessage
});


/**
 * This action is called when promo needs to be taken
 */
export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});