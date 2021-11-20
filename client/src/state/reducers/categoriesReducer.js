const reducer = (state = [], action) => {
    switch (action.type) {
        case 'add category':
            return state.push(action.payload)
        default:
            return state
    }
};

export default reducer