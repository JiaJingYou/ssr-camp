import indexReducer from './index.js'
import userReducer from './user.js'
import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
const reducer = combineReducers({
    index: indexReducer,
    user: userReducer
})

const serverAxios = axios.create({
    baseURL: 'http://localhost:9090/'
})
const clientAxios = axios.create({
    baseURL: '/'
})
// export default store
//客户端
export const  getServerStore= () => {
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}
//服务端
export const  getClientStore= () => {
    const defaultState = window.__context? window.__context: {}
    return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}