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