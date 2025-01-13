import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCrop } from "../../reducer/CropSlice.ts";
import CropModal from "../../components/crop/CropModal.tsx";
import {Crop} from "../../model/Crop.ts";

const AddCrop: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = () => {
        const newCrop = new Crop("",cropName,scientificName,category,season,image);
        dispatch(addCrop(newCrop));
        onClose();
    };

    return (
        <CropModal isType="ADD CROP" buttonType="Save" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-50">Crop Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setCropName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-50">Scientific Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setScientificName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-50">Category</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-50">Season</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setSeason(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-50">Crop Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
            </form>
        </CropModal>
    );
};

export default AddCrop;
