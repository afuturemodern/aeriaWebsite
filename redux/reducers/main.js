import * as types from '../types.js'

const main = ( state = {
        data: [],
        active: true
}, action) => {
    switch(action.type){
        case types.ACTIVE_TOGGLE:
            return { ...state, 
                data: action.payload
            }
        default:
            return {...state}
    }
}

export default main