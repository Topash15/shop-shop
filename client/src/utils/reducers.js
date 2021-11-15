import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from './actions';

import { useReducer } from 'react' 

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type is value of 'UPDATE_PRODUCTS',
        // return a new state with updated product list
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products]
            };
        
        // if 'UPDATE_CATEGORIES, return new state with updated category list
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };

        // if UPDATE_CURRENT_CATEGORY, return new state with
        // updated currentCategory
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }

        // if it's non of these actions, do not update state at
        // return original state
        default: 
            return state;
    }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}