import React from "react";

interface CountCardProps {
    countCardType: string;
    count: number;
}

const CountCard: React.FC<CountCardProps> = ({
    countCardType,
    count
}) => {
    return(
        <>
             <h5 className="text-lg font-medium">{countCardType}</h5>
             <h2 id="counts" className="text-4xl font-bold">{count}</h2>
        </>
    )
}

export default CountCard;