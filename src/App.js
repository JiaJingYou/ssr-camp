import React, {useState} from 'react'
function App() {
    const [count, setCount] = useState(1)
    return <div>
        <h1>React-ssr1</h1>

        <span>count:{count}</span>
        <button onClick={()=>setCount(count+1)}>累加</button>
    </div>
}

export default <App></App>
