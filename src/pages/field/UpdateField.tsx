import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import MainModal from "../../components/modal/MainModal.tsx";
import {Field} from "../../model/Field.ts";
import {updateField} from "../../reducer/FieldSlice.ts";

const UpdateField: React.FC<{isOpen: boolean; onClose: () => void}> = ({ isOpen, onClose, field }) =>{

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
            <MainModal isType="UPDATE CROP" buttonType={"Update"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Field Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setFieldName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Location</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Extent Size</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setExtentSize(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Field Image</label>
                        <input
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