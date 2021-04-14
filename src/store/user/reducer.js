const initialState = {
    isAuth: false,
    token: localStorage.getItem('token'),
    data: null,
}

const storeChangers = {
    GET_CURRENT_USER: (state, payload) => {
        return {
            ...state,
            isAuth: true,
            data: payload.user,
        }
    },
    LOGGOUT: (state, payload) => {
        return {
            token: '',
            isAuth: false,
            data: null,
        }
    },
    CHANGE_ROLE: (state, payload) => {
        return {
            ...state,
            data: {
                ...state.data,
                role: payload
            },
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