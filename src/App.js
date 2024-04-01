import React,{useState,useEffect} from 'react';
import Tasks from './Components/Tasks';
const today = new Date().toISOString().split('T')[0];
const getLocalData=()=>{
  const todosList=localStorage.getItem("myTasks");
  if(todosList){
    return JSON.parse(todosList);
  }
  else{
    return [];
  }
}
const App = () => {
  const [show,setShow]=useState(false);
  const [task,setTask]=useState("");
  const [taskList,setTaskList]=useState(getLocalData());
  const [isUpdate,setIsUpdate]=useState(null);
  const [date,setDate]=useState(today);
  const submitHandler=(e)=>{
    e.preventDefault();
    if(isUpdate===null){
      let id=new Date().getTime().toString();
      setTaskList([...taskList,{id:id,task:task,date:date}]);
      setDate(today);
      setTask("");
      setShow(true);
    }
    else{
      let newList=taskList.map((tasks)=>{
        if(tasks.id===isUpdate){
          let newtask={...tasks,task:task,date:date};
          tasks=newtask;
        }
        return tasks;
      });
      setTaskList(newList);
      setDate(today);
      setTask("");
      setIsUpdate(null);
      setShow(true);
    }
  }
  const clearAll=(e)=>{
    e.preventDefault();
    setTaskList([]);
    setShow(false);
  }
  const del=(id)=>{
    let newList=taskList.filter((tasks)=>{return tasks.id!==id});
    setTaskList(newList);
    if(newList.length===0){
      setShow(false);
    }
  }
  const update=(id)=>{
    setIsUpdate(id);
    taskList.find((tasks)=>{
      if(id===tasks.id){
        setTask(tasks.task);
        setDate(tasks.date);
        return tasks;
      }
    });
  }
  const sortBy=(param)=>{
    let sortedList=[];
    if(param==="date"){
      sortedList=[...taskList].sort((a,b)=>new Date(a[param])-new Date(b[param]));
    }
    else if(param==="id"){
      sortedList=[...taskList].sort((a,b)=>a[param]-b[param]);
    }
    setTaskList(sortedList);
  }
  useEffect(()=>{
    if(taskList.length!==0) sortBy("id");
  },[]);
  useEffect(()=>{
    localStorage.setItem("myTasks",JSON.stringify(taskList));
  },[taskList]);
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
          Tasks:{taskList.length===0 && (<>No task entered.</>)}
        </p>
      )}
      {show && (
        taskList.map((tasks)=>{
          return (
            <Tasks key={tasks.id} tasks={tasks} del={del} update={update}/>
          );
        })
      )}
      {show && taskList.length!==0 &&(
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