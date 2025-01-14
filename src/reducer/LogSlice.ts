import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    logs:[]
}

const LogSlice = createSlice({
    name:"log",
    initialState:initialState,
    reducers:{
        addLog:(state,action) => {
            state.logs.push(action.payload);
        },
    }
})

export const {addLog} = LogSlice.actions;
export default LogSlice.reducer;