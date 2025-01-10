export class Field{
    code:string;
    fieldName:string;
    location:string
    extentSize:number

    constructor(code: string, fieldName: string, location: string, extentSize: number) {
        this.code = code;
        this.fieldName = fieldName;
        this.location = location;
        this.extentSize = extentSize;
    }
}