import {Staff} from "./Staff.ts";

export class Equipment{
    code:string;
    name:string;
    type:string;
    status:string;
    count:number;
    assignStaffMembers: Staff[];

    constructor(code:string,name:string,type:string,status:string,count:number, assignStaffMembers: Staff[]) {
        this.code = code;
        this.name = name;
        this.type = type;
        this.status = status;
        this.count = count;
        this.assignStaffMembers = assignStaffMembers;
    }
}