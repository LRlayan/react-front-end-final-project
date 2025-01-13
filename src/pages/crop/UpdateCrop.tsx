import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {Crop} from "../../model/Crop.ts";
import {updateCrop} from "../../reducer/CropSlice.ts";
import CropModal from "../../components/crop/CropModal.tsx";


const UpdateCrop: React.FC<{ isOpen: boolean; onClose: () => void }> = ({isOpen, onClose, crop}) => {

    useEffect(() => {
        if (crop) {
            setCropName(crop.cropName);
            setScientificName(crop.scientificName);
            setCategory(crop.category);
            setSeason(crop.season);
            setImage(crop.image);
        }
    }, [crop]);

    const dispatch = useDispatch();
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = () => {
        const updateCropDetails = new Crop("", cropName, scientificName, category, season, image);
        dispatch(updateCrop(updateCropDetails))
    }

    return (
        <>
            <CropModal isType="UPDATE CROP"  buttonType="Update" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
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
        </>
    )
}

export default UpdateCrop;