import { getCurrentUser } from "../../api"

export const currentUserThunk = () => {
    return async dispatch => {
        try {
            const user = await getCurrentUser();
            await dispatch({
                type: 'GET_CURRENT_USER', 
                payload: {user},
            })
        } catch (e) {
            console.error(e);
        }
    }
}