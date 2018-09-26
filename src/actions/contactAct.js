import axios from 'axios';
import Config from './../../config/config';

const fetchContact = () => {
  return {
    type: "FETCH_CONTACT",
    payload: axios.get(Config.getAPI('contacts'))
  }
}

const getContact = (id) => {
  return {
    type: "GET_CONTACT",
    payload: axios.get(Config.getAPI('contacts', id))
  }
}

export {
  fetchContact,
  getContact
}
