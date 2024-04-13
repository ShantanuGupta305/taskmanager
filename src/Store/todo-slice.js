import { createSlice } from "@reduxjs/toolkit";
const getLocalData=()=>{
    const todosList=localStorage.getItem("myTasks");
    if(todosList){
      return JSON.parse(todosList);
    }
    else{
      return [];
    }
}
const initialState={
    tasks:getLocalData(),
};
const todoSlice=createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTask:(state,action)=>{
            const ntask={
                id:new Date().getTime().toString(),
                task:action.payload.task,
                date:action.payload.date,
            };
            state.tasks.push(ntask);
            localStorage.setItem("myTasks",JSON.stringify(state.tasks));
        },
        removeTask:(state,action)=>{
            state.tasks=state.tasks.filter(task=>task.id!==action.payload);
            localStorage.setItem("myTasks",JSON.stringify(state.tasks));
        },
        clearTasks:(state)=>{
            state.tasks=[];
            localStorage.setItem("myTasks",JSON.stringify(state.tasks));
        },
        updateTask:(state,action)=>{
            state.tasks=state.tasks.map((tsk)=>{
                if(tsk.id===action.payload.isUpdate){
                    tsk={
                        ...tsk,
                        task:action.payload.task,
                        date:action.payload.date,
                    };
                }
                return tsk;
            });
            localStorage.setItem("myTasks",JSON.stringify(state.tasks));
        },
        sortByDate:(state,action)=>{
            state.tasks=state.tasks.sort((a,b)=>new Date(a[action.payload])-new Date(b[action.payload]));
            localStorage.setItem("myTasks",JSON.stringify(state.tasks));
        },
        sortByEntry:(state,action)=>{
            state.tasks=state.tasks.sort((a,b)=>a[action.payload]-b[action.payload]);
            localStorage.setItem("myTasks",JSON.stringify(state.tasks));
        },
    },
});
export default todoSlice;
export const todoAction=todoSlice.actions;