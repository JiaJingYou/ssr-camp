import indexReducer from './index.js'
import userReducer from './user.js'
import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
const reducer = combineReducers({
    index: indexReducer,
    user: userReducer
})


// export default store
//客户端
export const  getServerStore= () => {
    return createStore(reducer, applyMiddleware(thunk))
}
//服务端
export const  getClientStore= () => {
    const defaultState = window.__context? window.__context: {}
    return createStore(reducer, defaultState, applyMiddleware(thunk))
}