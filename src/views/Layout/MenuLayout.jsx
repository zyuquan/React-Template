import React from 'react';

export default class MenuLayout extends React.Component {
    constructor () {
        super()
    }

    render () {
        console.log(this.props.datas)
        return <div>
            {this.props.children}
        </div>
    }
}