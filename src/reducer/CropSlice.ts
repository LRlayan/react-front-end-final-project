import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Crop } from "../model/Crop.ts";
import { api } from "../api/api.ts";
import {Log} from "../model/Log.ts";
import {Field} from "../model/Field.ts";

const initialState: { crops: Crop[]} = {
    crops: [],
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
    async (crop: FormData, { dispatch }) => {
        try {
            const response = await api.post("crop/saveCrop", crop,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            dispatch(getAllCrops());
            return response.data;
        } catch (e) {
            console.error("Failed to save crops!", e);
            throw e;
        }
    }
);

export const updateCrop = createAsyncThunk(
    'crop/updateCrop',
    async (crop: FormData, { dispatch })=> {
        try {
            const response = await api.put(`crop/updateCrop/${crop.get("code")}`, crop, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            dispatch(getAllCrops());
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
            return await api.delete(`crop/deleteCrop/${code}`);
        } catch (e) {
            console.log("Failed to delete crop!",e);
            throw e;
        }
    }
);

export const getAllCrops= createAsyncThunk(
    'crop/getALlCrops',
    async () => {
        try {
            const response = await api.get("crop/getAllCrop");
            return response.data;
        } catch (e) {
            console.log("Failed to get all crop!",e);
            throw e;
        }
    }
)

const CropSlice = createSlice({
    name: "crop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveCrop.pending, () => {
                console.error("Pending save crop")
            })
            .addCase(saveCrop.fulfilled, (state, action) => {
                if (action.payload) {
                    state.crops = [...state.crops, action.payload];
                }
            })
            .addCase(saveCrop.rejected, () => {
                console.error("Rejected save crop")
            })
            .addCase(updateCrop.fulfilled, (state, action) => {
                const formData = action.meta.arg;
                const code = formData.get("code");

                if (!code) {
                    console.error("Error: No code in FormData!");
                    return;
                }
                const index = state.crops.findIndex(c => c.code === code);
                if (index !== -1) {
                    state.crops[index] = action.payload;
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
            .addCase(getAllCrops.fulfilled, (state, action) => {
                state.crops = action.payload || [];
            })
            .addCase(getAllCrops.pending, () => {
                console.log("pending get all crops");
            })
            .addCase(getAllCrops.rejected, () => {
                console.log("rejected get all crops");
            })
    },
});

export default CropSlice.reducer;
