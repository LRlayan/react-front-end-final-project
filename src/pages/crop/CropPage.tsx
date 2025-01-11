import { useState } from "react";
import { CropModal } from "../../components/crop/CropModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {Crop} from "../../model/Crop.ts";
import {addCrop} from "../../reducer/CropSlice.ts";

export function CropPage() {
    const dispatch = useDispatch()
    const crops = useSelector((state) => state.crop.crops) || []
    const [open, setOpen] = useState(false);
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [image, setImage] = useState<File | null>(null);

    function handleSubmit() {
        const newCrop = new Crop("",cropName,scientificName,category,season,image);
        dispatch(addCrop(newCrop));
        setOpen(false);
    }

    return (
        <>
            <section id="crops-sec" className="mt-4 p-6">
                <div className="container mx-auto">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                id="filterCropCard"
                                type="text"
                                className="form-control w-full rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search crops by name"
                                aria-label="Search"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                                🔍
                            </span>
                        </div>
                    </div>

                    {/* Heading and New Button in One Row */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">
                            Crop Details
                        </h3>
                        <button
                            id="newCropButton"
                            type="button"
                            className="btn bg-green-500 hover:bg-green-600 text-white font-semibold h-10 w-[150px] rounded-md shadow-md flex items-center justify-center"
                            onClick={() => setOpen(true)}>
                            New
                        </button>
                    </div>

                    {/* Crop Card */}
                    <div id="cropCard" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Add card dynamically */}
                        {
                            crops.map((crop, index) => (
                                <div key={index} className="border rounded-lg bg-gray-700 text-white p-4 shadow-md">
                                    {crop.image && (
                                        <img
                                            src={URL.createObjectURL(crop.image)}
                                            alt={crop.cropName}
                                            className="w-full h-32 object-cover rounded-md mb-2"
                                        />
                                    )}
                                    <h4 className="text-lg font-semibold">{crop.code}</h4>
                                    <p className="text-sm">Crop Name: {crop.cropName}</p>
                                    <p className="text-sm">Scientific Name: {crop.scientificName}</p>
                                    <p className="text-sm">Category: {crop.category}</p>
                                    <p className="text-sm">Season: {crop.season}</p>
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            id="updateCrop"
                                            type="button"
                                            className="btn bg-green-500 hover:bg-green-600 text-white font-semibold h-10 w-[150px] rounded-md shadow-md flex items-center justify-center mr-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            id="deleteCrop"
                                            type="button"
                                            className="btn bg-red-500 hover:bg-red-600 text-white font-semibold h-10 w-[150px] rounded-md shadow-md flex items-center justify-center"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Pass `setOpen` as prop to CropModal */}
            <CropModal
                open={open}
                setOpen={setOpen}
                setCropName={setCropName}
                setScientificName={setScientificName}
                setCategory={setCategory}
                setSeason={setSeason}
                setImage={setImage}
                handleSubmit={handleSubmit}
            />
        </>
    );
}
