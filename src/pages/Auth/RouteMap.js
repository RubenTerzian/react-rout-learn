import React from 'react';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import UpdatePassword from './UpdatePassword';
import Registration from './Registration';

const AuthRouteMap = {
    login: {
        path: '/auth/login',
        component: <Login/>,
    },
    registration: {
        path: '/auth/reg',
        component: <Registration/>,
    },
    reset: {
        path: '/auth/reset',
        childs: {
            res1: {
                path: '/auth/reset/1',
                component: <h1>Reset 1</h1>,
            },
            res2: {
                path: '/auth/reset/2',
                component: <h1>REset 2</h1>,
            },
            root: {
                path: '/auth/reset',
                component: <UpdatePassword/>,
            },
        }
    },
    default: {
        path: '*',
        component: <Redirect to="/auth/login"/>
    }
}

export default AuthRouteMap;