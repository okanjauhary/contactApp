import {combineReducers} from 'redux'
import dataContact from './contact'
import dataGroup from './group'

const appReducers = combineReducers({
  contact : dataContact,
  group: dataGroup
})

export default appReducers
