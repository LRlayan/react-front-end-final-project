import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Crop } from "../model/Crop.ts";
import { api } from "../api/api.ts";
import {Log} from "../model/Log.ts";
import {Field} from "../model/Field.ts";

const initialState: { crops: Crop[] } = {
    crops: []
};

export type CropRootState = {
    crop: {
        crops: Array<{
            code: string;
            name: string;
            scientificName: string;
            category: string;
            season: string;
            image: File | null;
            assignFields: Field[];
            assignLogs: Log[];
        }>;
    };
};

export const saveCrop = createAsyncThunk(
    "crop/saveCrop",
    async (crop: FormData) => {
        try {
            const response = await api.post("crop/saveCrop", crop,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data;
        } catch (e) {
            console.error("Failed to save crops!", e);
            throw e;
        }
    }
);

export const updateCrop = createAsyncThunk(
    'crop/updateCrop',
    async (crop: Crop)=> {
        try {
            const response = await api.put(`updateCrop/${crop.code}`, crop);
            return response.data;
        } catch (e) {
            console.error("Failed to update crops!", e);
            throw e;
        }
    }
);

export const deleteCrop = createAsyncThunk(
    'crop/deleteCrop',
    async ( code: String ) => {
        try {
            return await api.delete(`deleteCrop/${code}`);
        } catch (e) {
            console.log("Failed to delete crop!",e);
            throw e;
        }
    }
);

const CropSlice = createSlice({
    name: "crop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveCrop.fulfilled, (state, action) => {
                state.crops.push(action.payload);
            })
            .addCase(saveCrop.pending, () => {
                console.log("Pending saving crops");
            })
            .addCase(saveCrop.rejected, () => {
                console.log("Rejected saving crops");
            })
            .addCase(updateCrop.fulfilled, (state, action) => {
                const index = state.crops.findIndex(c => c.code === action.payload.code);
                if (index !== -1) {
                    state.crops[index] = { ...state.crops[index], ...action.payload };
                }
            })
            .addCase(updateCrop.pending, () => {
                console.log("Pending updating crop");
            })
            .addCase(updateCrop.rejected, () => {
                console.log("Rejected updating crop");
            })
            .addCase(deleteCrop.fulfilled, (state,action) => {
                state.crops = state.crops.filter(c => c.code !== action.meta.arg);
            })
            .addCase(deleteCrop.pending, ()=> {
                console.log("Pending to delete Customer !");
            })
            .addCase(deleteCrop.rejected, () => {
                console.log("Rejected to delete customer");
            })
    },
});

export default CropSlice.reducer;
