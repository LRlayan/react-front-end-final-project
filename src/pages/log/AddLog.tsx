import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Log} from "../../model/Log.ts";
import {addLog, LogRootState} from "../../reducer/LogSlice.ts";
import {IdGenerator} from "../../util/IdGenerator.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import {Input, Select, SelectProps} from "antd";
import Label from "../../components/label/Label.tsx";
import tagRender from "../../util/TagRender.tsx";
import {Crop} from "../../model/Crop.ts";
import {CropRootState} from "../../reducer/CropSlice.ts";
import {FieldRootState} from "../../reducer/FieldSlice.ts";
import {Field} from "../../model/Field.ts";

const AddLog: React.FC<{isOpen: boolean; onClose: () => void; isType:string; buttonType:string}> = ({ isOpen, onClose, isType, buttonType }) => {

    const dispatch = useDispatch();
    const [logName, setLogName] = useState("");
    const [lodDate, setLogDate] = useState("");
    const [logDetails, setLogDetails] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [selectedCrops, setCrops] = useState<Crop[]>([]);
    const [selectedFields, setFields] = useState<Field[]>([]);
    const logs = useSelector((state:LogRootState) => state.log.logs);
    const crops = useSelector((state:CropRootState) => state.crop.crops);
    const field = useSelector((state:FieldRootState) => state.field.fields);
    const idGenerator = new IdGenerator();

    const cropOptions: SelectProps['options'] = crops.map((crop) => ({
        label: crop.name,
        value: crop.code
    }));

    const fieldOptions: SelectProps['options'] = field.map((field) => ({
        label: field.name,
        value: field.code
    }));

    function handleSubmit() {
        const getLastLogCode = logs.length > 0 ? logs[logs.length -1].code : "LOG-";
        const newCode = idGenerator.codeGenerator("LOG",getLastLogCode);
        const newLogs = new Log(newCode,logName,lodDate,logDetails,image,selectedCrops,selectedFields);
        dispatch(addLog(newLogs));
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
                        <Label labelName={"Log Image"}/>
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

export default AddLog;