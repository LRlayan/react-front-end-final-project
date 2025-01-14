import {configureStore} from "@reduxjs/toolkit";
import CropSlice from "../reducer/CropSlice.ts";
import FieldSlice from "../reducer/FieldSlice.ts";
import LogSlice from "../reducer/LogSlice.ts";

export const store = configureStore({
    reducer:{
        crop:CropSlice,
        field:FieldSlice,
        log:LogSlice,
    }
})