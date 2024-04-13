import React,{useState,useEffect} from 'react';
import Tasks from './Components/Tasks';
import { useSelector,useDispatch } from 'react-redux';
import { todoAction } from './Store/todo-slice';
const today = new Date().toISOString().split('T')[0];
const App = () => {
  const [show,setShow]=useState(false);
  const [task,setTask]=useState("");
  const [isUpdate,setIsUpdate]=useState(null);
  const [date,setDate]=useState(today);
  const dispatch=useDispatch();
  const {tasks}=useSelector(state=>state.todo);
  const {addTask,removeTask,clearTasks,updateTask,sortByDate,sortByEntry}=todoAction;
  const submitHandler=(e)=>{
    e.preventDefault();
    if(isUpdate===null){
      dispatch(addTask({task,date}));
      setDate(today);
      setTask("");
      setShow(true);
    }
    else{
      dispatch(updateTask({isUpdate,task,date}));
      setDate(today);
      setTask("");
      setIsUpdate(null);
      setShow(true);
    }
  }
  const clearAll=(e)=>{
    e.preventDefault();
    dispatch(clearTasks());
    setShow(false);
  }
  const del=(id)=>{
    dispatch(removeTask(id));
    if(tasks.length===0){
      setShow(false);
    }
  }
  const update=(id)=>{
    setIsUpdate(id);
    tasks.find((task)=>{
      if(id===task.id){
        setTask(task.task);
        setDate(task.date);
        return task;
      }
    });
  }
  const sortBy=(param)=>{
    if(param==="date"){
      dispatch(sortByDate(param));
    }
    else if(param==="id"){
      dispatch(sortByEntry(param));
    }
  }
  useEffect(()=>{
    if(tasks.length!==0){
      sortBy("id");
    }
  },[]);
  return (
    <>
      <div className='main'>
        <form onSubmit={submitHandler}>
          <div className='form-area'>
            <label>Task:<br/></label>
            <input type='text' className='input' placeholder='Enter Task' onChange={(e)=>setTask(e.target.value)} value={task} required/>
            <labe><br/>Date:<br/></labe>
            <input type='date' className='date' min={today} onChange={(e)=>setDate(e.target.value)} value={date} required/>
            <br/><br/>
            <button type='submit'>{(!isUpdate)?<>Submit</>:<>Update</>}</button>
            <br/><br/>
          </div>
        </form>
        <button onClick={()=>{
            if(show) setShow(false);
            else setShow(true);
          }}>
            {show && (
              "Hide"
            )}
            {!show && (
              "Show"
            )}
        </button>
        {show && (
        <p>
          Tasks:{tasks.length===0 && (<>No task entered.</>)}
        </p>
      )}
      {show && (
        tasks.map((t)=>{
          return (
            <Tasks key={t.id} t={t} del={del} update={update}/>
          );
        })
      )}
      {show && tasks.length!==0 &&(
        <div className='function-buttons'>
          <button onClick={clearAll}>Clear</button>
          <button onClick={()=>sortBy("date")}>Sort By Deadline</button>
          <button onClick={()=>sortBy("id")}>Sort By Entry</button>
        </div>
      )}
      </div>
    </>
  )
}

export default App;