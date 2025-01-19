import React from "react";
import {SelectProps, Tag} from "antd";

type TagRender = SelectProps['tagRender'];

const tagRendering: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginInlineEnd: 4,
                backgroundColor: 'brown',
                color: 'black',
                border: '1px solid #d9d9d9',
            }}
        >
            {label}
        </Tag>
    );
};

export default tagRendering;
