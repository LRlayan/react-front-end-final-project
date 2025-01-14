import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import MainModal from "../../components/modal/MainModal.tsx";
import {Field} from "../../model/Field.ts";
import {deleteField} from "../../reducer/FieldSlice.ts";

const DeleteField: React.FC<{isOpen: boolean; onClose: () => void}> = ({isOpen, onClose, field}) => {

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
        const delField = new Field(fieldCode,fieldName,location,extentSize,image);
        dispatch(deleteField(delField));
    }

    return(
        <>
            <MainModal isType={"DELETE FIELD"} buttonType={"Yes,I'm Sure"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <img
                        src={URL.createObjectURL(field.image)}
                        alt={field.fieldName}
                        className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <div>
                        <p className="text-white">Field Code : {field.code}</p>
                        <p className="text-white">Field Name : {field.fieldName}</p>
                    </div>
                    <div className="flex justify-end">
                        <h3 className="text-white mb-3">Are you sure delete this field?</h3>
                    </div>
                </div>
            </MainModal>
        </>
    )
}

export default DeleteField;