import React from "react";
import classnames from "classnames";
import styled from "styled-components";


const WrapperIcon = styled.span`
   display: inline-block;
   svg {
       height: 20px;
       float: left;
   }
`;

const Icon = ({ id, svg, className }) => {
    const iconClassName = classnames("svg-icon", {
        [className]: className,
    });

    return <WrapperIcon id={id} className={iconClassName}>
        {svg}
    </WrapperIcon>;
}

export default Icon;
