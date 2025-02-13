import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Crop} from "../model/Crop.ts";
import {Staff} from "../model/Staff.ts";
import {Field} from "../model/Field.ts";
import {api} from "../api/api.ts";
import {Log} from "../model/Log.ts";

const initialState: { logs: Log[] } = {
    logs:[]
}

export type LogRootState = {
    log: {
        logs: Array<{
            code: string;
            name: string;
            logDate: string;
            logDetails: string;
            image: File | null;
            assignCrops: Crop[];
            assignFields: Field[];
            assignStaff: Staff[];
        }>;
    };
};

export const saveLog = createAsyncThunk(
    'log/saveLog',
    async (log: FormData, { dispatch })=> {
        try {
            const response = await api.post('log/saveLog', log, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            dispatch(getAllLogs());
            return response.data;
        } catch (e) {
            console.error("Failed to save logs!", e);
            throw e;
        }
    }
);

export const getAllLogs = createAsyncThunk(
    'logs/getAllLogs',
    async () => {
        try {
            const response = await api.get('log/getAllLogs');
            return response.data;
        } catch (e) {
            console.log("Failed to get all logs!",e);
            throw e;
        }
    }
);

const LogSlice = createSlice({
    name:"log",
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(saveLog.fulfilled, (state, action) => {
                if (action.payload) {
                    state.logs = [...state.logs, action.payload];
                }
            })
            .addCase(saveLog.pending, () => {
                console.error("Pending save logs");
            })
            .addCase(saveLog.rejected, () => {
                console.error("Rejected save logs")
            })
            .addCase(getAllLogs.fulfilled, (state, action) => {
                state.logs = action.payload || [];
            })
            .addCase(getAllLogs.pending, () => {
                console.error("Pending get all logs");
            })
            .addCase(getAllLogs.rejected, () => {
                console.error("Rejected get all logs")
            })
    }
});

export default LogSlice.reducer;