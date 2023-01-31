import React,{useState} from 'react'
import SingleToDo from './SingleToDo'


function ToDo() {
    const [task,setTask] = useState([])
    const [todo,setTodo] = useState("")

    // if(localStorage.getItem("task")){
    //     setTask(JSON.parse(localStorage.getItem("task")))
    // }

    const handleToDo = (e)=>{
        setTodo(e.target.value)
    }

    const handleSubmit= (e)=>{
        e.preventDefault()
        setTodo("")
        let tempList = task;
        tempList.push(todo)
        setTask(tempList)
        localStorage.setItem("task",JSON.stringify(task))
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="todo" id="todo" value={todo} onChange={handleToDo}/>
            <button style={{marginLeft:"10px"}} type="submit">Add</button>
        </form>
        {task.map((t,i)=>{
            return <SingleToDo key={i} todo={t}/>
        })}
    </div>
  )
}

export default ToDo