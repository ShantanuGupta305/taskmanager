import React from 'react';

const Tasks = ({tasks,del,update}) => {
    const {id,task,date}=tasks;
  return (
    <div className='task-det'>
      <div className='task'>
        {task}.
      </div>
      <div className='deadline'>
        Deadline:{date}
      </div>      
      <div className='buttons'>
        <button onClick={()=>del(id)}>Delete</button>
        <button onClick={()=>update(id)}>Update</button>
      </div>
    </div>
  )
}

export default Tasks;