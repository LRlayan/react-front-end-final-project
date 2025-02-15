import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Staff} from "../model/Staff.ts";
import {Vehicle} from "../model/Vehicle.ts";
import {api} from "../api/api.ts";

const initialState: { vehicles: Vehicle[] } = {
    vehicles:[]
}

export type VehicleRootState = {
    vehicle: {
        vehicles: Array<{
           code: string;
           licensePlateNumber: string;
           vehicleName: string;
           category: string;
           fuelType: string;
           status: string;
           remark: string;
           assignStaffMember: Staff;
        }>
    }
};

export const saveVehicle = createAsyncThunk(
    'vehicle/saveVehicle',
    async (vehicle: Vehicle) => {
        try {
            const response = await api.post("vehicle/saveVehicle", vehicle);
            return response.data;
        } catch (e) {
            console.error("Failed to save vehicle!", e);
            throw e;
        }
    }
);

const VehicleSlice = createSlice({
    name:"vehicle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveVehicle.fulfilled, (state, action) => {
                state.vehicles = [...state.vehicles, action.payload];
            })
            .addCase(saveVehicle.pending, () => {
                console.error("Pending save vehicle");
            })
            .addCase(saveVehicle.rejected, () => {
                console.error("Rejected save vehicle");
            })
    }
});

export default VehicleSlice.reducer;