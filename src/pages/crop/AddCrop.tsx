import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCrop, CropRootState} from "../../reducer/CropSlice.ts";
import {FieldRootState} from "../../reducer/FieldSlice.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import {Crop} from "../../model/Crop.ts";
import {IdGenerator} from "../../util/IdGenerator.ts";
import {Input, Select, SelectProps} from "antd";
import Label from "../../components/label/Label.tsx";
import {Field} from "../../model/Field.ts";
import tagRender from "../../util/TagRender.tsx";
import {Log} from "../../model/Log.ts";
import {LogRootState} from "../../reducer/LogSlice.ts";

const AddCrop: React.FC<{ isOpen: boolean; onClose: () => void; isType:string; buttonType:string}> = ({ isOpen, onClose, isType, buttonType }) => {
    const dispatch = useDispatch();
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [selectedFields, setFields] = useState<Field[]>([]);
    const [selectedLogs, setLogs] = useState<Log[]>([]);
    const crops = useSelector((state:CropRootState) => state.crop.crops);
    const field = useSelector((state:FieldRootState) => state.field.fields);
    const logs = useSelector((state:LogRootState) => state.log.logs);
    const idGenerator = new IdGenerator();

    const fieldOptions: SelectProps['options'] = field.map((field) => ({
        label: field.name,
        value: field.code
    }));

    const logOptions: SelectProps['options'] = logs.map((log) => ({
        label: log.name,
        value: log.code
    }));

    const handleSubmit = () => {
        const getLastCropCode = crops.length > 0 ? crops[crops.length - 1].code : "CROP-";
        const newCode = idGenerator.codeGenerator("CROP",getLastCropCode);
        const newCrop = new Crop(newCode, cropName, scientificName, category, season, image, selectedFields, selectedLogs);
        dispatch(addCrop(newCrop));
        onClose();
    };

    return (
        <MainModal isType={isType} buttonType={buttonType} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <form>
                <div className="mb-4 custom-input">
                    <Label labelName={"Crop Name"}/>
                    <Input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setCropName(e.target.value)}
                    />
                </div>
                <div className="mb-4 custom-input">
                    <Label labelName={"Scientific Name"}/>
                    <Input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setScientificName(e.target.value)}
                    />
                </div>
                <div className="mb-4 custom-input">
                    <Label labelName={"Category"}/>
                    <Input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-4 custom-input">
                    <Label labelName={"Season"}/>
                    <Input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setSeason(e.target.value)}
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
                    <Label labelName={"Crop Image"}/>
                    <Input
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
            </form>
        </MainModal>
    );
};

export default AddCrop;
