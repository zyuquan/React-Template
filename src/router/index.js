import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import config from './config';

export default class Routes extends React.Component {
    constructor () {
        super()
    }

    renderChildern (list, auths, key) {
        const routes = [];
        for (let i = 0; i < list.length; i++) {
            let { component, path, redirect, exact, auth, children, datas } = list[i];
            const Component = component;
            if (auth && !auth.includes(auths)) {
                continue;
            }
            if (redirect) {
                routes.push(<Redirect key={key.toString()+i} form={path} to={redirect}/>)
            } else if (path) {
                routes.push(<Route key={key.toString()+i} exact={!!exact} path={path} render={(props)=>(
                    <Component datas={datas} {...props}>
                        {
                            children ? this.renderChildern(children, auths, i) : null
                        }
                    </Component>
                )} />)
            }
        }
        return routes;
    }

    render () {
        
        return <BrowserRouter>
            <Switch>
                {
                    this.renderChildern(config, null, 1)
                }
            </Switch>
        </BrowserRouter>
    }
}