import {createStore, combineReducers, applyMiddleware} from 'redux'
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware';

import axios from 'axios'

const initialState = {
  fetching: false,
  fetched: false,
  error: null
}


const contactReducer = (state=initialState, action) =>{
    switch (action.type) {
      case "FETCH_PENDING":
        return {...state, fetching: true};
      case "FETCH_FULLFILLED":
        return {...state, fetching: false, fatched: true};
      case "FETCH_REJECTED":
        return {...state, fetching: false, error: action.payload};
      default:
        return state;
    }
}

const reducers = combineReducers({
  contact: contactReducer
});


const middleware = applyMiddleware(logger, thunk, promise());

// Buat store
const store = createStore(contactReducer, middleware)

// subscription
store.subscribe(() => {
  console.log('Store changed', store.getState());
})

store.dispatch({
  type: "FETCH",
  payload: axios.get('http://rest.learncode.academy/api/sulhan/contacts')
})

// store.dispatch((dispatch) => {
//   dispatch({type: "FETCH_PENDING"})
//   axios.get('http://rest.learncode.academy/api/sulhan/contacts')
//        .then(response => {
//          dispatch({type: "FETCH_FULLFILLED"})
//        })
//        .catch((err) => {
//          dispatch({type: "FETCH_REJECTED"})
//        })
// })
