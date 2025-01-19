import {Crop} from "./Crop.ts";
import {Field} from "./Field.ts";

export class Log{
    code:string;
    name: string;
    logDate:string;
    logDetails:string;
    image:File | null;
    assignCrops: Crop[];
    assignFields: Field[];

    constructor(code: string, logName:string, logDate: string, logDetails: string, image:File | null, assignCrops: Crop[], assignFields: Field[]) {
        this.code = code;
        this.name = logName;
        this.logDate = logDate;
        this.logDetails = logDetails;
        this.image = image;
        this.assignCrops = assignCrops;
        this.assignFields = assignFields;
    }
}