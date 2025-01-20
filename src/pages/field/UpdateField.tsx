import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MainModal from "../../components/modal/MainModal.tsx";
import {Field} from "../../model/Field.ts";
import {updateField} from "../../reducer/FieldSlice.ts";
import Label from "../../components/label/Label.tsx";
import {Input, Select, SelectProps} from "antd";
import {Crop} from "../../model/Crop.ts";
import {CropRootState} from "../../reducer/CropSlice.ts";
import tagRender from "../../util/TagRender.tsx";
import {Log} from "../../model/Log.ts";
import {LogRootState} from "../../reducer/LogSlice.ts";
import {Staff} from "../../model/Staff.ts";
import {StaffRootState} from "../../reducer/StaffSlice.ts";
import {Equipment} from "../../model/Equipment.ts";
import {EquipmentRootState} from "../../reducer/EquipmentSlice.ts";

const UpdateField: React.FC<{isOpen: boolean; onClose: () => void; field:Field; isType:string; buttonType:string}> = ({ isOpen, onClose, field, isType, buttonType }) =>{

    const dispatch = useDispatch();
    const [fieldCode, setFieldCode] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("");
    const [extentSize, setExtentSize] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [selectedCrops, setCrops] = useState<Crop[]>([]);
    const [selectedLogs, setLogs] = useState<Log[]>([]);
    const [selectedStaff, setStaff] = useState<Staff[]>([]);
    const [selectedEquipments, setEquipments] = useState<Equipment[]>([]);
    const crops = useSelector((state:CropRootState) => state.crop.crops);
    const logs = useSelector((state:LogRootState) => state.log.logs);
    const staff = useSelector((state:StaffRootState) => state.staff.staffs);
    const equipment = useSelector((state:EquipmentRootState) => state.equipment.equipments);

    useEffect(() => {
        if (field) {
            setFieldCode(field.code);
            setFieldName(field.name);
            setLocation(field.location);
            setExtentSize(field.extentSize);
            setImage(field.image);
            setCrops(field.assignCrops);
            setLogs(field.assignLogs);
            setStaff(field.assignStaffMembers);
            setEquipments(field.assignEquipments);
        }
    }, [field]);

    const cropOptions: SelectProps['options'] = crops.map((crop) => ({
        label: crop.name,
        value: crop.code
    }));

    const logOptions: SelectProps['options'] = logs.map((log) => ({
        label: log.name,
        value: log.code
    }));

    const staffOptions: SelectProps['options'] = staff.map((staff) => ({
        label: staff.firstName,
        value: staff.code
    }));

    const equipmentOptions: SelectProps['options'] = equipment.map((equipment) => ({
        label: equipment.name,
        value: equipment.code
    }));

    const handleSubmit = () => {
        const updateFieldDetails = new Field(fieldCode, fieldName, location, extentSize, image, selectedCrops, selectedLogs, selectedStaff, selectedEquipments);
        dispatch(updateField(updateFieldDetails));
    }

    return(
        <>
            <MainModal isType={isType} buttonType={buttonType} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Field Name"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setFieldName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Location"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Extent Size"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setExtentSize(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Assign Crops"}/>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                                color: 'black',
                            }}
                            options={cropOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const selectedCrops = selectedValues.map((value: string) => {
                                    const matchedCrop = crops.find((c) => c.code === value);
                                    return matchedCrop
                                        ? {
                                            ...matchedCrop,
                                            cropName: matchedCrop.name,
                                        }
                                        : null;
                                });
                                const validCrops = selectedCrops.filter((c: Crop) => c !== null);
                                setCrops(validCrops as Crop[]);
                            }}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Assign Logs"}/>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                                color: 'black',
                            }}
                            options={logOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const selectedLogs = selectedValues.map((value: string) => {
                                    const matchedLogs = logs.find((l) => l.code === value);
                                    return matchedLogs
                                        ? {
                                            ...matchedLogs,
                                            fieldName: matchedLogs.name,
                                        }
                                        : null;
                                });
                                const validLogs = selectedLogs.filter((l: Log) => l !== null);
                                setLogs(validLogs as Log[]);
                            }}
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
                        <Label labelName={"Assign Equipments"}/>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                                color: 'black',
                            }}
                            options={equipmentOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const selectedEquipments = selectedValues.map((value: string) => {
                                    const matchedEquipments = equipment.find((e) => e.code === value);
                                    return matchedEquipments
                                        ? {
                                            ...matchedEquipments,
                                            equipmentName: matchedEquipments.name,
                                        }
                                        : null;
                                });
                                const validEquipments = selectedEquipments.filter((e: Equipment) => e !== null);
                                setEquipments(validEquipments as Equipment[]);
                            }}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Field Image"}/>
                        <Input
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>
                </form>
            </MainModal>
        </>
    )
}

export default UpdateField;