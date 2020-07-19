import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from '@store';

import Routes from '@router';

import intl from 'react-intl-universal';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locales from '@locales';

import _ from "lodash";
import app from '@store/app/actionType';
import './index.css';
import * as serviceWorker from './serviceWorker';



const locale = (lang) => {
  if (lang === 'zh-CN') {
    moment.locale('zh-cn');
    return zhCN;
  } else {
    moment.locale('en');
    return enUS;
  }
}

class App extends React.Component {
  state = {
    initDone: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadLocales()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.lang !== this.state.lang) {
      this.loadLocales()
    }
  }

  loadLocales () {
    let currentLocale = intl.determineLocale({
      urlLocaleKey: "lang",
      cookieLocaleKey: "lang"
    });
    intl.init({
      currentLocale,
      locales: {
        [currentLocale]: locales[currentLocale]
      },
      commonLocaleDataUrls: {
        'zh': false,
        'en': false
      },
    }).then(() => {
      this.setState({
        initDone: true,
        lang: currentLocale,
      });
      this.props.setLang(currentLocale)
    });
  }

  render () {
    return (
      this.state.initDone && <ConfigProvider locale={locale(this.props.lang)}>
          <Routes />
      </ConfigProvider>
    )
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
App = connect(mapStateToProps, mapDispatchToProps)(App);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('root')
);


serviceWorker.unregister();
