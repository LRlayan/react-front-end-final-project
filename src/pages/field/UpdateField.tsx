import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import MainModal from "../../components/modal/MainModal.tsx";
import {Field} from "../../model/Field.ts";
import {updateField} from "../../reducer/FieldSlice.ts";
import Label from "../../components/label/Label.tsx";
import {Input} from "antd";

const UpdateField: React.FC<{isOpen: boolean; onClose: () => void; field:Field; isType:string; buttonType:string}> = ({ isOpen, onClose, field, isType, buttonType }) =>{

    const dispatch = useDispatch();
    const [fieldCode, setFieldCode] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("");
    const [extentSize, setExtentSize] = useState("");
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (field) {
            setFieldCode(field.code);
            setFieldName(field.fieldName);
            setLocation(field.location);
            setExtentSize(field.extentSize);
            setImage(field.image);
        }
    }, [field]);

    const handleSubmit = () => {
        const updateFieldDetails = new Field(fieldCode,fieldName,location,extentSize,image);
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