import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { getIndexList } from '../store'
import styles from './Index.css'
import withStyle from '../withStyle'
function Index(props) {
    // console.log(styles._getCss());
    // console.log('props111111111111', props.staticContext.css);
    
    const [count, setCount] = useState(1)
    useEffect(()=>{
        if(!props.list.length){
            props.getIndexList()
        }
        
    })
    return <div>
        <h1 className={styles.container}>我是index模块</h1>
        <hr/>
        <ul>
            {props.list.map(item=>{
                return <li key={item.id}>{item.name}</li>
            })}
        </ul>
    </div>
}

let newIndex = connect(
    state=>({list: state.index.list}),
    {getIndexList}
)(withStyle(Index, styles))

newIndex.loadData = (store) =>{
    return store.dispatch(getIndexList())
}
export default newIndex
