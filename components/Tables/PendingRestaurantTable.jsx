"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import PaginationDemo from "@/components/Tables/Pagination";
import {MdOutlineSortByAlpha, MdOutlineImage} from "react-icons/md";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import AcceptDialogBox from "@/components/AcceptDialogBox";
import DenyDialogBox from "@/components/DenyDialogBox";
import SearchBar from "../shared/SearchBar";
import {getPendingResturant} from "@/utils/getData";
import {sortUserName, sortCreatedAt} from "@/utils/sorting";

export default function PendingRestaurantTable({header, activity}) {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState("asc");
    const [searchText, setSearchText] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;
    const [totalData, setTotalData] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [reFetch , setReFetch] = useState(false);

    useEffect(() => {
        const myFunc = async () => {
            const pendingRestaurantData = await getPendingResturant(
                searchText,
                currentPage
            );
            console.log(
                "🚀 ~ myFunc ~ pendingRestaurantData:",
                pendingRestaurantData?.data
            );

            setData(pendingRestaurantData?.data);
            setTotalData(pendingRestaurantData?.count);
            setTotalPages(pendingRestaurantData?.total_pages);
        };
        myFunc();
    }, [searchText, currentPage , reFetch]);

    const handleSortingByCreatedAt = () => {
        setSort(sort === "asc" ? "desc" : "asc");
        const sortedData = sortCreatedAt(data, sort);
        setData(sortedData);
    };

    const handleSortingByUserName = () => {
        setSort(sort === "asc" ? "desc" : "asc");
        const sortedData = sortUserName(data, sort);
        setData(sortedData);
    };
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (rowIndex) => {
        setIsHovered(rowIndex);
    };

    const handleMouseLeave = (e) => {
        setIsHovered(null);
    };

    return (
        <>
            <div
                className={
                    "flex flex-row border-r border-t border-l rounded-t-lg items-center mt-5"
                }
            >
                <div className={"basis-2/4 flex items-center"}>
                    <div
                        className={"px-5 cursor-pointer"}
                        onClick={handleSortingByUserName}
                    >
                        <MdOutlineSortByAlpha size="24px" color={"#4BA26F"}/>
                    </div>
                    <SearchBar
                        placeholder={'Search restaurants'}
                        activity={activity}
                        setSearchText={setSearchText}
                        searchText={searchText}
                    />
                </div>
                <div className={"basis-2/4"}>
                    <PaginationDemo
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        totalData={totalData}
                        totalPages={totalPages}
                    />
                </div>
            </div>
            <div className={"rounded-b-md border h-[650px] overflow-auto"}>
                <Table>
                    <TableHeader className={"bg-primary-100 text-12 tracking-16"}>
                        <TableRow>
                            {header?.map((header) => (
                                <TableHead
                                    key={header.accessorKey}
                                    className={
                                        header?.accessorKey === "Restaurant_Name"
                                            ? "text-left"
                                            : header?.accessorKey === "email"
                                                ? "p-0 text-left w-[350px]"
                                                : "p-0 text-left"
                                    }
                                >
                                    <div className={"flex items-center gap-2 text-secondary-800"}>
                                        <div>
                                            {header?.accessorKey === "Restaurant_Name" && (
                                                <MdOutlineImage size={"24px"}/>
                                            )}
                                        </div>
                                        <div className={"text-12 font-medium"}>
                                            {header?.header}
                                        </div>
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-16 m-6">
                        {data?.map((data, index) => (
                            <TableRow
                                key={data?.id}
                                className="text-secondary-600 font-normal relative group transition-all ease-in-out duration-500"
                                onMouseEnter={() => handleMouseEnter(data?.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <TableCell className={"text-16 font-normal w-[696px]"}>
                                    <div className={"flex items-center gap-2"}>
                                        <Avatar className={"w-[30px] h-[30px] rounded-[50%]"}>
                                            <AvatarImage src={data?.image}/>
                                            <AvatarFallback>n/a</AvatarFallback>
                                        </Avatar>{" "}
                                        {data?.name ?? "N/A"}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-16 pl-[8px] w-[250px]">
                                    <div className={"flex items-center gap-2 "}>
                                        <Avatar className={"w-[30px] h-[30px] rounded-[50%]"}>
                                            <AvatarImage src={data?.owner_image}/>
                                            <AvatarFallback>N/A</AvatarFallback>
                                        </Avatar>{" "}
                                        {data?.owner ?? "N/A"}
                                    </div>
                                </TableCell>
                                <TableCell
                                    className={"text-16 font-normal pl-[8px]  w-[350px]"}
                                >
                                    {data?.email ?? "N/A"}{" "}
                                </TableCell>

                                <TableCell
                                    className={"text-16 font-normal pl-[8px] whitespace-nowrap"}
                                >
                  <span className="overflow-hidden text-ellipsis">
                    {dayjs(`${data?.date_time}`).format(
                        `${
                            isHovered === data?.id
                                ? "DD MMM, YYYY - h:mm ... "
                                : "DD MMM, YYYY - h:mm A"
                        }`
                    )}
                  </span>
                                </TableCell>

                                <TableCell
                                    className={`${
                                        isHovered === data?.id ? "visible" : "invisible"
                                    } absolute top-0 right-0 group-hover:right-[2%] flex items-center justify-center transition-all ease-in-out duration-500`}
                                >
                                    <AcceptDialogBox user_id = {data?.id} setReFetch={setReFetch} reFetch={reFetch}/>
                                    <DenyDialogBox user_id = {data?.id} setReFetch={setReFetch} reFetch={reFetch}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
