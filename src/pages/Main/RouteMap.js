import React from 'react';
import { Redirect } from 'react-router-dom';
import Users from './Users';

const RouteMap = {
    dashboard: {
        path: '/',
        exact: true,
        component: <h1>Dashboard</h1>,
    },
    users: {
        path: '/users',
        exact: true,
        component: <Users/>,
        roles: ['ADMIN', 'MANAGER']
    },
    createUser: {
        path: '/users/create',
        component: <h1>Create users</h1>,
        roles: ['ADMIN']
    },
    films: {
        path: '/films',
        component: <h1>Films</h1>,
    },
    default: {
        path: '*',
        component: <Redirect to="/users"/>
    }
}

export default RouteMap;