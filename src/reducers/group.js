const initialState = {
  fetching: false,
  fetched : false,
  error   : null,
  groups  : [],
  group   : {}
}

const dataGroup = (state = initialState, action) => {
  switch (action.type){
    case "FETCH_GROUP_PENDING":
      return {
        ...state,
        fetching: true
      }
    case "FETCH_GROUP_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        groups: action.payload.data
      }
    case "FETCH_GROUP_REJECTED":
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
      case "GET_GROUP_PENDING":
        return {
          ...state,
          fetching: true
        }
      case "GET_GROUP_FULFILLED":
        return {
          ...state,
          fetching: false,
          fetched: true,
          group: action.payload.data
        }
      case "GET_GROUP_REJECTED":
        return {
          ...state,
          fetching: false,
          error: action.payload
        }
    default:
      return state
  }
}

export default dataGroup
