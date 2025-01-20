import {Field} from "./Field.ts";
import {Log} from "./Log.ts";

export class Crop{
    code:string | number;
    name:string;
    scientificName:string;
    category:string;
    season:string;
    image: File | null;
    assignFields: Field[];
    assignLogs: Log[];

    constructor(code: string | number, cropName: string, scientificName: string, category: string, season: string, image: File | null, assignFields: Field[], assignLogs: Log[]) {
        this.code = code;
        this.name = cropName;
        this.scientificName = scientificName;
        this.category = category;
        this.season = season;
        this.image = image;
        this.assignFields = assignFields;
        this.assignLogs = assignLogs;
    }
}