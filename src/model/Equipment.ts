import {Staff} from "./Staff.ts";
import {Field} from "./Field.ts";

export class Equipment{
    code:string;
    name:string;
    equType:string;
    status:string;
    count:number;
    assignStaffMembers: Staff[];
    assignFields: Field[];

    constructor(code:string,name:string,type:string,status:string,count:number, assignStaffMembers: Staff[], assignFields: Field[]) {
        this.code = code;
        this.name = name;
        this.equType = type;
        this.status = status;
        this.count = count;
        this.assignStaffMembers = assignStaffMembers;
        this.assignFields = assignFields;
    }
}