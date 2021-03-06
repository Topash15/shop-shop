import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from './actions';

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

        // updates cartOpen and cart if ADD_TO_CART
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [ ...state.cart, action.product]
            }

        // 
        case ADD_MULTIPLE_TO_CART:
            if(!action.products){
                return {
                    ...state,
                    cart: [...state.cart],
            }} else { return {
              ...state,
              cart: [...state.cart, ...action.products],
            }};

        // remove items from cart
        case REMOVE_FROM_CART:
            console.log(action)
            let newState = state.cart.filter(product =>{
                return product._id !== action._id
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            }

        // update cart quantity
        case UPDATE_CART_QUANTITY:
            return{
                ...state,
                cartOpen: true,
                cart: state.cart.map(product =>{
                    if(action._id === product._id){
                        product.purchaseQuantity = action.purchaseQuantity
                    }
                    return product
                })
            }

        // clear cart
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            }

        // toggle cart
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen,
            }

        // if it's non of these actions, do not update state at
        // return original state
        default: 
            return state;
    }
}

export default reducer;