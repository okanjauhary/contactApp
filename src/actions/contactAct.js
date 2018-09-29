import axios from 'axios';
import Config from './../../config/config';

export function fetchContact(){
  return {
    type: "FETCH_CONTACT",
    payload: axios.get(Config.getAPI('contacts'))
  }
}

export function getContact(id){
  return {
    type: "GET_CONTACT",
    payload: axios.get(Config.getAPI('contacts', id))
  }
}

export function createContact(value) {
  return {
    type: "CREATE_CONTACT",
    payload: axios({
      method: 'POST',
      url: 'http://192.168.0.11:8000/api/contacts',
      data: value
    })
  }
}
