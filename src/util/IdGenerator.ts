export class IdGenerator{

    codeGenerator(type:string,code:string){
        switch (type) {
            case "CROP":
                return this.getCode(code,"CROP-");
            case "FIELD":
                return this.getCode(code,"FIELD-");
            case "LOG":
                return this.getCode(code,"LOG-");
            case "EQUIPMENT":
                return this.getCode(code,"EQUIPMENT-");
            case "STAFF":
                return this.getCode(code,"STAFF-");
            case "VEHICLE":
                return this.getCode(code,"VEHICLE-");
            default:
                return "";
        }
    }

    getCode(code:string,ifFirstCode:string){
        const increment = 1;
        {
            const parts = code.split('-');
            if (parts.length > 1 && code !== ifFirstCode) {
                const number = parseInt(parts[1]) + increment;
                return `${parts[0]}-${number}`;
            }
            return `${parts[0]}-1`;
        }
    }
}