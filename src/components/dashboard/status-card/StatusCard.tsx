import React from "react";

interface StatusCardProps {
    statusCardType: string;
    children:React.ReactNode;
}

const StatusCard: React.FC<StatusCardProps> = ({
    statusCardType,
    children
}) => {
    return (
        <>
            <h5 className="text-lg font-medium">{statusCardType}</h5>
            {children}
        </>
    )
}

export default StatusCard;