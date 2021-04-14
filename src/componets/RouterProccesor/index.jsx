import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

const RouterProccesor = (props) => {
    return (
        <Switch>
            {
                Object.values(props.routeMap)
                    .map(({component, childs, ...props}) => {
                        return (
                            <PrivateRoute key={props.path} {...props}>
                                {
                                    !!childs ? 
                                    <RouterProccesor routeMap={childs}/> : 
                                    component
                                }
                            </PrivateRoute>
                        )
                    })
            }
        </Switch>
    )
}

export default RouterProccesor;