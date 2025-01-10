import {useDispatch} from "react-redux";
import {useState} from "react";
import {CropModal} from "../../components/crop/CropModal.tsx";
import {Crop} from "../../model/Crop.ts";
import {addCrop} from "../../reducer/CropSlice.ts";

export function AddCrop() {

    const dispatch = useDispatch()
    const [cropName,setCropName] = useState("");
    const [scientificName,setScientificName] = useState("");
    const [category,setCategory] = useState("");
    const [season,setSeason] = useState("");

    function handleSubmit() {
        const newCrop = new Crop("",cropName,scientificName,category,season);
        dispatch(addCrop(newCrop));
    }

    return(
        <>
            <CropModal handleSubmit={handleSubmit} setCropName={setCropName} setscientificName={setScientificName} setCategory={setCategory} setSeason={setSeason}>Add Crop</CropModal>
        </>
    )
}