export class Vehicle{
    code:string;
    licensePlateNumber:string
    vehicleName:string;
    category:string;
    fuelType:string;
    status:string;
    remark:string;

    constructor(code: string, licensePlateNumber: string, vehicleName: string, category: string, fuelType: string, status: string, remark: string) {
        this.code = code;
        this.licensePlateNumber = licensePlateNumber;
        this.vehicleName = vehicleName;
        this.category = category;
        this.fuelType = fuelType;
        this.status = status;
        this.remark = remark;
    }
}