import indexReducer from './index.js'
import {createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
const reducer = combineReducers({
    index: indexReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store