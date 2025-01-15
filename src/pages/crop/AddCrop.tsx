import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addCrop } from "../../reducer/CropSlice.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import {Crop} from "../../model/Crop.ts";
import {IdGenerator} from "../../util/IdGenerator.ts";
import {Input} from "antd";
import Label from "../../components/label/Label.tsx";

const AddCrop: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const crops = useSelector((state) => state.crop.crops);

    const idGenerator = new IdGenerator();

    const handleSubmit = () => {
        const getLastCropCode = crops.length > 0 ? crops[crops.length - 1].code : "CROP-";
        const newCode = idGenerator.codeGenerator("CROP",getLastCropCode);
        const newCrop = new Crop(newCode,cropName,scientificName,category,season,image);
        dispatch(addCrop(newCrop));
        onClose();
    };

    return (
        <MainModal isType="ADD CROP" buttonType="Save" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <form>
                <div className="mb-4">
                    <Label labelName={"Crop Name"}/>
                    <Input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setCropName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label labelName={"Scientific Name"}/>
                    <Input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setScientificName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label labelName={"Category"}/>
                    <Input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Label labelName={"Season"}/>
                    <Input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setSeason(e.target.value)}
                    />
                </div>
                <div className="mb-4">
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
