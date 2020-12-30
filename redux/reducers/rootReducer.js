import { combineReducers } from 'redux'
import main from './main.js'

const rootReducer = combineReducers({
    main: main
})

export default rootReducer