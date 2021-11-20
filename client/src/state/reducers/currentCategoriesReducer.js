const reducer = (state = '', action) => {
    switch (action.type) {
        case 'set category':
            return state = action.payload
        default:
            return state
    }
};

export default reducer