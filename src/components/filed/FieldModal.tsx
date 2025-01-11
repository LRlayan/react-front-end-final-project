export function FieldModal({
                              open,
                              setOpen,
                              setFieldName,
                              setLocation,
                              setExtentSize,
                              setImage,
                              handleSubmit,
                              children,
                          }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setFieldName: (value: string) => void;
    setLocation: (value: string) => void;
    setExtentSize: (value: string) => void;
    setImage: (value: File | null) => void;
    handleSubmit: () => void;
    children?: React.ReactNode;
}) {
    if (!open) return null;
    return(
        <>
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
                                            id="modal-title">{children}</h3>
                                        <div className="mt-2">
                                            <form action="#" method="POST">
                                                {/*field name */}
                                                <div className="mb-4">
                                                    <label htmlFor="field-name"
                                                           className="block text-sm font-medium text-gray-50">Field
                                                        Name</label>
                                                    <input type="text" id="field-name" name="field-name"
                                                           className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                           onChange={(e) => setFieldName(e.target.value)}
                                                    />
                                                </div>

                                                {/*Location */}
                                                <div className="mb-4">
                                                    <label htmlFor="location"
                                                           className="block text-sm font-medium text-gray-50">Location</label>
                                                    <input type="text" id="location" name="location"
                                                           className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                           onChange={(e) => setLocation(e.target.value)}
                                                    />
                                                </div>

                                                {/*// Extent Size */}
                                                <div className="mb-4">
                                                    <label htmlFor="extentSize"
                                                           className="block text-sm font-medium text-gray-50">Extent Size</label>
                                                    <input type="text" id="extentSize" name="extentSize"
                                                           className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                           onChange={(e) => setExtentSize(e.target.value)}
                                                    />
                                                </div>

                                                {/*// Field Image*/}
                                                <div className="mb-4">
                                                    <label htmlFor="fieldImage1"
                                                           className="block text-sm font-medium text-gray-50">Field Image</label>
                                                    <input type="file" id="fieldImage1" name="fieldImage1"
                                                           className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                           onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-green-600 px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                        onClick={handleSubmit}>Save
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
        </>
    )
}