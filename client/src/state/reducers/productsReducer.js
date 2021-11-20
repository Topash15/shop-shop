const reducer = (state = [], action) => {
    switch (action.type) {
        // adds product to the product list
        case 'add product':
            return state.push(action.payload)
        // otherwise returns state
        default:
            return state
    }
};

export default reducer