import React, {useEffect, useState} from 'react';
import axios from 'axios';


import logo from './logo.svg';
import './App.css';

function App() {
  const url = 'http://127.0.0.1:8000/';
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [inputTask, setInputTask] = useState('');
  const [activeTask, setActiveTask] = useState(null)

  const getAllTask = () => {
    setIsLoading(true)
    axios.get(url + 'todo/list/')
      .then(res => {
        setTasks(res.data)
        console.log(res.data)
        setIsLoading(false)
      })
      .catch( err => {
        console.error(err);
        setIsLoading(false)
      })
  }  

  const  handleChange = (e) => {
    setInputTask(e.target.value)
    // console.log(inputTask)
  }

  const  addTask = () => {
    // setIsLoading(true)
    if(activeTask === null){
      axios.post(url+'todo/add/',{
        'title': inputTask,
        'status': false
      }).then(res => {
        setInputTask('')
        getAllTask()                                                                                                                                                                                    
        setActiveTask(null)
      }).then(err =>{
        console.error(err)
      })
   }else{
      axios.put(url+`todo/${activeTask.id}/update/`,{
        'title': inputTask,
        'status': activeTask.status
      }).then(res => {
        setInputTask('')
        getAllTask()
        setActiveTask(null)
      }).then(err =>{
        console.error(err)
      })
  }

    // setIsLoading(false)
  }

  const deleleTask = task => {
    axios.delete(url+`todo/${task.id}/delete/`)
      .then(res => {
        getAllTask()
      })
      .catch( err => {
        console.error(err)
      })
  }

  const toggleStatus = task => {
    axios.put(url+`todo/${task.id}/update/`,{
      'title': task.title,
      'status': !task.status
    }).then(res => {
      setInputTask('')
      getAllTask()
    }).then(err =>{
      console.error(err)
    })
  }

  const updateTask = task => {
    setActiveTask(task)
    setInputTask(task.title)
  }
    
  useEffect(() => {
    getAllTask()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Django React Todo APP
        </p>
      </header>
      <div className="main">
        <div className="input-task">
          <input 
            type="text" 
            placeholder="Ajouter une tâche" 
            value={inputTask} 
            onChange={e => handleChange(e)}
          />
          <button onClick={addTask} disabled={!inputTask.trim()} > Ajouter</button>
        </div>
        <ul>
          {
            isLoading === true
              ? <h4> Is loading ...</h4>
            
              : tasks.map( task => {
                return  ( 
                  <div className="task-list" key={task.id}>
                    <input 
                      type="checkbox" 
                      onChange={e => { toggleStatus(task)}} 
                      checked={task.status ?? true}
                    />
                    <li onClick={e => updateTask(task)} >
                      {
                        task.status ? 
                        <strike>{task.title}</strike>
                        : task.title
                      }
                    </li>
                    <div className="button">
                      <button onClick={e => updateTask(task)} className="edit">Edit</button>
                      <button className="del" onClick={e=> {
                        deleleTask(task)
                      }}>X</button>
                    </div>
                  </div>
                )
            })
          }         

        </ul>
      </div>
    </div>
  );
}

export default App;
