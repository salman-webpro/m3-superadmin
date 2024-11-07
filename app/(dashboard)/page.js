import Link from "next/link"
import { Button } from "@/components/ui/button"

import GrowthRateChart from "@/components/GrowthRateChart";
import RestaurantsTable from "@/components/Tables/RestaurantsTable";
const headerAll = [
    {
        accessorKey: 'Restaurant_Name',
        header: 'Restaurant name',
    },
    {
        accessorKey: 'active_Package',
        header: 'Active package',
    },
    {
        accessorKey: 'total_branches',
        header: 'Total branches',
    },
    {
        accessorKey: 'menu_scanned',
        header: 'Menu scanned',
    },
    {
        accessorKey: 'Onboarded_on',
        header: 'Onboarded on',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
]
export default function Dashboard() {
    return (
        <>
            <GrowthRateChart/>

            <div className={'mt-6'}>
                <div className={'flex flex-col py-3 px-5 border border-b-0 rounded-t-lg'}>
                    <span className={'text-24 font-lightBold'}>Most Recent Signups</span>
                    <span className={'text-14 font-normal text-secondary-400'}>Restaurants that are joined recently. </span>
                </div>
                <RestaurantsTable insights={true} header={headerAll}/>
            </div>
        </>
    )
}


