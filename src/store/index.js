import {
    combineReducers, 
    createStore,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { getCurrentUser } from '../api';
import userReducer from './user/reducer';
import uiReducer from './ui/reducer';
import {initThunk} from './thunks';

const rootReduccer = combineReducers({
    user: userReducer,
    ui: uiReducer,
})

const store = createStore(rootReduccer, applyMiddleware(thunk))

store.dispatch(initThunk())

export default store;