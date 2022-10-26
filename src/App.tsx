import React, { useState } from 'react'
import { Todo } from './Types'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState<Todo[]>([]) // からの配列に何が入るのか型定義、Todo以外入りませんよ

  // type Todo = {
  //   inputValue: string
  //   id: number
  //   checked: boolean
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // リロード回避

    // 新Todo、新しい方に合わせないとこの定数は使えないよ
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    }

    // 既存のtodosに入れていく
    setTodos([newTodo, ...todos])
    setInputValue('') // 作成後入力は初期化
  }

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue
      }
      return todo
    })

    setTodos(newTodos) // 左辺と右辺の方が違いますよ
  }

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked
      }
      return todo
    })

    setTodos(newTodos) // 左辺と右辺の方が違いますよ
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id) // trueのものだけ残す
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
            value={inputValue}
          />
          <input type="submit" value={'作成'} className="submitButton" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                value={todo.inputValue}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={(e) => handleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
