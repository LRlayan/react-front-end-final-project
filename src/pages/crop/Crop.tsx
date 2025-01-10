import { useState } from "react";
import { CropModal } from "../../components/crop/CropModal.tsx";

export function Crop() {
    const [open, setOpen] = useState(false);

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
                            onClick={() => setOpen(true)} // Open the modal on button click
                        >
                            New
                        </button>
                    </div>

                    {/* Crop Card */}
                    <div id="cropCard" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Add card dynamically */}
                    </div>
                </div>
            </section>

            {/* Pass `setOpen` as prop to CropModal */}
            <CropModal open={open} setOpen={setOpen} />
        </>
    );
}
