
import {ADD_TODO, UPDATE_TODO,UPADTE_HISTORY} from '../constants'
const initState = {
    todolist: [{
        id: '01', title: '吃饭', isFinished: true, isShow: true
    },{
        id: '02', title: '睡觉', isFinished: false, isShow: true
    },{
        id: '03', title: '敲代码', isFinished: true, isShow: true
    }],
   
    // 存放能够前进的数据记录
    advanceTodos: [],
    // 存放能够后退的数据记录
    backTodos: [],
    // 存放前进过滤按钮数据记录
    advanceFields: [],
    // 存放后退过滤按钮数据记录
    backFields: [],
    currentField: 'all'
}
// 过滤展示数据元素
const filterTodolist = (todolist,flag) => {
    return todolist.map(item => {
        if(item.isFinished) {
            item.isShow = flag;
        } else {
            item.isShow = !flag;
        }
        return item;
    })
}

export default (preState=initState, action) => {
    const {type, data} = action;
    let {todolist,backTodos,currentField,backFields} = preState;
    // 深拷贝todolist
    let todos = JSON.parse(JSON.stringify(todolist));
    // todolist记录
    let records;
    // 过滤字段记录
    let fieldRecords;
    
    switch(type) {
        case ADD_TODO:       
            records = [...backTodos, todos.slice()];   
            return {...preState, todolist: [data, ...todolist], backTodos: records}
        case UPDATE_TODO:
            let newTodolist = [];
            records = [...backTodos, todos.slice()];
           
            if(data.hasOwnProperty('isAllChecked')) {
                // 全选状态更新
                newTodolist = todolist.map(item => {
                    item.isFinished = data.isAllChecked;
                    return item;
                });                
            } else if (data.hasOwnProperty('checkedOne')) {
                // 单个状态更新
                const {id, checkedOne} = data;
                newTodolist = todolist.map(item => {
                    if(item.id === id) {
                        item.isFinished = checkedOne;   
                    }
                    return item;
                })
            } else if(data.hasOwnProperty('isEdit')) {
                // 编辑更新todos
                const {id, title} = data;
                newTodolist = todolist.map(item => {
                    if(item.id === id) {
                        item.title = title;   
                    }
                    return item;
                })
            } else if(data.hasOwnProperty('isDelete')) {
                // 删除更新todos
                const { id } = data;
                todolist.map(item => {
                    if(item.id != id) {
                        newTodolist.push(item)   
                    }  
                })
            } else if(data.hasOwnProperty('isFilter')) {
                const {status} = data;
                // 存放过滤字段的记录
                fieldRecords = [...backFields, currentField];
                
                currentField = status;
                // 按条件筛选渲染列表
                switch(status) {
                    
                    case 'all':  
                        newTodolist = todolist.map(item => {
                            item.isShow = true;
                            return item;
                        })  
                        break;
                    case 'active':
                        newTodolist = filterTodolist(todolist, false)
                        break;
                    case 'completed':
                        newTodolist = filterTodolist(todolist, true)
                        break;
                    case 'clearCompleted':  
                        newTodolist = todolist.filter(item => !item.isFinished)
                        if(newTodolist.length === todolist.length) {
                            alert('不能清除，你未选择任务')
                            return {...preState, todolist: newTodolist} 
                        }
                        break;
                }
                return {...preState, todolist: newTodolist, backTodos: records, backFields: fieldRecords,currentField} 
            }
           
            return {...preState, todolist: newTodolist, backTodos: records} 
            // 更新历史记录
            case UPADTE_HISTORY:
               
                return {...data} 
        default: 
            return preState
            
    }
}