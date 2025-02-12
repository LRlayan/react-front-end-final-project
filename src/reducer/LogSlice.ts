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

export  const updateLog = createAsyncThunk(
    'log/updateLog',
    async (log : FormData, { dispatch }) => {
        try {
            const response = await api.put(`log/updateLog/${log.get("code")}`, log,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            dispatch(getAllLogs());
            return response.data;
        } catch (e) {
            console.error("Failed to update logs!", e);
            throw e;
        }
    }
);

export const deleteLog = createAsyncThunk(
    'log/deleteLog',
    async (code: string) => {
        try {
             return await api.delete(`log/deleteLog/${code}`);
        } catch (e) {
            console.log("Failed to delete log!",e);
            throw e;
        }
    }
);

export const getAllLogs = createAsyncThunk(
    'log/getAllLogs',
    async () => {
        try {
            const response = await api.get("log/getAllLog");
            return response.data;
        } catch (e) {
            console.log("Failed to get all logs!",e);
            throw e;
        }
    }
);

const LogSlice = createSlice({
    name:"log",
    initialState,
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
            .addCase(updateLog.fulfilled, (state,action) => {
                const formData = action.meta.arg;
                const code = formData.get("code");

                if (!code) {
                    console.error("Error: No code in FormData!");
                    return;
                }

                const index = state.logs.findIndex(l => l.code);
                if (index !== -1) {
                    state.logs[index] = action.payload;
                }
            })
            .addCase(updateLog.pending, () => {
                console.error("Pending update logs");
            })
            .addCase(updateLog.rejected, () => {
                console.error("Rejected update logs");
            })
            .addCase(deleteLog.fulfilled, (state,action) => {
                state.logs = state.logs.filter(l => l.code !== action.meta.arg);
            })
            .addCase(deleteLog.pending, () => {
                console.error("Pending delete logs");
            })
            .addCase(deleteLog.rejected, () => {
                console.error("Rejected delete logs");
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