import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Crop} from "../../model/Crop.ts";
import {updateCrop} from "../../reducer/CropSlice.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import Label from "../../components/label/Label.tsx";
import {Input, Select, SelectProps} from "antd";
import {Field} from "../../model/Field.ts";
import {FieldRootState} from "../../reducer/FieldSlice.ts";
import tagRender from "../../util/TagRender.tsx";
import {LogRootState} from "../../reducer/LogSlice.ts";
import {Log} from "../../model/Log.ts";


const UpdateCrop: React.FC<{ isOpen: boolean; onClose: () => void; crop:Crop; isType:string; buttonType:string}> = ({isOpen, onClose, crop, isType, buttonType}) => {

    const dispatch = useDispatch();
    const [cropCode, setCropCode] = useState<string | number>("");
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [fields, setFields] = useState<Field[]>([]);
    const [selectedLogs, setLogs] = useState<Log[]>([]);
    const field = useSelector((state:FieldRootState) => state.field.fields);
    const logs = useSelector((state:LogRootState) => state.log.logs);

    useEffect(() => {
        if (crop) {
            setCropCode(crop.code);
            setCropName(crop.name);
            setScientificName(crop.scientificName);
            setCategory(crop.category);
            setSeason(crop.season);
            setImage(crop.image);
            setFields(crop.assignFields);
            setLogs(crop.assignLogs);
        }
    }, [crop]);

    const fieldOptions: SelectProps['options'] = field.map((field) => ({
        label: field.name,
        value: field.code
    }));

    const logOptions: SelectProps['options'] = logs.map((log) => ({
        label: log.name,
        value: log.code
    }));

    const handleSubmit = () => {
        const updateCropDetails = new Crop(cropCode, cropName, scientificName, category, season, image, fields, selectedLogs);
        dispatch(updateCrop(updateCropDetails))
    }

    return (
        <>
            <MainModal isType={isType} buttonType={buttonType} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Crop Name"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setCropName(e.target.value)}
                            value={cropName}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Scientific Name"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setScientificName(e.target.value)}
                            value={scientificName}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Category"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Season"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setSeason(e.target.value)}
                            value={season}
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
                            value={fields.map((f: Field) => f.code)}
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
                                    .filter((f): f is Field => f !== null);
                                setFields(updatedFields);
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
                                    .filter((log): log is Log => log !== null);
                                setLogs(updatedLogs);
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
        </>
    )
}

export default UpdateCrop;