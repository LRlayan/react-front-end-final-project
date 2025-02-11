import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Crop} from "../model/Crop.ts";
import {Log} from "../model/Log.ts";
import {Staff} from "../model/Staff.ts";
import {Equipment} from "../model/Equipment.ts";
import {api} from "../api/api.ts";
import {Field} from "../model/Field.ts";

const initialState: { fields: Field[] } = {
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
            assignEquipments: Equipment[];
        }>;
    };
};

export const saveField = createAsyncThunk(
    'field/saveField',
    async (field : FormData) => {
        try {
            const response = await api.post("field/saveField", field, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data;
        } catch (e) {
            console.error("Failed to save fields!", e);
            throw e;
        }
    }
);

export const getAllFields = createAsyncThunk(
    'field/getAllFields',
    async () => {
        try {
            const response = await api.get('field/getALlField');
            return response.data;
        } catch (e) {
            console.log("Failed to get all field!",e);
            throw e;
        }
    }
);

const FieldSlice = createSlice({
   name:"field",
   initialState,
   reducers:{},
   extraReducers: (builder) => {
       builder
           .addCase(saveField.fulfilled,(state, action) => {
                if (action.payload) {
                    state.fields = [...state.fields, action.payload];
                }
           })
           .addCase(saveField.pending, () => {
               console.error("Pending save fields");
           })
           .addCase(saveField.rejected, () => {
               console.log("Rejected save fields");
           })
           .addCase(getAllFields.fulfilled, (state, action) => {
               state.fields = action.payload || [];
           })
           .addCase(getAllFields.pending, () => {
               console.error("pending get all crops");
           })
           .addCase(getAllFields.rejected, () => {
               console.error("rejected get all crops");
           })
   }
});

export default FieldSlice.reducer;