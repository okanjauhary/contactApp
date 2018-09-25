
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import store from './src/redux/store'

import Root from './src/navigator/Root'

type Props = {};
export default class App extends Component{

  static router = Root.router

  render() {
    const {navigation} = this.props;
    return (
      <Provider store={store}>
        <Root navigation={navigation}/>
      </Provider>
    );
  }
}
