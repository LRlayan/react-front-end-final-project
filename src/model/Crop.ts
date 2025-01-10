export class Crop{
    code:string;
    cropName:string;
    scientificName:string;
    category:string;
    season:string

    constructor(code: string, cropName: string, scientificName: string, category: string, season: string) {
        this.code = code;
        this.cropName = cropName;
        this.scientificName = scientificName;
        this.category = category;
        this.season = season;
    }
}