import React, {useState} from 'react';
import MainModal from "../../components/modal/MainModal.tsx";
import Label from "../../components/label/Label.tsx";
import {Input, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {IdGenerator} from "../../util/IdGenerator.ts";
import {addEquipment, RootState} from "../../reducer/EquipmentSlice.ts";
import {Equipment} from "../../model/Equipment.ts";

const AddEquipment: React.FC<{ isOpen:boolean; onClose: () => void; isType:string; buttonType:string}> = ({ isOpen, onClose ,isType, buttonType}) => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [count, setCount] = useState<number>(0);
    const equipments = useSelector((state:RootState) => state.equipment.equipments);
    const idGenerator = new IdGenerator();

    const equipmentTypeOptions = [
        { label:"Plough", value: 'Plough'},
        { label:"Mamotee'", value: 'Mamotee'},
        { label:"Shovel'", value: 'Shovel'},
        { label:"Irrigation pumps", value: 'Irrigation pumps'},
        { label:"Wheelbarrow'", value: 'Wheelbarrow'},
        { label:"Sprayer'", value: 'Sprayer'},
        { label:"Axe'", value: 'Axe'},
        { label:"Chain saw", value: 'Chain saw'},
        { label:"Combine harvester", value: 'Combine harvester'},
        { label:"Seeder'", value: 'Seeder'},
        { label:"Weeder'", value: 'Weeder'},
        { label:"Wheel wrench", value: 'Wheel wrench'},
        { label:"Screw drivers", value: 'Screw drivers'},
    ];
    const statusOptions = [
        {label:"Available", value:"Available"},
        {label:"Unavailable", value:"Unavailable"},
    ];

    function handleSubmit(){
        const getLastIndex = equipments.length > 0 ? equipments[equipments.length -1].code : "EQUIPMENT-";
        const newCode = idGenerator.codeGenerator("EQUIPMENT",getLastIndex);
        const newEquipment = new Equipment(newCode,name,type,status,count);
        dispatch(addEquipment(newEquipment));
        onClose();
    }

    return(
        <>
            <MainModal isOpen={isOpen} isType={isType} buttonType={buttonType} onClose={onClose}
                       onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Equipment Name"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Equipment Type"}/>
                        <Select
                            placeholder="Select equipment type"
                            optionFilterProp="label"
                            value={type || undefined}
                            onChange={(value) => setType(value)}
                            options={equipmentTypeOptions}
                            style={{
                                color: type ? "black" : "gray",
                            }}
                            dropdownStyle={{
                                backgroundColor: "white",
                                color: "black",
                            }}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 ${
                                type ? "text-black" : "text-gray-500"
                            }`}
                            dropdownClassName="custom-dropdown"
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Status"}/>
                        <Select
                            showSearch
                            placeholder="Select status of equipment"
                            optionFilterProp="label"
                            options={statusOptions}
                            value={status || undefined}
                            onChange={(value) => setStatus(value)}
                            style={{
                                color: status ? "black" : "gray",
                            }}
                            dropdownStyle={{
                                backgroundColor: "white",
                                color: "black",
                            }}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 ${
                                status ? "text-black" : "text-gray-500"
                            }`}
                            dropdownClassName="custom-dropdown"
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Count"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setCount(parseInt(e.target.value))}
                        />
                    </div>
                </form>
            </MainModal>
        </>
    )
}

export default AddEquipment;