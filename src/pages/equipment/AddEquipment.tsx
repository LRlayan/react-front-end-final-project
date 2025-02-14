import React, {useState} from 'react';
import MainModal from "../../components/modal/MainModal.tsx";
import Label from "../../components/label/Label.tsx";
import {Input, Select, SelectProps} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {saveEquipment} from "../../reducer/EquipmentSlice.ts";
import {Equipment} from "../../model/Equipment.ts";
import {Staff} from "../../model/Staff.ts";
import {StaffRootState} from "../../reducer/StaffSlice.ts";
import tagRender from "../../util/TagRender.tsx";
import {AppDispatch} from "../../store/store.ts";

const AddEquipment: React.FC<{ isOpen:boolean; onClose: () => void; isType:string; buttonType:string}> = ({ isOpen, onClose ,isType, buttonType}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [count, setCount] = useState<number>(0);
    const [selectedStaff, setStaff] = useState<Staff[]>([]);
    const staff = useSelector((state:StaffRootState) => state.staff.staffs);

    const equipmentTypeOptions = [
        { label:"Hand Tools", value: "Hand Tools"},
        { label:"Irrigation Equipment", value: "Irrigation Equipment"},
        { label:"Power Tools and Machinery", value: "Power Tools and Machinery"},
        { label:"Ploughing Equipment", value: "Ploughing Equipment"},
        { label:"Weeding and Pest Control Equipment", value: "Weeding and Pest Control Equipment"},
        { label:"Harvesting Equipment", value: "Harvesting Equipment"},
        { label:"Post-Harvest Equipment", value: "Post-Harvest Equipment"},
        { label:"Monitoring and Measuring Tools", value: "Monitoring and Measuring Tools"},
        { label:"Protective Equipment", value: "Protective Equipment"}
    ];

    const statusOptions = [
        {label:"Available", value:"Available"},
        {label:"Unavailable", value:"Unavailable"},
    ];

    const staffOptions: SelectProps['options'] = staff.map((staff) => ({
        label: staff.code,
        value: staff.code
    }));

    function handleSubmit(){
        const newEquipment = new Equipment("", name, type, status, count, selectedStaff, []);
        dispatch(saveEquipment(newEquipment));
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
                </form>
            </MainModal>
        </>
    )
}

export default AddEquipment;