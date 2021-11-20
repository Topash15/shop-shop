const reducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_CATEGORY':
            return state = action.payload
        default:
            return state
    }
};

export default reducer