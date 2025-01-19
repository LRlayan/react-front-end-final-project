export class Field{
    code:string;
    name:string;
    location:string;
    extentSize:string;
    image:File | null;

    constructor(code: string, fieldName: string, location: string, extentSize: string, image: File | null) {
        this.code = code;
        this.name = fieldName;
        this.location = location;
        this.extentSize = extentSize;
        this.image = image
    }
}