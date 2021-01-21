import React from 'react'
import { connect } from 'react-redux'
import Item from './Item'
const MainUI = props => {
    return (
        <div className='listBox'>    
            {
                props.todolist.map(item => {
                    return (
                        <Item key={item.id} {...item} />
                    )
                })
            }
        </div>
    )
}
export default connect(
    state => ({todolist: state.todolist})
)(MainUI)
