export const getCategories = (categoryData) => {
    return(dispatch) => {
        console.log('getCategories')
        dispatch({
            type: "GET_CATEGORIES",
            payload: categoryData.categories
        })
    }
}

// export const setCurrentCategory = (CurrentCategory) => {
//     return(dispatch) => {
//         dispatch({
//             type: "SET_CURRENT_CATEGORY",
//             payload: CurrentCategory
//         })
//     }
// }