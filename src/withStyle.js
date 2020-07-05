import React from 'react'

function withStyle(Comp, styles) {
    return function (props) {
        if(props.staticContext) {
            props.staticContext.css.push(styles._getCss())
        }
        return <Comp {...props}></Comp>
    }
}

export default withStyle