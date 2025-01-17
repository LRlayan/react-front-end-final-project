import {Equipment} from "../model/Equipment.ts";

class SearchingTableData {
    findData(value:string,equipment:Equipment[]){
        const lowercasedValue = value.toLowerCase();
        const filtered = equipment.filter(
            (item) =>
                item.name.toLowerCase().includes(lowercasedValue) ||
                item.type.toLowerCase().includes(lowercasedValue) ||
                item.status.toLowerCase().includes(lowercasedValue)
        );
        return filtered;
    }
}

export default SearchingTableData;