import {Crop} from "./Crop.ts";

export class Log{
    code:string;
    name: string;
    logDate:string;
    logDetails:string;
    image:File | null;
    assignCrops: Crop[];

    constructor(code: string, logName:string, logDate: string, logDetails: string, image:File | null, assignCrops: Crop[]) {
        this.code = code;
        this.name = logName;
        this.logDate = logDate;
        this.logDetails = logDetails;
        this.image = image;
        this.assignCrops = assignCrops;
    }
}