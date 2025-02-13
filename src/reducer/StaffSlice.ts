import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Log} from "../model/Log.ts";
import {Field} from "../model/Field.ts";
import {Vehicle} from "../model/Vehicle.ts";
import {Equipment} from "../model/Equipment.ts";
import {Staff} from "../model/Staff.ts";
import {api} from "../api/api.ts";

const initialState: { staffs: Staff[] } = {
    staffs:[]
}

export type StaffRootState = {
    staff: {
        staffs: Array<{
            code: string;
            firstName: string;
            lastName: string;
            joinedDate: string;
            designation:string;
            gender:string;
            dob:string;
            addressLine01:string;
            addressLine02:string;
            addressLine03:string;
            addressLine04:string;
            addressLine05:string;
            mobile:string;
            email:string;
            role:string;
            assignLog: Log[];
            assignFields: Field[];
            assignVehicles: Vehicle[];
            assignEquipments: Equipment[];
        }>;
    };
};

export const saveStaff = createAsyncThunk(
    'staff/saveStaff',
    async (staff : Staff, { dispatch }) => {
        try {
            const response = await api.post("staff/saveStaff", staff);
            dispatch(getAllStaff());
            return response.data;
        } catch (e) {
            console.error("Failed to save staffs!", e);
            throw e;
        }
    }
);

export const updateStaff = createAsyncThunk(
    'staff/updateStaff',
    async (staff: Staff, { dispatch }) => {
        try {
            const response = await api.put(`staff/updateStaff/${staff.code}`, staff);
            dispatch(getAllStaff());
            return response.data;
        } catch (e) {
            console.error("Failed to update staff!", e);
            throw e;
        }
    }
);

export const deleteStaff = createAsyncThunk(
    'staff/deleteStaff',
    async (code: string) => {
        try {
            const response = await api.delete(`staff/deleteStaff/${code}`);
            return response.data;
        } catch (e) {
            console.error("Failed to delete staff!", e);
            throw e;
        }
    }
);

export const getAllStaff = createAsyncThunk(
    'staff/getAllStaff',
    async () => {
        try {
            const response = await api.get("staff/getAllStaff");
            return response.data;
        } catch (e) {
            console.log("Failed to get all staff!",e);
            throw e;
        }
    }
);

const StaffSlice = createSlice({
    name:"staff",
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(saveStaff.fulfilled, (state,action) => {
                if (action.payload) {
                    state.staffs = [...state.staffs ,action.payload]
                }
            })
            .addCase(saveStaff.pending, () => {
                console.error("Pending save staffs");
            })
            .addCase(saveStaff.rejected, () => {
                console.error("Rejected save staffs")
            })
            .addCase(updateStaff.fulfilled, (state, action) => {
                const updatedStaff = action.payload;
                const index = state.staffs.findIndex(staff => staff.code === updatedStaff.code);

                if (index !== -1) {
                    state.staffs[index] = updatedStaff;
                }
            })
            .addCase(updateStaff.pending, () => {
                console.error("Pending update staff");
            })
            .addCase(updateStaff.rejected, () => {
                console.error("Rejected update staff");
            })
            .addCase(deleteStaff.fulfilled, (state, action) => {
                state.staffs = state.staffs.filter(s => s.code !== action.meta.arg);
            })
            .addCase(deleteStaff.pending, () => {
                console.error("Pending get all staff");
            })
            .addCase(deleteStaff.rejected, () => {
                console.error("Rejected get all staff");
            })
            .addCase(getAllStaff.fulfilled, (state, action) => {
                state.staffs = action.payload || [];
            })
            .addCase(getAllStaff.pending, () => {
                console.error("Pending get all staff");
            })
            .addCase(getAllStaff.rejected, () => {
                console.error("Rejected get all staff");
            })
    }
})

export default StaffSlice.reducer;