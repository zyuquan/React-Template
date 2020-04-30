import React from 'react';

class BasicLayout extends React.Component {
    constructor () {
        super()
    }

    render () {
        return <div>
            {this.props.children}
        </div>
    }
}

export default BasicLayout;