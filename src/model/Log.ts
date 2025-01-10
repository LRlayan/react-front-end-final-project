export class Log{
    code:string;
    logDate:string;
    logDetails:string;

    constructor(code: string, logDate: string, logDetails: string) {
        this.code = code;
        this.logDate = logDate;
        this.logDetails = logDetails;
    }
}