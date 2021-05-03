import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect} from 'react'
import axios from  'axios';

function App() {
  const [inputTask, setInputTask] = useState('')
  const [allTask, setAllTask] = useState([])
  const [activeTask, setActiveTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const url = 'http://127.0.0.1:8000/';
  
  // Recuperation de toutes les taches depuis le serveur
  const getAllTask = () => {
    setLoading(true)
    axios.get(url+'todo/list/')
      .then(res => {
        setAllTask( res.data)
        console.log(allTask);
        setLoading(false)
      })  
      .catch(err => {
        setError(err)
        console.error(err)
        setLoading(false)
      } )
  }
  
  const handleChange = e => {
    setInputTask(e.target.value)
    console.log(inputTask);
  }

  const addTask = () => {
    if (activeTask.title === null){
      axios.post(url+'todo/add/', {
        'title': inputTask,
        'status': false
      }).then(res => {
        getAllTask()
        setInputTask('')
      }).catch(err => {
        setError(err)
      })
    }else{
      axios.put(url+`todo/${activeTask.id}/update/`, {
        'title': inputTask,
        'status': activeTask.status
      }).then(res => {
        getAllTask()
        setInputTask('')
      }).catch(err => {
        setError(err)
      })
      setActiveTask(null)
    }
  }

  const editTask = task => {
    setInputTask(task.title)
    setActiveTask(task)
  }

  const toggleStatus = task => {
    axios.put(url+`todo/${task.id}/update/`, {
      'title': task.title,
      'status': !task.status
    }).then(res => {
      getAllTask()
      setInputTask('')
    }).catch(err => {
      setError(err)
    })
  } 

  const deleteTask = task => {
    axios.delete(url+ `todo/${task.id}/delete/`)
    .then(res => {
      getAllTask()
      setInputTask('')
    }).catch(err => {
      setError(err)
    })
    
  }


  useEffect(() => {
    getAllTask()
    
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Django React Todo App
        </p>
      </header>
      <main>
        <div className="input-btn">
          <input 
            type="text"  
            value={inputTask}  
            onChange={e => handleChange(e)} 
          />
          <button 
            disabled={!inputTask.trim()} 
            onClick={addTask} > Ajouter  </button>
        </div>
        <ul>
            {
              loading 
                ? 
                  <h4>Loading ...</h4>
                : error 
                  ? <h3>Network error</h3>
                  : allTask.length > 0 
                    ? allTask.map(item => (
                      <div className="task-list">
                        <div className="chec-li">
                          <input 
                            type="checkbox"  
                            onChange={e => {toggleStatus(item)}} 
                            checked={item.status ?? true}
                          /> 
                          <li> 
                            {item.status 
                              ? 
                                <strike> {item.title}</strike>
                              : item.title
                            }  
                            </li>
                        </div>
                        <span>
                          <button 
                            onClick={e => {editTask(item)}}
                            className="edit"
                          >Edit
                          </button>

                          <button onClick={e => {
                            deleteTask(item)
                          }}  className="del">del</button>
                        </span>
                      </div>) )
                    : <h3>Vous n'avez aucune tâche </h3>
            }
        </ul>
      </main>
    </div>
  );
}

export default App;
