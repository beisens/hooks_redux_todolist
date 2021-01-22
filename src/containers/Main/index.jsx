import React from 'react'
import { useSelector } from 'react-redux'
import Item from './Item'
const Main = () => {
    const {todolist} = useSelector(state => ({todolist: state.todolist}))
    return (
        <div className='listBox'>    
            {
                todolist.map(item => {
                    return (
                        <Item key={item.id} {...item} />
                    )
                })
            }
        </div>
    )
}
export default Main
