import React from 'react'
import {connect} from 'react-redux'
import { getUserInfo } from '../store/user'
function User(props) {
    return <div>
        <h1>我是user模块，下面是我的请求数据：</h1>
        <h2>用户的信息{props.info.name}</h2>
        
    </div>
}
User.loadData = (store) =>{
    return store.dispatch(getUserInfo())
}
export default connect(
    state=>({info: state.user.info}),
    {getUserInfo}
)(User)
