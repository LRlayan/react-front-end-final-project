import MainModal from "../../components/modal/MainModal.tsx";
import {useDispatch} from "react-redux";
import {Crop} from "../../model/Crop.ts";
import {deleteCrop} from "../../reducer/CropSlice.ts";
import React, {useEffect, useState} from "react";

const DeleteCrop: React.FC<{isOpen: boolean; onClose: () => void}> = ({isOpen, onClose, crop}) => {
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
        const delCrop = new Crop("",cropName,scientificName,category,season,image);
        dispatch(deleteCrop(delCrop))
    }

    return(
        <>
            <MainModal isType="DELETE CROP" buttonType="Delete" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <h3>Are you sure delete this crop?</h3>
                </div>
            </MainModal>
        </>
    )
}

export default DeleteCrop;