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
        updateLog:(state,action) => {
            const index = state.logs.findIndex(l => l.code === action.payload.code);
            if (index !== -1) {
                state.logs[index] = action.payload;
            }
        },
    }
})

export const {addLog,updateLog} = LogSlice.actions;
export default LogSlice.reducer;