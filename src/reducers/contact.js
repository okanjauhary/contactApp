const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  data : [],
  member: {}
}

const dataContact = (state = initialState, action) => {
  switch (action.type){
    case "FETCH_CONTACT_PENDING":
      return {
        ...state,
        fetching: true
      }
    case "FETCH_CONTACT_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload.data
      }
    case "FETCH_CONTACT_REJECTED":
      return {
        ...state,
        fetching: false,
        error: action.payload
      }

    case "GET_CONTACT_PENDING":
        return {
          ...state,
          fetching: true
        }
    case "GET_CONTACT_FULFILLED":
        return {
          ...state,
          fetching: false,
          fetched: true,
          member: action.payload.data
        }
    case "GET_CONTACT_REJECTED":
        return {
          ...state,
          fetching: false,
          error: action.payload
        }

      case "CREATE_CONTACT_PENDING":
          return {
            ...state,
            fetching: true
          }
      case "CREATE_CONTACT_FULFILLED":
          return {
            ...state,
            fetching: false,
            fetched: true,
            data: [...state.data, action.payload.data]
          }
      case "CREATE_CONTACT_REJECTED":
          return {
            ...state,
            fetching: false,
            error: action.payload
          }

    case "UPDATE_CONTACT_PENDING":
        return {
          ...state,
          fetching: true
        }
    case "UPDATE_CONTACT_FULFILLED":
        return {
          ...state,
          fetching: false,
          fetched: true,
          member: action.payload.data
        }
    case "UPDATE_CONTACT_REJECTED":
        return {
          ...state,
          fetching: false,
          error: action.payload
        }

      case "DELETE_CONTACT_PENDING":
          return {
            ...state,
            fetching: true
          }
      case "DELETE_CONTACT_FULFILLED":
          const contactListAfterDeleted = state.data.filter(contact => {
            return contact._id != action.payload.data._id
          })
          return {
            ...state,
            fetching: false,
            fetched: true,
            data: contactListAfterDeleted
          }
      case "DELETE_CONTACT_REJECTED":
          return {
            ...state,
            fetching: false,
            error: action.payload
          }

    default:
      return state
  }
}

export default dataContact
