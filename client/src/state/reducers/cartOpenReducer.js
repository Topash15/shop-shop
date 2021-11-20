const reducer = (state = false, action) => {
    switch (action.type) {
        case 'toggle cart':
            return !state
        default:
            return state
    }
};

export default reducer