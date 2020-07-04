import axios  from "axios"



const GET_LIST = 'INDEX/GET_USER'

const changelist = info=>({
    type: GET_LIST,
    info
})

export const getUserInfo = server => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('http://localhost:9090/api/user/info')
            .then(res=>{
                const {info} = res.data
                console.log("info", info);
                
                dispatch(changelist(info))
            })
    }
}

const defaultState = {
    info: {}
}
export default (state=defaultState, action) => {
    switch (action.type) {
        case GET_LIST:
            console.log(action.info);
            
            const newState = {
                ...state,
                info: action.info
            }
            return newState
    
        default:
            return state
    }
}