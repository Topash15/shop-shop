const reducer = (state = [], action) => {
    switch (action.type) {
        case 'setCurrentCategory':
            return state = action.payload
        default:
            return state
    }
};

export default reducer