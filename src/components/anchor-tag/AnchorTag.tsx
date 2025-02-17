import React from 'react';

interface AnchorProps {
    name:string;
    href: string;
    classes: string;
}

const AnchorTag: React.FC<AnchorProps> = ({
    name,
    href,
    classes
}) => {
    return(
        <>
            <a href={href} className={classes}>
                {name}
            </a>
        </>
    )
}

export default AnchorTag;