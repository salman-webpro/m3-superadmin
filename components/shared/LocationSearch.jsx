'use client'
import React, {useState, useRef, useEffect} from 'react';
import {LoadScript, StandaloneSearchBox} from '@react-google-maps/api';
import {GoLocation} from "react-icons/go";

const libraries = ['places'];

export default function LocationSearch ({setLocation}) {
    const [searchBox, setSearchBox] = useState(null);
    const [places, setPlaces] = useState([]);
    const searchBoxRef = useRef();
    const [reload , setReload] = useState(false)
    // const reloadPage = () => {
    //     window.location.reload();
    // }
    // useEffect(() => {
    //     setReload(true)
    //     reloadPage()
    // }, [!reload]);
    const onLoad = (ref) => {
        setSearchBox(ref);
    };

    const onPlacesChanged = () => {
        const placesResult = searchBox.getPlaces();
        setPlaces(placesResult);
        setLocation(placesResult[0]?.name)
    };
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBikJ9bLFewOG7XUwOyF40DJkBiC8UfgaM"
            libraries={libraries}
        >
                <label className="relative block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-5">
                       <GoLocation size="18px" color={"#6C757D"}/>
                    </span>
                    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                    <input
                        type="text"
                        placeholder="Search places"
                        ref={searchBoxRef}
                        className="w-[300px] h-[36px] placeholder:text-secondary-500 placeholder:text-14 block bg-secondary-50 border border-secondary-100 rounded-md py-2 pl-12 pr-3 focus:outline-none focus:border sm:text-sm"
                    />
                    </StandaloneSearchBox>
                </label>
        </LoadScript>
    );
};
