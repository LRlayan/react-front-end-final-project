import {Field} from "./Field.ts";

export class Crop{
    code:string | number;
    cropName:string;
    scientificName:string;
    category:string;
    season:string;
    image: File | null | undefined;
    assignFields: Field[];

    constructor(code: string | number, cropName: string, scientificName: string, category: string, season: string, image: File | null | undefined, assignFields:Field[]) {
        this.code = code;
        this.cropName = cropName;
        this.scientificName = scientificName;
        this.category = category;
        this.season = season;
        this.image = image
        this.assignFields = assignFields
    }
}