import {createStore} from 'redux'
import todolistReducer from './reducers/todolist'
export default createStore(todolistReducer)