import MainModal from "../../components/modal/MainModal.tsx";
import {useDispatch} from "react-redux";
import {Crop} from "../../model/Crop.ts";
import {deleteCrop} from "../../reducer/CropSlice.ts";
import React, {useEffect, useState} from "react";
import {Field} from "../../model/Field.ts";
import {Log} from "../../model/Log.ts";
import {AppDispatch} from "../../store/store.ts";

const DeleteCrop: React.FC<{isOpen: boolean; onClose: () => void; crop:Crop; isType:string; buttonType:string}> = ({isOpen, onClose, crop, isType, buttonType}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [cropCode, setCropCode] = useState<string>("");
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [selectedFields, setFields] = useState<Field[]>([]);
    const [selectedLogs, setLogs] = useState<Log[]>([]);
    const [image, setImage] = useState<File | null | undefined>();

    useEffect(() => {
        if (crop) {
            setCropCode(crop.code);
            setCropName(crop.name);
            setScientificName(crop.scientificName);
            setCategory(crop.category);
            setSeason(crop.season);
            setImage(crop.image);
            setFields(crop.assignFields);
            setLogs(crop.assignLogs);
        }
    }, [crop]);

    const handleSubmit = () => {
        new Crop(cropCode, cropName, scientificName, category, season, image, selectedFields,selectedLogs);
        dispatch(deleteCrop(cropCode))
    }

    return(
        <>
            <MainModal isType={isType} buttonType={buttonType} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <img
                        src={crop.image ? URL.createObjectURL(crop.image) : ""}
                        alt={crop.name || "Crop Image"}
                        className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <div>
                        <p className="text-white">Crop Code : {crop.code}</p>
                        <p className="text-white">Crop Name : {crop.name}</p>
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