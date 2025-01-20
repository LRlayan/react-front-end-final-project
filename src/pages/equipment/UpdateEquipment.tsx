import React, {useEffect, useState} from 'react';
import MainModal from "../../components/modal/MainModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {Equipment} from "../../model/Equipment.ts";
import {updateEquipment} from "../../reducer/EquipmentSlice.ts";
import Label from "../../components/label/Label.tsx";
import {Input, Select, SelectProps} from "antd";
import {Staff} from "../../model/Staff.ts";
import {StaffRootState} from "../../reducer/StaffSlice.ts";
import tagRender from "../../util/TagRender.tsx";
import {Field} from "../../model/Field.ts";
import {FieldRootState} from "../../reducer/FieldSlice.ts";

const UpdateEquipment: React.FC<{ isOpen:boolean; onClose: () => void; isType:string; buttonType: string; equipments: Equipment}> = ({ isOpen, onClose, isType, buttonType, equipments }) => {

    const dispatch = useDispatch();
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [count, setCount] = useState<number>(0);
    const [selectedStaff, setStaff] = useState<Staff[]>([]);
    const [selectedFields, setFields] = useState<Field[]>([]);
    const staff = useSelector((state:StaffRootState) => state.staff.staffs);
    const field = useSelector((state:FieldRootState) => state.field.fields);

    useEffect(() => {
        setCode(equipments.code);
        setName(equipments.name);
        setType(equipments.type);
        setStatus(equipments.status);
        setCount(equipments.count);
        setStaff(equipments.assignStaffMembers);
        setFields(equipments.assignFields);
    }, [equipments]);

    const staffOptions: SelectProps['options'] = staff.map((staff) => ({
        label: staff.code,
        value: staff.code
    }));

    const fieldOptions: SelectProps['options'] = field.map((field) => ({
        label: field.name,
        value: field.code
    }));

    function handleSubmit(){
        const updateEquipmentDetails = new Equipment(code, name, type, status, count, selectedStaff, selectedFields);
        dispatch(updateEquipment(updateEquipmentDetails));
        onClose();
    }

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

    return(
        <>
            <MainModal isOpen={isOpen} onClose={onClose} isType={isType} buttonType={buttonType}
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
                    <div className="mb-4 custom-input">
                        <Label labelName={"Assign Staff Members"}/>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                                color: 'black',
                            }}
                            options={staffOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const selectedStaff = selectedValues.map((value: string) => {
                                    const matchedStaff = staff.find((s) => s.code === value);
                                    return matchedStaff
                                        ? {
                                            ...matchedStaff,
                                            staffName: matchedStaff.firstName,
                                        }
                                        : null;
                                });
                                const validStaff = selectedStaff.filter((s: Staff) => s !== null);
                                setStaff(validStaff as Staff[]);
                            }}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Assign Field"}/>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                                color: 'black',
                            }}
                            options={fieldOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const selectedFields = selectedValues.map((value: string) => {
                                    const matchedField = field.find((f) => f.code === value);
                                    return matchedField
                                        ? {
                                            ...matchedField,
                                            fieldName: matchedField.name,
                                        }
                                        : null;
                                });
                                const validFields = selectedFields.filter((f: Field) => f !== null);
                                setFields(validFields as Field[]);
                            }}
                        />
                    </div>
                </form>
            </MainModal>
        </>
    )
}

export default UpdateEquipment;