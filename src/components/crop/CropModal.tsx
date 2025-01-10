export function CropModal({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> },props,children) {
    if (!open) return null; // If `open` is false, don't render the modal

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                        <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold text-white"
                                        id="modal-title">{props.children}</h3>
                                    <div className="mt-2">
                                        <form action="#" method="POST">
                                            {/*crop name */}
                                            <div className="mb-4">
                                                <label htmlFor="crop-name"
                                                       className="block text-sm font-medium text-gray-50">Crop
                                                    Name</label>
                                                <input type="text" id="crop-name" name="crop-name"
                                                       className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                       onChange={(e) => props.setCropName(e.target.value)}
                                                />
                                            </div>

                                            {/*scientific name */}
                                            <div className="mb-4">
                                                <label htmlFor="scientific-name"
                                                       className="block text-sm font-medium text-gray-50">Scientific
                                                    Name</label>
                                                <input type="text" id="scientific-name" name="scientific-name"
                                                       className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                       onChange={(e) => props.setscientificName(e.target.value)}
                                                />
                                            </div>

                                            {/*// category */}
                                            <div className="mb-4">
                                                <label htmlFor="category"
                                                       className="block text-sm font-medium text-gray-50">Category</label>
                                                <input type="text" id="category" name="category"
                                                       className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                       onChange={(e) => props.setCategory(e.target.value)}
                                                />
                                            </div>

                                            {/*// season*/}
                                            <div className="mb-4">
                                                <label htmlFor="email"
                                                       className="block text-sm font-medium text-gray-50">Season</label>
                                                <input type="text" id="season" name="season"
                                                       className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                       onChange={(e) => props.setSeason(e.target.value)}
                                                />
                                            </div>
                                            {/*// crop image*/}
                                            <div className="mb-4">
                                                <label htmlFor="email"
                                                       className="block text-sm font-medium text-gray-50">Crop Image</label>
                                                <input type="file" id="cropImage" name="cropImage" accept="image/*"
                                                       className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                       onChange={(e) => props.setImage(e.target.value)}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    onClick={props.handleSubmit}>Save
                            </button>
                            <button type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-10 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}>Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
