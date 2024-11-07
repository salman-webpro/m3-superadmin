import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import RestaurantsTable from "@/components/Tables/RestaurantsTable";
import ActivityTable from "@/components/Tables/ActivityTable";
import ResPenData from "@/components/Json/PendingRestaurent.json";
import PendingRestaurantTable from "@/components/Tables/PendingRestaurantTable";

const headerAll = [
    {
        accessorKey: "Restaurant_Name",
        header: "Restaurant name",
    },
    {
        accessorKey: "active_Package",
        header: "Active package",
    },
    {
        accessorKey: "total_branches",
        header: "Total branches",
    },
    {
        accessorKey: "menu_scanned",
        header: "Menu scanned",
    },
    {
        accessorKey: "Onboarded_on",
        header: "Onboarded on",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
];

const headerPend = [
    {
        accessorKey: "Restaurant_Name",
        header: "Restaurant name",
    },
    {
        accessorKey: "owner_Name",
        header: "Owner",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "date_time",
        header: "Date & Time",
    },
];
const Page = () => {
    return (
        <>
            <Tabs defaultValue="all-restaurants" className="w-full">
                <TabsList
                    className="flex text-[14px] pt-8 pb-7 px-3 border-b border-r border-l mt-[-17px] rounded-b-lg transition-all ease-in-out duration-1000">
                    <TabsTrigger value="all-restaurants">All restaurants</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                <TabsContent value="all-restaurants" className="pb-8">
                    <RestaurantsTable header={headerAll}/>
                </TabsContent>
                <TabsContent value="pending">
                    <PendingRestaurantTable header={headerPend} data={ResPenData}/>
                </TabsContent>
            </Tabs>
        </>
    );
};
export default Page;
