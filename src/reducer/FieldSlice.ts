import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    fields:[]
}

const FieldSlice = createSlice({
   name:"field",
   initialState:initialState,
   reducers:{
       addField:(state,action) =>{
           state.fields.push(action.payload);
       }
   }
});

export const {addField} = FieldSlice.actions;
export default FieldSlice.reducer;