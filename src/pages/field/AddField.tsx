import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Field} from "../../model/Field.ts";
import {addField} from "../../reducer/FieldSlice.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import {IdGenerator} from "../../util/IdGenerator.ts";

const AddField: React.FC<{isOpen: boolean; onClose: () => void}> = ({isOpen, onClose }) => {

    const dispatch = useDispatch();
    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("");
    const [extentSize, setExtentSize] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const fields = useSelector((state) => state.field.fields);

    const idGenerator = new IdGenerator();

    const handleSubmit = () => {
        const getLastFieldCode = fields.length > 0 ? fields[fields.length - 1].code : "FIELD-";
        const newCode = idGenerator.codeGenerator("FIELD",getLastFieldCode);
        const newField = new Field(newCode,fieldName,location,extentSize,image);
        dispatch(addField(newField));
        onClose();
    }

    return(
        <>
            <MainModal isType="ADD FIELD" buttonType={"Save"} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
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

export default AddField;