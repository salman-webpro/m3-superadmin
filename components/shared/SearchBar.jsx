"use client";
import React from "react";
import {MdOutlineSearch} from "react-icons/md";
import {GoLocation} from "react-icons/go";
import {CgNotes} from "react-icons/cg";


const SearchBar = ({searchText, setSearchText, placeholder}) => {
    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };
    return (
        <div>
            <div className={"p-2"}>
                <label className="relative block">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-5">
                        <CgNotes size="18px" color={"#6C757D"}/>
                    </span>
                    <input
                        className="w-[300px] h-[36px] placeholder:text-secondary-500 placeholder:text-14 block bg-secondary-50 border border-secondary-100 rounded-md py-2 pl-12 pr-3 focus:outline-none focus:border sm:text-sm"
                        placeholder={placeholder}
                        type="text"
                        name="search"
                        onChange={handleInputChange}
                        value={searchText}
                    />
                </label>
            </div>
        </div>
    );
};

export default SearchBar;
