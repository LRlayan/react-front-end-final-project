import {Crop} from "./Crop.ts";

export class Field{
    code:string;
    name:string;
    location:string;
    extentSize:string;
    image:File | null;
    assignCrops: Crop[];

    constructor(code: string, fieldName: string, location: string, extentSize: string, image: File | null, assignCrops: Crop[]) {
        this.code = code;
        this.name = fieldName;
        this.location = location;
        this.extentSize = extentSize;
        this.image = image;
        this.assignCrops = assignCrops;
    }
}