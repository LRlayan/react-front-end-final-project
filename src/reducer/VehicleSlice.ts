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
            assignStaff: Staff[];
        }>
    }
};

export const saveVehicle = createAsyncThunk(
    'vehicle/saveVehicle',
    async (vehicle: Vehicle, { dispatch }) => {
        try {
            const response = await api.post("vehicle/saveVehicle", vehicle);
            dispatch(getAllVehicle());
            return response.data;
        } catch (e) {
            console.error("Failed to save vehicle!", e);
            throw e;
        }
    }
);

export const updateVehicle = createAsyncThunk(
    'vehicle/updateVehicle',
    async (vehicle: Vehicle, { dispatch }) => {
        try {
             const response = await api.put(`vehicle/updateVehicle/${vehicle.code}`, vehicle);
             dispatch(getAllVehicle());
             return response.data;
        } catch (e) {
            console.log("Failed to get all vehicle!",e);
            throw e;
        }
    }
);

export const deleteVehicle = createAsyncThunk(
    'vehicle/deleteVehicle',
    async (code: string) => {
        try {
            const response = await api.delete(`vehicle/deleteVehicle/${code}`);
            return response.data;
        } catch (e) {

        }
    }
);

export const getAllVehicle = createAsyncThunk(
    'vehicle/getAllVehicle',
    async () => {
        try {
            const response = await api.get("vehicle/getAllVehicle");
            return response.data;
        } catch (e) {
            console.log("Failed to get all staff!",e);
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
                if (action.payload) {
                    state.vehicles = [...state.vehicles, action.payload];
                }
            })
            .addCase(saveVehicle.pending, () => {
                console.error("Pending save vehicle");
            })
            .addCase(saveVehicle.rejected, () => {
                console.error("Rejected save vehicle");
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const updatedVehicle = action.payload;
                const index = state.vehicles.findIndex((vehicle) => vehicle.code === updatedVehicle.code);
                if (index !== -1) {
                    state.vehicles[index] = action.payload;
                }
            })
            .addCase(updateVehicle.pending, () => {
                console.error("Pending update vehicles");
            })
            .addCase(updateVehicle.rejected, () => {
                console.error("Rejected update vehicles");
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.vehicles = state.vehicles.filter((vehicle) => vehicle.code !== action.meta.arg);
            })
            .addCase(deleteVehicle.pending, () => {
                console.error("Pending delete vehicle");
            })
            .addCase(deleteVehicle.rejected, () => {
                console.error("Rejected delete vehicle");
            })
            .addCase(getAllVehicle.fulfilled, (state, action) => {
                state.vehicles = action.payload || [];
            })
            .addCase(getAllVehicle.pending, () => {
                console.error("Pending get all vehicle");
            })
            .addCase(getAllVehicle.rejected, () => {
                console.error("Rejected get all vehicle");
            })
    }
});

export default VehicleSlice.reducer;