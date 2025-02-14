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
    async (equipment: Equipment) => {
        try {
            const response = await api.post("equipment/saveEquipment", equipment);
            return response.data;
        } catch (e) {
            console.error("Failed to save equipment!", e);
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
    }
});

export default EquipmentSlice.reducer