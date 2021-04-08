const initialState = {
    isLoading: true,
}

const storeChangers = {
    LOADER_OFF: (state) => {
        return {
            ...state,
            isLoading: false,
        }
    }
}

const reducer = (state=initialState, action) => {
    const {payload, type} = action;
    if (!(type in storeChangers)) {
        return state;
    }
    const changer = storeChangers[type];
    return changer(state, payload);
}

export default reducer;