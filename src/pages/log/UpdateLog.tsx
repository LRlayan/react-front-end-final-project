import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Log} from "../../model/Log.ts";
import {updateLog} from "../../reducer/LogSlice.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import {Input, notification, Select, SelectProps} from "antd";
import Label from "../../components/label/Label.tsx";
import {Crop} from "../../model/Crop.ts";
import {CropRootState} from "../../reducer/CropSlice.ts";
import tagRender from "../../util/TagRender.tsx";
import {Field} from "../../model/Field.ts";
import {FieldRootState} from "../../reducer/FieldSlice.ts";
import {StaffRootState} from "../../reducer/StaffSlice.ts";
import {Staff} from "../../model/Staff.ts";
import {AppDispatch} from "../../store/store.ts";

const UpdateLog: React.FC<{isOpen: boolean; onClose: () => void; logs:Log; isType:string; buttonType:string}> = ({ isOpen, onClose, logs, isType, buttonType }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [logCode, setLogCode] = useState("");
    const [logName, setLogName] = useState("");
    const [logDate, setLogDate] = useState("");
    const [logDetails, setLogDetails] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);
    const [selectedCrops, setCrops] = useState<Crop[]>([]);
    const [selectedFields, setFields] = useState<Field[]>([]);
    const [selectedStaff, setStaff] = useState<Staff[]>([]);
    const crops = useSelector((state:CropRootState) => state.crop.crops);
    const field = useSelector((state:FieldRootState) => state.field.fields);
    const staff = useSelector((state:StaffRootState) => state.staff.staffs);

    useEffect(() => {
        setLogCode(logs.code);
        setLogName(logs.name);
        setLogDate(logs.logDate);
        setLogDetails(logs.logDetails);
        setSelectedFile(logs.image);
        setCrops(logs.assignCrops);
        setFields(logs.assignFields);
        setStaff(logs.assignStaff);
    }, [logs]);

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
        const updateLogs = new FormData();
        updateLogs.append("code",logCode);
        updateLogs.append("name",logName);
        updateLogs.append("logDate", logDate);
        updateLogs.append("logDetails",logDetails);
        if (selectedFile) {
            updateLogs.append("image", selectedFile);
        }
        updateLogs.append("assignCrops", JSON.stringify(selectedCrops));
        updateLogs.append("assignFields", JSON.stringify(selectedFields));
        updateLogs.append("assignStaff", JSON.stringify(selectedStaff));
        dispatch(updateLog(updateLogs));
        notification.success({
            message: "Success",
            description: "Log update successfully",
            placement: "bottomRight",
        });
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
                            value={logName}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Log Date"}/>
                        <Input
                            type="date"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLogDate(e.target.value)}
                            value={logDate}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Log Details"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLogDetails(e.target.value)}
                            value={logDetails}
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
                                    .filter((c): c is any => c !== null);
                                setCrops(updatedCrops);
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
                            value={selectedFields.map((f: Field) => f.code)}
                            options={fieldOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const updatedFields = selectedValues
                                    .map((value: string) => {
                                        const matchedField = field.find((f) => f.code === value);
                                        return matchedField ? {...matchedField} : null;
                                    })
                                    .filter((f): f is any => f !== null);
                                setFields(updatedFields);
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
                                    .filter((s): s is any => s !== null);
                                setStaff(updatedStaff);
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

export default UpdateLog;