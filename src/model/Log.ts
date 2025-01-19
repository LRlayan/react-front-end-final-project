export class Log{
    code:string;
    name: string;
    logDate:string;
    logDetails:string;
    image:File | null

    constructor(code: string, logName:string, logDate: string, logDetails: string, image:File | null) {
        this.code = code;
        this.name = logName;
        this.logDate = logDate;
        this.logDetails = logDetails;
        this.image = image
    }
}