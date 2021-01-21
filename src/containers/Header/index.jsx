import React from 'react'
import {connect} from 'react-redux'
import {addTodo, updateTodolist, updateHistory} from '../../redux/actions/todolist'
// 添加任务
const HeaderUI = props => {
    let {addTodo,advanceTodos,backTodos,todolist,updateTodolist,updateHistory,backFields,advanceFields,currentFieldName} = props;
    const isAllFinished = todolist.length === 0 ? false : todolist.every(item => item.isFinished);
    const addTodolist = event => {
        const {keyCode,target:{value}} = event;   
        if(keyCode === 13) { 
            if(value.trim().length === 0) {
                alert('添加任务不能为空')
                return
            }
            // 给父组件添加todo
            let todo = {id: +new Date() + '', title: value, isFinished: false,isShow: true};
            // 触发父组件中的事件
            addTodo(todo);
            // 清空添加任务项
            event.target.value = '';
        }
    }
    // 更新历史记录
    const handleHistory = flag => {
        let currentTodo = [];
        let currentField;
        // 前进
        if(flag && advanceTodos.length !== 0) {          
            // 把前进操作的数据弹出
            currentTodo = advanceTodos.pop();  
              
            // 存放在后退操作的数据中
            backTodos = [...backTodos, [...todolist]];
            if(advanceFields.length !== 0) {
                currentField = advanceFields.pop();
                backFields = [...backFields, currentField];
            }
            
        } else if(!flag && backTodos.length !== 0) {
            
            // 后退操作 && backTodos.length !== 0           
            // 把后退操作的数据弹出存放在当前todo里
            currentTodo = backTodos.pop();  
            
            // 存放在前进操作的数据中
            advanceTodos = [...advanceTodos, [...todolist]];
            
            if(backFields.length !== 0) {
                currentField = backFields.pop();
                // 存放前进过滤字段数据
                advanceFields = [...advanceFields, currentFieldName]
            }
        } else {
            return
        }
        // 更新历史记录
        updateHistory({
            todolist: currentTodo,
            advanceTodos,
            backTodos,
            backFields,
            advanceFields,
            currentField
        })
            
        
    }
    return (
        <div className='header'>
            <div className='operation'>
                <button className={advanceTodos.length > 0  || advanceFields.length>0 ? 'advanceActive' : 'advance'} onClick={() => handleHistory(true)}></button>
                <button className={backTodos.length > 0 || backFields.length>0 ? 'backActive' : 'back'} onClick={() => handleHistory(false)}></button>    
            </div>
            <input type="checkbox" checked={isAllFinished} onChange={(e) => updateTodolist({isAllChecked: e.target.checked})}/>
            <input onKeyDown={addTodolist} type="text" className='addTodo' placeholder='What need to be done?'/>
        </div>
    )
}
export default connect(
    state => ({
        todolist: state.todolist, 
        // 前进的历史栈
        advanceTodos: state.advanceTodos,
        // 后退的历史栈
        backTodos: state.backTodos,
        advanceFields: state.advanceFields,
        backFields: state.backFields,
        currentFieldName: state.currentField
    }),
    {
        addTodo,
        updateTodolist,
        updateHistory
        
    }
)(HeaderUI)

