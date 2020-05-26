import React from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';
import app from '@store/app/actionType';
import { Button, Input } from 'antd';

import "./index.scss";

class Login extends React.Component {
    constructor () {
        super()
    }
    route () {
        console.log(this.props)
        this.props.history.push('/about');
    }
    lang () {
        const lang = this.props.lang === 'en-US' ? 'zh-CN' : 'en-US';
        document.cookie = `lang=${lang}`;
        this.props.setLang(lang)
    }
    render () {
        // console.log(this.props.lang)
        return <div className="login">
            <h1>{intl.get('login')}</h1>
            <Input></Input>
            <Input></Input>
            <Button type="primary" onClick={this.route.bind(this)}>{intl.get('login')}</Button>
            <Button type="danger" onClick={this.lang.bind(this)}>{intl.get('lang')}</Button>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.app.lang
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setLang (lang) {
            dispatch({
                type: app.SWITCH_LANG,
                lang
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);