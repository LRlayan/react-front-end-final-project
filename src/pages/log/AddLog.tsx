import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveLog} from "../../reducer/LogSlice.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import {Input, Select, SelectProps} from "antd";
import Label from "../../components/label/Label.tsx";
import tagRender from "../../util/TagRender.tsx";
import {Crop} from "../../model/Crop.ts";
import {CropRootState} from "../../reducer/CropSlice.ts";
import {FieldRootState} from "../../reducer/FieldSlice.ts";
import {Field} from "../../model/Field.ts";
import {Staff} from "../../model/Staff.ts";
import {StaffRootState} from "../../reducer/StaffSlice.ts";
import {AppDispatch} from "../../store/store.ts";

const AddLog: React.FC<{isOpen: boolean; onClose: () => void; isType:string; buttonType:string}> = ({ isOpen, onClose, isType, buttonType }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [logName, setLogName] = useState("");
    const [logDate, setLogDate] = useState("");
    const [logDetails, setLogDetails] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCrops, setCrops] = useState<Crop[]>([]);
    const [selectedFields, setFields] = useState<Field[]>([]);
    const [selectedStaff, setStaff] = useState<Staff[]>([]);
    const crops = useSelector((state:CropRootState) => state.crop.crops);
    const field = useSelector((state:FieldRootState) => state.field.fields);
    const staff = useSelector((state:StaffRootState) => state.staff.staffs);

    const cropOptions: SelectProps['options'] = crops.map((crop) => ({
        label: crop.name,
        value: crop.code
    }));

    const fieldOptions: SelectProps['options'] = field.map((field) => ({
        label: field.name,
        value: field.code
    }));

    const staffOptions: SelectProps['options'] = staff.map((staff) => ({
        label: staff.firstName,
        value: staff.code
    }));

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    }

    function handleSubmit() {
        const newLogs = new FormData();
        newLogs.append("code","");
        newLogs.append("name", logName);
        newLogs.append("logDate", logDate);
        newLogs.append("logDetails",logDetails);
        if (selectedFile) {
            newLogs.append("image", selectedFile);
        }
        newLogs.append("assignCrops", JSON.stringify(selectedCrops));
        newLogs.append("assignFields", JSON.stringify(selectedFields));
        newLogs.append("assignStaff", JSON.stringify(selectedStaff));
        dispatch(saveLog(newLogs));
        onClose();
    }

    return(
        <>
            <MainModal isOpen={isOpen} isType={isType} buttonType={buttonType} onClose={onClose} onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Log Name"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLogName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Log Date"}/>
                        <Input
                            type="date"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLogDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Log Details"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLogDetails(e.target.value)}
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
                        <Label labelName={"Log Image"}/>
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

export default AddLog;