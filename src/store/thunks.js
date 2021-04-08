import { currentUserThunk } from "./user/thunks";

export const initThunk = () => {
    return async dispatch => {
        try {
            await dispatch(currentUserThunk());
        } catch (e) {

        } finally {
            dispatch({
                type: 'LOADER_OFF',
            })
        }
    }
}