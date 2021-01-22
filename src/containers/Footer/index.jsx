import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {updateTodolist} from '../../redux/actions/todolist'
const Footer = () => {
    const {todolist,currentField} = useSelector(state => ({todolist: state.todolist,currentField: state.currentField}));
    const dispatch = useDispatch();
    // 展示的数据数量
    const todoCount = todolist.filter(item => item.isShow).length;
    const handleClick = (status) => {
        // 更新当前点击对象
        dispatch(updateTodolist({isFilter: true, status}))
    }
    return (
        <div className='footer'>
            <div className='footLeft'>
                <span>{todoCount}</span>items left 
            </div>  
            <div className='footRight'>
               <span className={currentField === 'all' ? 'handleActive': ''} onClick={() => handleClick('all')}>All</span> 
               <span className={currentField === 'active' ? 'handleActive': ''} onClick={() => handleClick('active')}>Active</span> 
               <span className={currentField === 'completed' ? 'handleActive': ''} onClick={() => handleClick('completed')}>Completed</span> 
               <span className={currentField === 'clearCompleted' ? 'handleActive': ''} onClick={() => handleClick('clearCompleted')}>ClearCompleted</span>
            </div>    
        </div>
    )
}
export default Footer
