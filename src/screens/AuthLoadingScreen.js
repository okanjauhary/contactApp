import React from 'react';
import { AsyncStorage, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

class AuthLoadingScreen extends React.Component {
  constructor() {
      super()
      this._loadingAsync()
  }

  _loadingAsync = async () => {
    const TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN')

    this.props.navigation.navigate(TOKEN ? 'App': 'Auth')
  }

  render() {
    return(
      <Text>Loading...</Text>
    )
  }
}

export default withNavigation(AuthLoadingScreen)
