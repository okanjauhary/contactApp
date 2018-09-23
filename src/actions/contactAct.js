import axios from 'axios';
const fetchContact = () => {
  return {
    type: "FETCH_CONTACT",
    payload: axios.get('http://192.168.0.6:3000/api/contacts')
  }
}

const getContact = (id) => {
  return {
    type: "GET_CONTACT",
    payload: axios.get(`http://192.168.0.6:3000/api/contacts/${id}`)
  }
}

export {
  fetchContact,
  getContact
}
