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