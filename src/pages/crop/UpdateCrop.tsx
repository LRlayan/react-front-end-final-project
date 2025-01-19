import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Crop} from "../../model/Crop.ts";
import {updateCrop} from "../../reducer/CropSlice.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import Label from "../../components/label/Label.tsx";
import {Input, Select, SelectProps, Tag} from "antd";
import {Field} from "../../model/Field.ts";
import {FieldRootState} from "../../reducer/FieldSlice.ts";
import tagRender from "../../util/TagRender.tsx";


const UpdateCrop: React.FC<{ isOpen: boolean; onClose: () => void; crop:Crop; isType:string; buttonType:string}> = ({isOpen, onClose, crop, isType, buttonType}) => {

    const dispatch = useDispatch();
    const [cropCode, setCropCode] = useState<string | number>("");
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [fields, setFields] = useState<Field[]>([]);
    const field = useSelector((state:FieldRootState) => state.field.fields);

    useEffect(() => {
        if (crop) {
            setCropCode(crop.code);
            setCropName(crop.name);
            setScientificName(crop.scientificName);
            setCategory(crop.category);
            setSeason(crop.season);
            setImage(crop.image);
            setFields(crop.assignFields);
        }
    }, [crop]);

    const fieldOptions: SelectProps['options'] = field.map((field) => ({
        label: field.name,
        value: field.code
    }));

    const handleSubmit = () => {
        const updateCropDetails = new Crop(cropCode, cropName, scientificName, category, season, image, fields);
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