import MainModal from "../../components/modal/MainModal.tsx";
import {useDispatch} from "react-redux";
import {Crop} from "../../model/Crop.ts";
import {deleteCrop} from "../../reducer/CropSlice.ts";
import React, {useEffect, useState} from "react";

const DeleteCrop: React.FC<{isOpen: boolean; onClose: () => void; crop:Crop; isType:string; buttonType:string}> = ({isOpen, onClose, crop, isType, buttonType}) => {

    const dispatch = useDispatch();
    const [cropCode, setCropCode] = useState<string | number>("");
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [image, setImage] = useState<File | null>();

    useEffect(() => {
        if (crop) {
            setCropCode(crop.code);
            setCropName(crop.cropName);
            setScientificName(crop.scientificName);
            setCategory(crop.category);
            setSeason(crop.season);
            setImage(crop.image);
        }
    }, [crop]);

    const handleSubmit = () => {
        const delCrop = new Crop(cropCode, cropName, scientificName, category, season, image);
        dispatch(deleteCrop(delCrop))
    }

    return(
        <>
            <MainModal isType={isType} buttonType={buttonType} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <img
                        src={crop.image ? URL.createObjectURL(crop.image) : ""}
                        alt={crop.cropName || "Crop Image"}
                        className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <div>
                        <p className="text-white">Crop Code : {crop.code}</p>
                        <p className="text-white">Crop Name : {crop.cropName}</p>
                    </div>
                    <div className="flex justify-end">
                        <h3 className="text-white mb-3">Are you sure delete this crop?</h3>
                    </div>
                </div>
            </MainModal>
        </>
    )
}

export default DeleteCrop;