import {configureStore} from "@reduxjs/toolkit";
import CropSlice from "../reducer/CropSlice.ts";
import FieldSlice from "../reducer/FieldSlice.ts";
import LogSlice from "../reducer/LogSlice.ts";
import StaffSlice from "../reducer/StaffSlice.ts";
import VehicleSlice from "../reducer/VehicleSlice.ts";
import EquipmentSlice from "../reducer/EquipmentSlice.ts";
import UserSlice from "../reducer/UserSlice.ts";

export const store = configureStore({
    reducer:{
        user:UserSlice,
        crop:CropSlice,
        field:FieldSlice,
        log:LogSlice,
        staff:StaffSlice,
        vehicle:VehicleSlice,
        equipment:EquipmentSlice,
    }
});

export type AppDispatch = typeof store.dispatch;