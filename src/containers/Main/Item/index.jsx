/*
    问题产生： 当我们双击item时，触发事件给isEdit设置为true时，由于是个异步操作
    我们不能直接获取到inputRef了。
    const handleEdit = event => {
        // 双击开启编辑
        setIsEdit(editState => editState = true)
        console.log(inputRef); // 这里是不能通过inputRef.current获取元素当
    }
    解决：useEffect钩子函数，当isEdit状态改变时触发：
*/
import React, { useState, Fragment, useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { updateTodolist } from '../../../redux/actions/todolist'
const ItemUI = props => {
    const [currentItem, setCurrentItem] = useState('00'); // 当前鼠标选中的元素
    const [isEdit, setIsEdit] = useState(false); // 是否处于编辑状态
    const [value, setValue] = useState(''); // 存放编辑的任务名
    const inputRef = useRef() // 输入框ref
    useEffect(() => {
        if(isEdit) {
            inputRef.current.value = value;
            inputRef.current.select()
        }
    }, [isEdit])
    // console.log(props);
    const { id, isFinished, title, isShow, updateTodolist} = props
    // 鼠标移入显示删除
    const handleMouse = (flag, id) => {
        if(flag) {
            // 鼠标移入
            setCurrentItem(id)
        } else {
            // 鼠标移出
            setCurrentItem('00')
        }
    }
    // 更新某个任务状态
    const updateOneState = (checkedOne, id) => {
        updateTodolist({checkedOne,id})
    }
    // 编辑状态
    const handleEdit = event => {
        setValue(event.target.innerHTML)
        // 双击开启编辑
        setIsEdit(true)       
    }
    // 封装setEdit函数为同步
    const setEdiltAsync = () => {
        return new Promise(reslove => {
            setIsEdit(editState => {
                editState = true;
                return editState;
            })
        }) 
    }
    // 修改任务
    const handleBlur = (event, id) => {
        const {value} = event.target
        if (value.trim().length === 0) {
            alert('任务不能为空')
            return
        }
        // 失焦关闭编辑
        setIsEdit(false)
        updateTodolist({isEdit: true, id, title: value})
    }
    // 删除任务
    const tdeleteTodo = id => {
        updateTodolist({isDelete: true, id})
    }
    return (
        <Fragment>
            { isShow && <div className='item' onMouseEnter={() => handleMouse(true, id)} onMouseLeave={() => handleMouse(false)}>
                {
                    !isEdit ?
                        <Fragment>
                            <input type="checkbox" onChange={event => updateOneState(event.target.checked, id)} checked={isFinished} />
                            <span onDoubleClick={handleEdit} className='todo'>{title}</span>
                        </Fragment> :
                        <input type="text" className='edit' onBlur={event => handleBlur(event, id)} ref={inputRef} />
                }

                <div className='delete' onClick={() => tdeleteTodo(id)} style={currentItem === id ? { display: 'block' } : { display: 'none' }}>X</div>
            </div>}
        </Fragment>
    )
}
export default connect(
    state => ({ todolist: state.todolist }),
    {
        updateTodolist
    }
)(ItemUI)
