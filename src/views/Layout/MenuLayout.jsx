import React from 'react';

export default class MenuLayout extends React.Component {
    constructor () {
        super()
    }

    render () {
        return <div>
            {this.props.children}
        </div>
    }
}