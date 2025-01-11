export class Field{
    code:string;
    fieldName:string;
    location:string;
    extentSize:number;
    image1:File | null;
    image2:File | null

    constructor(code: string, fieldName: string, location: string, extentSize: number, image1: File | null, image2: File | null) {
        this.code = code;
        this.fieldName = fieldName;
        this.location = location;
        this.extentSize = extentSize;
        this.image1 = image1
        this.image2 = image2
    }
}