import React from 'react';

interface LabelProps {
    labelName:string;
}

const Label: React.FC<LabelProps> = ({
    labelName
}) => {
    return(
        <>
            <label className="block text-sm font-medium text-gray-50">{labelName}</label>
        </>
    )
}

export default Label;