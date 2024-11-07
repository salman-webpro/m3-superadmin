import React from 'react'
import {Breadcrumbs} from "@/components/Breadcrumbs/Breadcrumb";
import {IoIosArrowRoundBack} from "react-icons/io";
import Link from "next/link";
import RestaurantInfo from "@/components/RestaurantDetailsComps/RestaurantInfo";
import OwnerInfo from "@/components/RestaurantDetailsComps/OwnerInfo";
import BranchQuickData from "@/components/RestaurantDetailsComps/BranchQuickData";
import Branches from "@/components/RestaurantDetailsComps/Branches";
import RestaurantDetailsData from "@/components/Json/RestaurantDetails.json";
import {getResDetails} from "@/utils/getData";

export default async function RestaurantDetailsPage({params: slug}) {
     const getSlug= slug?.slug;
    console.log('getSlug new',getSlug)

    const resData = await getResDetails(getSlug);
    const restaurentName = resData?.data?.restaurant_info?.restaurant_name;

    return (
        <div>
            <div>
                <div className={'flex items-center'}>
                    <Link href={'/all-restaurants'}>
                        <div
                            className={'flex items-center gap-1 text-secondary-500 pt-[7px] pb-[7px] pr-[10px] pl-[10px] bg-accent rounded-[60px] mr-2 border-[1px] border-solid border-#E9ECEF-50 text-[14px] font-[400] mr-[16px]' }>
                            <IoIosArrowRoundBack size={'18px'}/>
                            Back
                        </div>
                    </Link>
                    <Breadcrumbs restaurentName={restaurentName}/>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 gap-4 pt-5">
                    <div><RestaurantInfo data={RestaurantDetailsData[0]?.restaurant_info} getSlug={getSlug}/></div>
                    <div><OwnerInfo data = {RestaurantDetailsData[0]?.owner_info} getSlug={getSlug}/></div>
                </div>
                <div className={'grid grid-cols-1 grid-rows-1 py-5'}>
                    <BranchQuickData data={RestaurantDetailsData[0]?.restaurant_quickData} getSlug={getSlug}/>
                </div>
                <div className={'grid grid-cols-1 grid-rows-1'}>
                    <Branches data = {RestaurantDetailsData[0]?.branches} getSlug={getSlug}/>
                </div>
            </div>
        </div>
    )
}
