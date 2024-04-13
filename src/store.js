import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./Store/todo-slice";
export const store=configureStore({
    reducer:{
        todo:todoSlice.reducer,
    },
});