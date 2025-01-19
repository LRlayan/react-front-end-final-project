import React from "react";
import {Crop} from "../../model/Crop.ts";
import {Button} from "antd";

interface CardProps {
    filteredCrop: Crop[];
    openUpdateModal: (crop:Crop) => void;
    openDeleteModal: (crop:Crop) => void;
}

const Card: React.FC<CardProps> = ({
    filteredCrop,
    openUpdateModal,
    openDeleteModal,
}) => {
    return(
        <>
            {filteredCrop.map((crop:Crop, index:number) => (
                <div key={index} className="border rounded-lg bg-gray-700 text-white p-4 shadow-md">
                    {crop.image && (
                        <img
                            src={URL.createObjectURL(crop.image)}
                            alt={crop.cropName}
                            className="w-full h-32 object-cover rounded-md mb-2"
                        />
                    )}
                    <h4 className="text-lg font-semibold">{crop.code}</h4>
                    <p className="text-sm">Scientific Name: {crop.cropName}</p>
                    <p className="text-sm">Scientific Name: {crop.scientificName}</p>
                    <p className="text-sm">Category: {crop.category}</p>
                    <p className="text-sm">Season: {crop.season}</p>
                    <p className="text-sm">Fields: {crop.assignFields.map((f) => f.fieldName).join(", ")}</p>
                    <div className="flex space-x-2 mt-2">
                        {/* Update Button */}
                        <Button
                            type="primary"
                            className="btn bg-green-500 hover:bg-green-600 text-white"
                            style={{width: '140px'}}
                            onClick={() => openUpdateModal(crop)}
                        >
                            Update
                        </Button>

                        {/* Delete Button */}
                        <Button
                            className="btn bg-red-500 hover:bg-red-600 text-white border-red-500"
                            style={{width: '140px'}}
                            onClick={() => openDeleteModal(crop)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Card;