'use client'
import {MdOutlineDonutSmall, MdOutlineWorkHistory} from "react-icons/md";
import {MdOutlineDomain} from "react-icons/md";
import {usePathname} from 'next/navigation'
import IndividualNavItem from "@/components/IndividualNavItem";
import { GoLocation } from "react-icons/go";


export default function NavItem() {
    const pathname = usePathname()
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">

            <IndividualNavItem path={"/"} pathname={pathname}>
                <MdOutlineDonutSmall className="h-6 w-6"/>
                Insights
            </IndividualNavItem>

            <IndividualNavItem path={"/all-restaurants"} pathname={pathname}>
                <MdOutlineDomain className="h-6 w-6"/>
                Restaurants{" "}
            </IndividualNavItem>

            <IndividualNavItem path={"/find-leads"} pathname={pathname}>
                <GoLocation className="h-6 w-6"/>
                Find leads{" "}
            </IndividualNavItem>

            <IndividualNavItem path={"/activity-log"} pathname={pathname}>
                <MdOutlineWorkHistory className="h-6 w-6"/>
                Activity log
            </IndividualNavItem>

        </nav>

    )
}