import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../api/api.ts";
import {User} from "../model/User.ts";

const initialState : { user: User | null, jwt_token: null, refresh_token: null, username: null, isAuthenticated: boolean, loading: false, error: string } = {
    user: null,
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: ""
};


export type UserRootState = {
    user: {
        user: User | null;
        jwt_token: null;
        refresh_token: null;
        username: null;
        isAuthenticated: boolean;
        loading: boolean;
        error: string;
    };
};


export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user: User) => {
        try {
            const response = await api.post(
                "auth/register",
                {user},
                {withCredentials: true}
            );

            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user: User) => {
        try {
            const response = await api.post(
                'auth/login',
                {user},
                {withCredentials: true}
            );
            return response.data;
        } catch (e) {
            throw e;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                }
            })
            .addCase(registerUser.pending, () => {
                console.error("Pending register user");
            })
            .addCase(registerUser.rejected, () => {
                console.error("Rejected register user");
            })
    }
});

export default userSlice.reducer;

