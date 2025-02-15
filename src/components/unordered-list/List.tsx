import React from 'react';

interface ListProps {
    listName:string;
    count: number;
    id: string;
}

const List: React.FC<ListProps> = ({
    listName,
    count,
    id
}) => {
    return(
        <>
            <li className="flex justify-between border-b border-gray-600 pb-1">
                {listName} <span id={id} className="font-bold">{count}</span>
            </li>
        </>
    )
}

export default List;