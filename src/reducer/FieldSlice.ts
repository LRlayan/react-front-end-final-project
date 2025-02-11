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

export const updateField = createAsyncThunk(
    'field/updateField',
    async (field: FormData) => {
        try {
            const response = await api.put(`field/updateField/${field.get('code')}`, field, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return response.data;
        } catch (e) {
            console.error("Failed to update fields!", e);
            throw e;
        }
    }
);

export const deleteField = createAsyncThunk(
    'field/deleteField',
    async (code: String) => {
        try {
            return await api.delete(`field/deleteField/${code}`);
        } catch (e) {
            console.log("Failed to delete field!",e);
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
           .addCase(updateField.fulfilled, (state, action) => {
               const formData = action.meta.arg;
               const code = formData.get("code");

               if (!code) {
                   console.error("Error: No code in FormData!");
               }
               const index = state.fields.findIndex(f => f.code === code);
               if (index !== -1) {
                   state.fields[index] = action.payload;
               }
           })
           .addCase(updateField.pending, () => {
               console.error("Pending update field");
           })
           .addCase(updateField.rejected, () => {
               console.error("Rejected update field");
           })
           .addCase(deleteField.fulfilled, (state, action) => {
               state.fields = state.fields.filter(f => f.code !== action.meta.arg);
           })
           .addCase(deleteField.pending, () => {
               console.error("Pending delete error");
           })
           .addCase(deleteField.rejected, () => {
               console.error("Rejected delete error");
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