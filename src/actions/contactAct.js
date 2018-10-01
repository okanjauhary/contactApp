import axios from 'axios';
import Config from './../../config/config';

export function fetchContact(){
  return {
    type: "FETCH_CONTACT",
    payload: axios.get('http://192.168.0.11:8000/api/contacts')
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

export function updateContact(id, value) {
  return {
    type: "UPDATE_CONTACT",
    payload: axios({
      method: 'PUT',
      url: `http://192.168.0.11:8000/api/contacts/${id}`,
      data: value
    })
  }
}

export function deleteContact(id) {
  return {
    type: "DELETE_CONTACT",
    payload: axios({
      method: 'DELETE',
      url: `http://192.168.0.11:8000/api/contacts/${id}`
    })
  }
}
