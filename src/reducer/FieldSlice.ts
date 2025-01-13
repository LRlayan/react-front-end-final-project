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
       },
       updateField:(state,action) => {
           // @ts-ignore
           const index = state.fields.findIndex(f => f.code === action.payload.code);
           if (index !== -1) {
               state.fields[index] = action.payload;
           }
       },
   }
});

export const {addField} = FieldSlice.actions;
export default FieldSlice.reducer;