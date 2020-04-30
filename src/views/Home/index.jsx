import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

class Home extends React.Component {
    constructor () {
        super()
    }
    
    render () {
        return <div>
            <RangePicker />
      </div>
    }
}

export default Home;