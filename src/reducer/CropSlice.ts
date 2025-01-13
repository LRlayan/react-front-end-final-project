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
        },
        updateCrop:(state,action)=>{
            // @ts-ignore
            const index = state.crops.findIndex(c => c.code === action.payload.code);
            if (index !== -1) {
                state.crops[index] = action.payload;
            }
        }
    }
});

export const{addCrop,updateCrop} = CropSlice.actions;
export default CropSlice.reducer;

