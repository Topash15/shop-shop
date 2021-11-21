// retrieves all categories
export const updateCategories = (categories) => {
    return(dispatch) => {
        // console.log('updateCategories')
        dispatch({
            type: "UPDATE_CATEGORIES",
            categories
        })
    }
}

// sets current category
export const setCurrentCategory = (id) => {
    return(dispatch) => {
        dispatch({
            type: "UPDATE_CURRENT_CATEGORY",
            currentCategory: id
        })
    }
}

// // updates products
export const updateProducts = (products) => {
    return(dispatch) => {
        dispatch({
            type: "UPDATE_PRODUCTS",
            products
        })
    }
}

// toggles cart
export const toggleCartAction = () => {
    return(dispatch) => {
        dispatch({
            type: "TOGGLE_CART"
        })
    }
}

// add item to cart
export const addItemToCartAction = (item) => {
    console.log(item)
    return(dispatch) => {
        dispatch({
            type: "ADD_TO_CART",
            product: { ...item, purchaseQuantity: 1 },
          })
    }
}

// adds multiple items to cart list
export const addMultipleToCartAction = (cart, products) => {
    return(dispatch) => {
        dispatch({
            type: "ADD_MULTIPLE_TO_CART",
            cart
        })
    }
}

// update cart
export const updateCartQuantityAction = (_id, quantity) => {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_CART_QUANTITY",
            _id: _id,
            purchaseQuantity: quantity + 1
          })
    }
}

// remove item from cartOpen
export const removeFromCartAction = (_id) => {
    return (dispatch) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            _id: _id
          })
    }
}

// clear cart
export const clearCartAction = () => {
    return (dispatch) => {
        dispatch({
            type: "CLEAR_CART",
        })
    }
}