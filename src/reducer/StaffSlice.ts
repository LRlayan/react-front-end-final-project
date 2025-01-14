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
        }
    }
})

export const {addStaff} = StaffSlice.actions;
export default StaffSlice.reducer;