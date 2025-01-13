export class IdGenerator{

    codeGenerator(type:string,code:string){

        const increment = 1;

        switch (type) {
            case "CROP":
                { 
                    const parts = code.split('-');
                    if (parts.length > 1 && code !== "CROP-") {
                        const number = parseInt(parts[1]) + increment;
                        return `CROP-${number}`;
                    }
                    return "CROP-1";
                }
            case "FIELD":
                return "";
            case "LOG":
                return "";
            case "EQUIPMENT":
                return "";
            case "STAFF":
                return '';
            case "VEHICLE":
                return '';
            default:
                return increment
        }
    }
}