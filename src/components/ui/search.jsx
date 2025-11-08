import React from "react";
import Button from "./button";
import { classNames } from '../../utils/classNames';
import { SearchIcon } from '../../utils/assets.jsx';

export const SearchButton = () => {
    return (
        <>
        <Button 
            variant="secondary" > 
            < SearchIcon />
        </Button></> )
};