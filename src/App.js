import React, {useEffect} from "react";
import Loader from "./Todo/Loader";
import TodoList from "./Todo/TodoList";
import Context from "./Todo/context";
import AddTodos from "./Todo/AddTodos";


function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(()=>{
          setTodos(todos)
          setLoading(false)
        },2000)
      })
  },[])

  
  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    })
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodos(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={{removeTodo}}>
      <div className="wrapper">
        <h1 className="titleRoot">Todo for You!!!</h1>
        <AddTodos onCreate={addTodos}/>
        {loading && <Loader/>}
        {todos.length ? 
        <TodoList todos={todos} onToggle={toggleTodo}/> : (loading ? null : <p className="noTodos">No todos!</p>)}
        
      </div>
    </Context.Provider>
  );
}

export default App;
