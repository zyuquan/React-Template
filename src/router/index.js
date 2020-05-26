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
            console.log(list[i])
            const Component = component;
            const index = key+i;
            if (auth && !auth.includes(auths)) {
                continue;
            }
            if (redirect) {
                routes.push(<Redirect key={index} from={path} to={redirect} exact={exact} />)
            } else if (!path && Component) {
                routes.push(<Component key={index} datas={datas} exact={exact}>
                    {
                        children ? this.renderChildern(children, index) : null
                    }
                </Component>)
            } else if (!path && !Component && children) {
                routes.push(...this.renderChildern(children, index))
            } else {
                routes.push(<Route key={index} path={path} exact={exact} render={(props)=>(
                    <Component datas={datas} {...props}>
                        {
                            children ? this.renderChildern(children, index) : null
                        } 
                    </Component>
                    )
                }></Route>)
            }
        }
        return routes;
    }

    render () {
        
        return <BrowserRouter>
            <Switch>
                {
                    this.renderChildern(config, null, '1')
                }
            </Switch>
        </BrowserRouter>
    }
}