import {createStackNavigator} from 'react-navigation'
import { Transition, FluidNavigator } from 'react-navigation-fluid-transitions';
import HomeScreen from './../screens/HomeScreen'
import CreateScreen from './../screens/CreateScreen'
import DetailScreen from './../screens/DetailScreen'
import EditScreen from './../screens/EditScreen'
import DetailGroupScreen from './../screens/DetailGroupScreen'
import LoginScreen from './../screens/LoginScreen'

const Root = FluidNavigator({
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
  },
  Login: {
    screen: LoginScreen
  }
})

export default Root
