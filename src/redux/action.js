export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const GET_MEMBER = 'GET_MEMBER'
export const GET_MEMBER_SUCCESS = 'GET_MEMBER_SUCCESS'
export const GET_MEMBER_ERROR = 'GET_MEMBER_ERROR'

export const GET_ONE_MEMBER = 'GET_ONE_MEMBER'
export const GET_ONE_MEMBER_SUCCESS = 'GET_ONE_MEMBER_SUCCESS'
export const GET_ONE_MEMBER_ERROR = 'GET_ONE_MEMBER_ERROR'

export const ADD_MEMBER = 'ADD_MEMBER'
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS'
export const ADD_MEMBER_ERROR = 'ADD_MEMBER_ERROR'

export const EDIT_MEMBER = 'EDIT_MEMBER'
export const EDIT_MEMBER_SUCCESS = 'EDIT_MEMBER_SUCCESS'
export const EDIT_MEMBER_ERROR = 'EDIT_MEMBER_ERROR'

export const DELETE_MEMBER = 'DELETE_MEMBER'
export const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS'
export const DELETE_MEMBER_ERROR = 'DELETE_MEMBER_ERROR'


export const getMember = () => {
  return {
    type: GET_MEMBER,
  }
}

export const getOneMember = (id) => {
  return {
    type: GET_ONE_MEMBER,
    payload: { id }
  }
}

export const addMember = (name, email, donation, phonenumber) => {
  return {
    type: ADD_MEMBER,
    payload: { name, email, donation, phonenumber }
  }
}

export const editMember = (id, name, email, donation, phonenumber) => {
  return {
    type: EDIT_MEMBER,
    payload: { id, name, email, donation, phonenumber }
  }
}

export const deleteMember = (id) => {
  return {
    type: DELETE_MEMBER,
    payload: { id }
  }
}

export const login = (username, password) => {
  return {
    type: LOGIN,
    payload: {
      username,
      password
    }
  }
}