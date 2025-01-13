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
        },
        deleteCrop:(state,action)=>{
            //@ts-ignore
            state.crops = state.crops.filter(c => c.code !== action.payload.code);
        }
    }
});

export const{addCrop,updateCrop,deleteCrop} = CropSlice.actions;
export default CropSlice.reducer;

