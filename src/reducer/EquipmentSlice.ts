import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Staff} from "../model/Staff.ts";
import {Field} from "../model/Field.ts";
import {Equipment} from "../model/Equipment.ts";
import {api} from "../api/api.ts";

const initialState: { equipments: Equipment[] } = {
    equipments:[]
}

export type EquipmentRootState = {
    equipment: {
        equipments: Array<{
            code:string;
            name:string;
            type:string;
            status:string;
            count:number;
            assignStaffMembers: Staff[];
            assignFields: Field[];
        }>
    }
}

export const saveEquipment = createAsyncThunk(
    'equipment/saveEquipment',
    async (equipment: Equipment, { dispatch }) => {
        try {
            const response = await api.post("equipment/saveEquipment", equipment);
            dispatch(getAllEquipment());
            return response.data;
        } catch (e) {
            console.error("Failed to save equipment!", e);
            throw e;
        }
    }
);

export const updateEquipment = createAsyncThunk(
    'equipment/updateEquipment',
    async (equipment: Equipment, { dispatch }) => {
        try {
            const response = await api.put(`equipment/updateEquipment/${equipment.code}`, equipment);
            dispatch(getAllEquipment());
            return response.data;
        } catch (e) {
            console.error("Failed to update equipment!", e);
            throw e;
        }
    }
);

export const getAllEquipment = createAsyncThunk(
    'equipment/getAllEquipment',
    async () => {
        try {
            const response = await api.get("equipment/getAllEquipment");
            return response.data;
        } catch (e) {
            console.log("Failed to get all equipment!",e);
            throw e;
        }
    }
);

const EquipmentSlice = createSlice({
    name:"equipment",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(saveEquipment.fulfilled, (state, action) => {
                if (action.payload) {
                    state.equipments = [...state.equipments, action.payload];
                }
            })
            .addCase(saveEquipment.pending, () => {
                console.error("Pending save equipment");
            })
            .addCase(saveEquipment.rejected, () => {
                console.error("Rejected save equipment");
            })
            .addCase(updateEquipment.fulfilled, (state, action) => {
                const updatedEquipment = action.payload;
                const index = state.equipments.findIndex((equ) => equ.code === updatedEquipment.code);
                if (index !== -1) {
                    state.equipments[index] = updatedEquipment;
                }
            })
            .addCase(updateEquipment.pending, () => {
                console.error("Pending update equipment");
            })
            .addCase(updateEquipment.rejected, () => {
                console.error("Rejected update equipment");
            }).addCase(getAllEquipment.fulfilled, (state, action) => {
            state.equipments = action.payload || [];
        })
            .addCase(getAllEquipment.pending, () => {
                console.error("Pending get all equipment");
            })
            .addCase(getAllEquipment.rejected, () => {
                console.error("Rejected get all equipment");
            })
    }
});

export default EquipmentSlice.reducer