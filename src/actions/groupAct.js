import axios from 'axios';
import Config from './../../config/config';

export const fetchGroup = () => {
  return {
    type: "FETCH_GROUP",
    payload: axios.get(Config.getAPI('groups'))
  }
}

export const getGroup = (id) => {
  return {
    type: "GET_GROUP",
    payload: axios.get(Config.getAPI('groups', id))
  }
}
