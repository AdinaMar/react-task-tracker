import React from 'react'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

const Rendered = ({tasks, showAdd, onAdd, onDelete, onToggle}) => {
  return (
    <div>


{showAdd && 
<AddTask onAdd={onAdd}/>
}
{tasks.length > 0 ? <Tasks tasks={tasks} onDelete={onDelete} onToggle={onToggle} /> : "No tasks" }



    </div>
  )
}

export default Rendered