
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import store from './src/redux/store'

import Root from './src/navigator/Root'

type Props = {};
export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}
