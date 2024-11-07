import React from 'react'
import {getResDetails} from "@/utils/getData";

export default async function BranchQuickData({data, getSlug}) {
    const resData = await getResDetails(getSlug);
    const restaurentQuictData = resData?.data?.restaurant_quickdata;
    console.log(data)
    return (
        <div className={' border rounded-[16px]'}>
            <div className={'grid grid-cols-12 items-center justify-center'}>
                <div className={'col-span-3 text-center border-r p-5'}>
                    <div className={'grid justify-center items-center'}>
                        <span className={'text-32 font-lightBold'}>{restaurentQuictData?.total_branches}</span>
                        <span className={'text-16 font-normal text-secondary-500'}>Total Branches</span>
                    </div>
                </div>
                <div className={'col-span-3 text-center border-r p-5'}>
                    <div className={'grid justify-center items-center'}>
                        <span className={'text-32 font-lightBold'}>{restaurentQuictData?.total_activeMenu}</span>
                        <span className={'text-16 font-normal text-secondary-500'}>Total Active Menus</span>
                    </div>
                </div>
                <div className={'col-span-3 text-center border-r p-5'}>
                    <div className={'grid justify-center items-center'}>
                        <span className={'text-32 font-lightBold'}>{restaurentQuictData?.total_orders}</span>
                        <span className={'text-16 font-normal text-secondary-500'}>Total Order</span>
                    </div>
                </div>
                <div className={'col-span-3 text-center p-5'}>
                    <div className={'grid justify-center items-center'}>
                        <span className={'text-32 font-lightBold'}>{restaurentQuictData?.total_scans}</span>
                        <span className={'text-16 font-normal text-secondary-500'}>Total Scans</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
