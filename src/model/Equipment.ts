export class Equipment{
    code:string;
    name:string;
    type:string;
    status:string;
    count:number

    constructor(code:string,name:string,type:string,status:string,count:number) {
        this.code = code;
        this.name = name;
        this.type = type;
        this.status = status;
        this.count = count;
    }
}