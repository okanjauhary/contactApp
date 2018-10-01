import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { Transition, FluidNavigator } from 'react-navigation-fluid-transitions';
import HomeScreen from './../screens/HomeScreen'
import CreateScreen from './../screens/CreateScreen'
import DetailScreen from './../screens/DetailScreen'
import EditScreen from './../screens/EditScreen'
import DetailGroupScreen from './../screens/DetailGroupScreen'
import LoginScreen from './../screens/LoginScreen'
import AuthLoadingScreen from './../screens/AuthLoadingScreen'

const AppStack = FluidNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Contact List"
    }
  },
  Create: {
    screen: CreateScreen,
    navigationOptions: {
      title: "Create new contact"
    }
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: {
      header:null
    }
  },
  Edit: {
    screen : EditScreen
  },
  DetailGroup: {
    screen: DetailGroupScreen
  }
})

const AuthStack = FluidNavigator({
  Login: {
    screen: LoginScreen
  }
})

const Root = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack
},{
  initialRouteName: "AuthLoading"
})

export default Root
