import { put, takeEvery, all } from 'redux-saga/effects'
import axios from 'axios'

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
} from './action'

function* login(action) {
	const { username, password } = action.payload
	try{
		const response = yield axios({
			url: '/login',
			method: 'post',
			data: { username, password },
		})
		yield put({ type: LOGIN_SUCCESS, payload: response.data })
	} catch (error) {
		yield put({ type: LOGIN_ERROR, error })
	}
}

function* getMember() {
	try {
		const response = yield axios({
			url: '/members',
			method: 'get'
		})
		yield put({ type: GET_MEMBER_SUCCESS, payload: response.data })
	} catch(error) {
		console.log(error)
		yield put({ type: GET_MEMBER_ERROR, error })
	}
}

function* getOneMember(action) {
	const { id } = action.payload
	try {
		const response = yield axios({
			url: '/members/'+id,
			method: 'get'
		})
		yield put({ type: GET_ONE_MEMBER_SUCCESS, payload: response.data })
	} catch(error) {
		console.log(error)
		yield put({ type: GET_ONE_MEMBER_ERROR, error })
	}
}

function* addMember(action) {
	const  { name, email, donation, phonenumber } = action.payload
	try {
		const response = yield axios({
			url: '/members',
			method: 'post',
			data: { name, email, donation, phonenumber }
		})
		yield put({ type: ADD_MEMBER_SUCCESS, payload: response.data })
	} catch(error) {
		console.log(error)
		yield put({ type: ADD_MEMBER_ERROR, error })
	}
}

function* editMember(action) {
	const { id, name, email, donation, phonenumber } = action.payload
	try {
		const response = yield axios({
			url: '/members/'+id,
			method: 'put',
			data: { id, name, email, donation, phonenumber }
		})
		yield put({ type: EDIT_MEMBER_SUCCESS, payload: response.data })
	} catch(error) {
		console.log(error)
		yield put({ type: EDIT_MEMBER_ERROR, error })
	}
}

function* deleteMember(action) {
	console.log('deleteMember saga')
	const { id } = action.payload
	try {
		const response = yield axios({
			url: '/members/'+id,
			method: 'delete'
		})
		yield put({ type: DELETE_MEMBER_SUCCESS, payload: response.data })
	} catch(error) {
		console.log(error)
		yield put({ type: DELETE_MEMBER_ERROR, error })
	}
}

function* watchSaga() {
	yield takeEvery(LOGIN, login)
	yield takeEvery(GET_MEMBER, getMember)
	yield takeEvery(GET_ONE_MEMBER, getOneMember)
	yield takeEvery(ADD_MEMBER, addMember)
	yield takeEvery(EDIT_MEMBER, editMember)
	yield takeEvery(DELETE_MEMBER, deleteMember)
}

export default function* rootSaga(){
	yield all([
		watchSaga()
	])
}
