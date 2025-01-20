import {createSlice} from "@reduxjs/toolkit";
import {Crop} from "../model/Crop.ts";
import {Log} from "../model/Log.ts";
import {Staff} from "../model/Staff.ts";

const initialState = {
    fields:[]
}

export type FieldRootState = {
    field: {
        fields: Array<{
            code: string;
            name: string;
            location: string;
            extentSize: string;
            image: File | null;
            assignCrops: Crop[];
            assignLogs: Log[];
            assignStaffMembers: Staff[];
        }>;
    };
};

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
       deleteField:(state,action) => {
           //@ts-ignore
           state.fields = state.fields.filter(f => f.code !== action.payload.code);
       }
   }
});

export const {addField,updateField,deleteField} = FieldSlice.actions;
export default FieldSlice.reducer;