import { Link } from "react-router-dom"
import React from 'react'
export default () => {
    return <div>
        <Link to='/'>首页</Link> ||
        <Link to='/about'>关于</Link>
    </div>
}