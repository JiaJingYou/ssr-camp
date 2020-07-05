// import axios  from "axios"


const GET_LIST = 'INDEX/GET_LIST'

const changelist = list=>({
    type: GET_LIST,
    list
})

export const getIndexList = server => {
    return (dispatch, getState, $axios) => {
        return $axios.get('api/user/list')
            .then(res=>{
                const {list} = res.data
                console.log("list", list);
                dispatch(changelist(list))
            })
    }
}

const defaultState = {
    list: []
}
export default (state=defaultState, action) => {
    switch (action.type) {
        case GET_LIST:
            const newState = {
                ...state,
                list: action.list
            }
            return newState
    
        default:
            return state
    }
}