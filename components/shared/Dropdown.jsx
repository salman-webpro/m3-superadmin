'use client'
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Dropdown({placeholder, setSelectedType, setSelectedRadius}) {
    const [selectedValue, setSelectedValue] = React.useState('restaurants');
    const handleFruitChange = (value) => {
        if (setSelectedType) {
            setSelectedType(value)
        } else if (setSelectedRadius) {
            setSelectedRadius(value)
        }
        // setSelectedValue(value);
    };
    // console.log(selectedValue)
    return (
        <>
            {
                setSelectedType ? (
                        <Select className="bg-red-400 focus:ring-1" value={selectedValue} onValueChange={handleFruitChange} disabled>
                            <SelectTrigger className="w-[180px] h-[36px] bg-secondary-50">
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="restaurants">Restaurants</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    ) :
                    (
                        <Select className="bg-red-400" onValueChange={handleFruitChange}>
                            <SelectTrigger className="w-[180px] h-[36px] bg-secondary-50">
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="5">5 km</SelectItem>
                                    <SelectItem value="10">10 km</SelectItem>
                                    <SelectItem value="15">10 km</SelectItem>
                                    <SelectItem value="20">20 km</SelectItem>
                                    <SelectItem value="25">25 km</SelectItem>
                                    <SelectItem value="30">30 km</SelectItem>
                                    <SelectItem value="35">35 km</SelectItem>
                                    <SelectItem value="40">40 km</SelectItem>
                                    <SelectItem value="45">45 km</SelectItem>
                                    <SelectItem value="50">50 km</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )
            }
        </>

    )
}
