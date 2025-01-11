export class Crop{
    code:string;
    cropName:string;
    scientificName:string;
    category:string;
    season:string;
    image: File | null;

    constructor(code: string, cropName: string, scientificName: string, category: string, season: string, image: File | null) {
        this.code = code;
        this.cropName = cropName;
        this.scientificName = scientificName;
        this.category = category;
        this.season = season;
        this.image = image
    }
}