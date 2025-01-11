export class Log{
    code:string;
    logDate:string;
    logDetails:string;
    image:File | null

    constructor(code: string, logDate: string, logDetails: string, image:File | null) {
        this.code = code;
        this.logDate = logDate;
        this.logDetails = logDetails;
        this.image = image
    }
}