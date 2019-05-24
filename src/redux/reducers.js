import { 
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_MEMBER,
  GET_MEMBER_SUCCESS,
  GET_MEMBER_ERROR, 
  GET_ONE_MEMBER,
  GET_ONE_MEMBER_SUCCESS,
  GET_ONE_MEMBER_ERROR, 
  ADD_MEMBER,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR, 
  EDIT_MEMBER,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_ERROR, 
  DELETE_MEMBER,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_ERROR
} from "./action";

let localuser = JSON.parse(localStorage.getItem('user'))
let localtoken = localStorage.getItem('token')

const initialState = {
  user: localuser ? localuser: null,
  token: localtoken ? localtoken: null,
  users: {
    result: {
      data: []
    },
    refreshing: false,
    error: null
  },
  members: {
    result: {
      data: []
    },
    refreshing: false,
    error: null
  },
  member: {
    result: {
      data: []
    },
    refreshing: false,
    error: null
  },
}

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case LOGIN:
      return {...state};
    case LOGIN_SUCCESS:
      return {...state, user: action.payload.user, token: action.payload.token };
    case LOGIN_ERROR:
      return {...state};

    case GET_MEMBER:
      return {...state, members: {...state.members, refreshing: true, error: null}};
    case GET_MEMBER_SUCCESS:
      return {...state, members: {...state.members, result: { data: action.payload }, refreshing: false, error: null}};
    case GET_MEMBER_ERROR:
      return {...state, members: {...state.members, refreshing: false, error: action.error }};

    case GET_ONE_MEMBER:
      return {...state, member: {...state.member, refreshing: true, error: null}};
    case GET_ONE_MEMBER_SUCCESS:
      return {...state, member: {...state.member, result: { data: action.payload }, refreshing: false, error: null}};
    case GET_ONE_MEMBER_ERROR:
      return {...state, member: {...state.member, refreshing: false, error: action.error }};

    case ADD_MEMBER:
      return {...state, member: {...state.member, refreshing: true, error: null}};
    case ADD_MEMBER_SUCCESS:
      return {...state, member: {...state.member, result: { data: action.payload }, refreshing: false, error: null}};
    case ADD_MEMBER_ERROR:
      return {...state, member: {...state.member, refreshing: false, error: action.error }};

    case EDIT_MEMBER:
      return {...state, member: {...state.member, refreshing: true, error: null}};
    case EDIT_MEMBER_SUCCESS:
      return {...state, member: {...state.member, result: { data: action.payload }, refreshing: false, error: null}};
    case EDIT_MEMBER_ERROR:
      return {...state, member: {...state.member, refreshing: false, error: action.error }};

    case DELETE_MEMBER:
      return {...state, member: {...state.member, refreshing: true, error: null}};
    case DELETE_MEMBER_SUCCESS:
      return {...state, member: {...state.member, result: { data: action.payload }, refreshing: false, error: null}};
    case DELETE_MEMBER_ERROR:
      return {...state, member: {...state.member, refreshing: false, error: action.error }};

    default:
      return state
  }
}

export default reducer;