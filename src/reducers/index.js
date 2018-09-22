import {combineReducers} from 'redux'
import dataContact from './contact'

const appReducers = combineReducers({
  contact : dataContact
})

export default appReducers
