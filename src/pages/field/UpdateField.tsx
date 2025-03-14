import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MainModal from "../../components/modal/MainModal.tsx";
import {Field} from "../../model/Field.ts";
import Label from "../../components/label/Label.tsx";
import {Input, notification, Select, SelectProps} from "antd";
import {Crop} from "../../model/Crop.ts";
import {CropRootState} from "../../reducer/CropSlice.ts";
import tagRender from "../../util/TagRender.tsx";
import {Log} from "../../model/Log.ts";
import {LogRootState} from "../../reducer/LogSlice.ts";
import {Staff} from "../../model/Staff.ts";
import {StaffRootState} from "../../reducer/StaffSlice.ts";
import {Equipment} from "../../model/Equipment.ts";
import {EquipmentRootState} from "../../reducer/EquipmentSlice.ts";
import {updateField} from "../../reducer/FieldSlice.ts";
import {AppDispatch} from "../../store/store.ts";

const UpdateField: React.FC<{isOpen: boolean; onClose: () => void; field:Field; isType:string; buttonType:string}> = ({ isOpen, onClose, field, isType, buttonType }) =>{

    const dispatch = useDispatch<AppDispatch>();
    const [fieldCode, setFieldCode] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("");
    const [extentSize, setExtentSize] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);
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
            setSelectedFile(field.image);
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
        label: staff.code,
        value: staff.code
    }));

    const equipmentOptions: SelectProps['options'] = equipment.map((equipment) => ({
        label: equipment.name,
        value: equipment.code
    }));

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    }

    const handleSubmit = () => {
        const updateFields = new FormData();
        updateFields.append("code", fieldCode);
        updateFields.append("name", fieldName);
        updateFields.append("location", location);
        updateFields.append("extentSize", extentSize);
        if (selectedFile) {
            updateFields.append("image", selectedFile);
        }
        updateFields.append("assignCrops", JSON.stringify(selectedCrops));
        updateFields.append("assignLogs", JSON.stringify(selectedLogs));
        updateFields.append("assignStaffMembers", JSON.stringify(selectedStaff));
        updateFields.append("assignEquipments", JSON.stringify(selectedEquipments));
        dispatch(updateField(updateFields));
        notification.success({
            message: "Success",
            description: "Equipment update successfully",
            placement: "bottomRight",
        });
        onClose();
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
                            value={fieldName}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Location"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Extent Size"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setExtentSize(e.target.value)}
                            value={extentSize}
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
                            value={selectedCrops.map((c) => c.code)}
                            options={cropOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const updatedCrops = selectedValues
                                    .map((value: string) => {
                                        const matchedCrop = crops.find((c) => c.code === value);
                                        return matchedCrop ? {...matchedCrop} : null;
                                    })
                                    .filter((c): c is any => c !== null && c !== undefined);
                                setCrops(updatedCrops);
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
                            value={selectedLogs.map((log) => log.code)}
                            options={logOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const updatedLogs = selectedValues
                                    .map((value: string) => {
                                        const matchedLog = logs.find((log) => log.code === value);
                                        return matchedLog ? {...matchedLog} : null;
                                    })
                                    .filter((log): log is any => log !== null);
                                setLogs(updatedLogs);
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
                            value={selectedStaff.map((s) => s.code)}
                            options={staffOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const updatedStaff = selectedValues
                                    .map((value: string) => {
                                        const matchedStaff = staff.find((s) => s.code === value);
                                        return matchedStaff ? {...matchedStaff} : null;
                                    })
                                    .filter((s): s is Staff => s !== null);
                                setStaff(updatedStaff);
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
                            value={selectedEquipments.map((e) => e.code)}
                            options={equipmentOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const updatedEquipment = selectedValues
                                    .map((value: string) => {
                                        const matchedEquipment = equipment.find((e) => e.code === value);
                                        return matchedEquipment ? {...matchedEquipment} : null;
                                    })
                                    .filter((e): e is Equipment => e !== null);
                                setEquipments(updatedEquipment);
                            }}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Field Image"}/>
                        <Input
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={handleFileChange}
                        />
                    </div>
                </form>
            </MainModal>
        </>
    )
}

export default UpdateField;