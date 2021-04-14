import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({
    roles,
    children,
    ...props
}) => {
    const role = useSelector(store => store.user.data.role);
    if (!roles) return <Route {...props}>{children}</Route>
    if (roles.includes(role)) {
        return <Route {...props}>{children}</Route>
    }
    return <Redirect to="/"/>
    
}

export default PrivateRoute;