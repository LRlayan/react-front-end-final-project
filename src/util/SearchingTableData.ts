import {Equipment} from "../model/Equipment.ts";
import {Vehicle} from "../model/Vehicle.ts";
import {Staff} from "../model/Staff.ts";
import {Crop} from "../model/Crop.ts";
import {Log} from "../model/Log.ts";
import {Field} from "../model/Field.ts";

class SearchingTableData {
    findData(value:string,selectType:any,type:string){
        const lowercasedValue = value.toLowerCase();

        switch (type) {
            case "VEHICLE":
                return selectType.filter(
                    (item:Vehicle) =>
                        item.vehicleName.toLowerCase().includes(lowercasedValue) ||
                        item.category.toLowerCase().includes(lowercasedValue) ||
                        item.status.toLowerCase().includes(lowercasedValue) ||
                        item.licensePlateNumber.toLowerCase().includes(lowercasedValue)
                );
            case "EQUIPMENT":
                return selectType.filter(
                    (item:Equipment) =>
                        item.name.toLowerCase().includes(lowercasedValue) ||
                        item.equType.toLowerCase().includes(lowercasedValue) ||
                        item.status.toLowerCase().includes(lowercasedValue)
                );
            case "STAFF":
                return selectType.filter(
                    (item:Staff) =>
                        item.role.toLowerCase().includes(lowercasedValue) ||
                        item.designation.toLowerCase().includes(lowercasedValue) ||
                        item.firstName.toLowerCase().includes(lowercasedValue) ||
                        item.lastName.toLowerCase().includes(lowercasedValue) ||
                        item.email.toLowerCase().includes(lowercasedValue) ||
                        item.gender.toLowerCase().includes(lowercasedValue)
                );
            case "CROP":
                return selectType.filter(
                    (item:Crop) =>
                        item.name.toLowerCase().includes(lowercasedValue) ||
                        item.category.toLowerCase().includes(lowercasedValue) ||
                        item.scientificName.toLowerCase().includes(lowercasedValue)
                );
            case "LOG":
                return selectType.filter(
                    (item:Log) =>
                        item.logDate.toLowerCase().includes(lowercasedValue)
                );
            case "FIELD":
                return selectType.filter(
                    (item:Field) =>
                        item.name.toLowerCase().includes(lowercasedValue)
                );
            default:
                return ""
        }
    }
}

export default SearchingTableData;