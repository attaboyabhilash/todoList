import React, { useState, useReducer, useEffect } from 'react';
import Todo from './Todo'
import '../App.css'

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo'
}

function reducer(todos, action){
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo => {
        if(todo.id === action.payload.id){
          toggleTodo(todo.complete)  
          return {...todo, complete: !todo.complete }
        }
        return todo
      })
    case ACTIONS.DELETE_TODO:
      const filterTodo = todos.filter(todo => todo.id !== action.payload.id)
      if(todos.id === action.payload.id){
        deleteTodo()
      }
      return filterTodo
    default:
      return [...todos]
  }
}

function newTodo(name){
    return {
        id: Date.now().toString().substr(0,11),
        name: name,
        complete: false
    }
}

function toggleTodo(complete){
    const todo = JSON.parse(localStorage.getItem('todos'))
    todo.complete = !complete
    localStorage.setItem('todos', JSON.stringify(todo))
}

function deleteTodo(){
    localStorage.removeItem('todos')
}


function Todos() { 

  const [todos, dispatch] = useReducer(reducer, [], () => {
      const localData = localStorage.getItem('todos')
      return localData ? JSON.parse(localData) : []
  })
  const [name, setName] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e){
    e.preventDefault()
    if(name!==''){
        dispatch({ type: ACTIONS.ADD_TODO, payload: {name: name} })
    }
    setName('')
  }

  return (
    <div>
      <form className="adder" onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a todo item..." value={name} onChange={e => setName(e.target.value)} />
        <input type="submit" id="btnSubmit" value="Add Todo"/>
      </form>
      {todos.map(todo => {
          return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
        })}
    </div>
  );
}

export default Todos
