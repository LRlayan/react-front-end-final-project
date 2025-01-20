import {Crop} from "./Crop.ts";
import {Log} from "./Log.ts";
import {Staff} from "./Staff.ts";

export class Field{
    code:string;
    name:string;
    location:string;
    extentSize:string;
    image:File | null;
    assignCrops: Crop[];
    assignLogs: Log[];
    assignStaffMembers: Staff[];

    constructor(code: string, fieldName: string, location: string, extentSize: string, image: File | null, assignCrops: Crop[], assignLogs: Log[], assignStaffMembers: Staff[]) {
        this.code = code;
        this.name = fieldName;
        this.location = location;
        this.extentSize = extentSize;
        this.image = image;
        this.assignCrops = assignCrops;
        this.assignLogs = assignLogs;
        this.assignStaffMembers = assignStaffMembers;
    }
}