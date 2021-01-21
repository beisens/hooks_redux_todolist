import {ADD_TODO, UPDATE_TODO, UPADTE_HISTORY, UPADTE_FIELD} from '../constants'
// 添加一个todo
export const addTodo = data => ({type: ADD_TODO, data})
// 更新todolist的数据状态
export const updateTodolist = data => ({type: UPDATE_TODO, data})
// 更新历史记录
export const updateHistory = data => ({type: UPADTE_HISTORY, data}) 