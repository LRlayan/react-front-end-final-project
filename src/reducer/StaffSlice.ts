import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    staffs:[]
}

const StaffSlice = createSlice({
    name:"staff",
    initialState:initialState,
    reducers:{
        addStaff:(state,action)=>{
            state.staffs.push(action.payload);
        },
        updateStaff:(state,action)=>{
            //@ts-ignore
            const index = state.staffs.findIndex(s => s.code === action.payload.code);
            if (index !== -1) {
                state.staffs[index] = action.payload;
            }
        },
    }
})

export const {addStaff,updateStaff} = StaffSlice.actions;
export default StaffSlice.reducer;