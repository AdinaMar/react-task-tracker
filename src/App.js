import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from 'react'
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import About from "./components/About";
import Rendered from "./Rendered";





function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const[tasks, setTasks] = useState( [])

  useEffect (() => {
   const getTasks = async () => {
     const tasksFromServer = await fetchTasks()
     setTasks(tasksFromServer)
   }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")
    const data = await res.json()

  return data
  }

 const addTask = async (task) => {

const res = await fetch( "http://localhost:5000/tasks", {
  method: "POST",
  headers: {
    "Content-type": "application/json"
  },
  body: JSON.stringify(task)
  
})

const data = await res.json()
setTasks([...tasks, data])
}

 {/*  const id = Math.floor(Math.random() * 10000) +1
   const newTask = {id, ...task}
   setTasks([...tasks, newTask]) */} 
 


 const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "DELETE",
  })
  setTasks(tasks.filter((task) => task.id !== id))
 }
 const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

return data
}

const toggleReminder = async (id) => {

const taskToToggle = await fetchTask(id)
const upTask = {...taskToToggle,
reminder: !taskToToggle.reminder }

const res = await fetch(`http://localhost:5000/tasks/${id}`, {
  method: "PUT",
  headers: {
    "Content-type":"application/json"
  },
  body: JSON.stringify(upTask)
})

const data =await res.json()

 setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))

}




  return (
    <BrowserRouter>
    <div className="container">
<Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>

<Routes>
  <Route exact path="/" element={<Rendered tasks={tasks} onAdd={addTask} onToggle={toggleReminder} onDelete={deleteTask} showAdd={showAddTask}/>} />
    
   
    
    

  <Route path="/about" element={<About />}/>
</Routes>
<Footer />

    </div>
    </BrowserRouter>
  );
}


export default App;
