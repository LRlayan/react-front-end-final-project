import {Crop} from "./Crop.ts";
import {Field} from "./Field.ts";
import {Staff} from "./Staff.ts";

export class Log{
    code:string;
    name: string;
    logDate:string;
    logDetails:string;
    image:File | null | undefined;
    assignCrops: Crop[];
    assignFields: Field[];
    assignStaff: Staff[];

    constructor(code: string, logName:string, logDate: string, logDetails: string, image:File | null | undefined, assignCrops: Crop[], assignFields: Field[], assignStaff: Staff[]) {
        this.code = code;
        this.name = logName;
        this.logDate = logDate;
        this.logDetails = logDetails;
        this.image = image;
        this.assignCrops = assignCrops;
        this.assignFields = assignFields;
        this.assignStaff = assignStaff;
    }
}