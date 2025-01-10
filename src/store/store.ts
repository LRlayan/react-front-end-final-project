import {configureStore} from "@reduxjs/toolkit";
import CropSlice from "../reducer/CropSlice.ts";

export const store = configureStore({
    reducer:{
        crop:CropSlice,
    }
})