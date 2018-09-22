import axios from 'axios';
const fetchContact = () => {
  return {
    type: "FETCH_CONTACT",
    payload: axios.get('http://rest.learncode.academy/api/sulhan/contacts')
  }
}

const getContact = (id) => {
  return {
    type: "GET_CONTACT",
    payload: axios.get(`http://rest.learncode.academy/api/sulhan/contacts/${id}`)
  }
}

export {
  fetchContact,
  getContact
}
