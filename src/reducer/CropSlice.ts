import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    crops:[]
}

const CropSlice = createSlice({
    name:"crop",
    initialState:initialState,
    reducers:{
        addCrop:(state,action)=>{
            state.crops.push(action.payload);
        }
    }
});

export const{addCrop} = CropSlice.actions
export default CropSlice.reducer

