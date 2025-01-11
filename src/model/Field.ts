export class Field{
    code:string;
    fieldName:string;
    location:string;
    extentSize:string;
    image:File | null;

    constructor(code: string, fieldName: string, location: string, extentSize: string, image: File | null) {
        this.code = code;
        this.fieldName = fieldName;
        this.location = location;
        this.extentSize = extentSize;
        this.image = image
    }
}