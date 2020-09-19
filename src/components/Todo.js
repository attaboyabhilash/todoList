import React from 'react'
import { ACTIONS } from './Todos'
import '../App.css'

export default function Todo({ todo, dispatch }) {
    
    return (
        <div className="todoList">
            <div className="checkPara">
                <input type = "checkbox" checked={todo.complete} onChange={() => 
                    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id} })}
                />
                <p style={{color: todo.complete ? '#AAA' : '#FFF'}}>{todo.name}</p>
            </div>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_TODO, payload: {id: todo.id} })}>X</button>
        </div>
    )
}
