import {configureStore} from "@reduxjs/toolkit";
import CropSlice from "../reducer/CropSlice.ts";
import FieldSlice from "../reducer/FieldSlice.ts";

export const store = configureStore({
    reducer:{
        crop:CropSlice,
        field:FieldSlice,
    }
})