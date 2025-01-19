import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Field} from "../../model/Field.ts";
import {addField, FieldRootState} from "../../reducer/FieldSlice.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import {IdGenerator} from "../../util/IdGenerator.ts";
import {Input, Select, SelectProps} from "antd";
import Label from "../../components/label/Label.tsx";
import {CropRootState} from "../../reducer/CropSlice.ts";
import {Crop} from "../../model/Crop.ts";
import tagRender from "../../util/TagRender.tsx";

const AddField: React.FC<{isOpen: boolean; onClose: () => void; isType:string; buttonType:string}> = ({isOpen, onClose, isType, buttonType }) => {

    const dispatch = useDispatch();
    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("");
    const [extentSize, setExtentSize] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [selectedCrops, setCrops] = useState<Crop[]>([]);
    const crops = useSelector((state:CropRootState) => state.crop.crops);
    const fields = useSelector((state:FieldRootState) => state.field.fields);
    const idGenerator = new IdGenerator();

    const cropOptions: SelectProps['options'] = crops.map((crop) => ({
        label: crop.name,
        value: crop.code
    }));

    const handleSubmit = () => {
        const getLastFieldCode = fields.length > 0 ? fields[fields.length - 1].code : "FIELD-";
        const newCode = idGenerator.codeGenerator("FIELD",getLastFieldCode);
        const newField = new Field(newCode,fieldName,location,extentSize,image,selectedCrops);
        dispatch(addField(newField));
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

export default AddField;