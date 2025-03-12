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
import { MdOutlineSortByAlpha, MdOutlineImage } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AcceptDialogBox from "@/components/AcceptDialogBox";
import DenyDialogBox from "@/components/DenyDialogBox";
import SearchBar from "../shared/SearchBar";
// import { getActivityLog } from "@/utils/getData";
import { sortUserName, sortCreatedAt } from "@/utils/sorting";
import ActivityData from "@/components/Json/Activity_log";

const stringManuipulation = (str) => {
  const parts = str.split(",");
  const part1 = parts[0].trim();
  const part2 = parts[1].trim();
  const part3 = parts[2].trim();
  return (
    <div>
      <span className={"text-info"}>{part1} </span>
      <span> has </span>
      <span
        className={
          part2 === "Approved"
            ? "text-primary-900 text-16 font-bold"
            : part2 === "Rejected"
            ? "text-denyOne text-16 font-bold"
            : "text-secondary-900 text-16 font-bold"
        }
      >
        {part2}{" "}
      </span>
      <span className={"italic font-normal"}>
        <span>{part3}</span>
      </span>
    </div>
  );
};

export default function ActivityTable({ header, activity }) {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("asc");
  const [searchText, setSearchText] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  console.log("🚀 ~ ActivityTable ~ currentPage:", currentPage);
  const itemsPerPage = 50;
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //   const myFunc = async () => {
  //     const ActivityData = await getActivityLog(searchText, currentPage);
  //     setData(ActivityData?.data);
  //     setTotalData(ActivityData?.count);
  //     setTotalPages(ActivityData?.total_pages);
  //   };
  //   myFunc();
  // }, [searchText, currentPage]);

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
  const [newDate, setDate] = useState();
  useEffect(() => {
    const newDate = new Date().toLocaleString();
    // const day = newDate.get(date);

    setDate(newDate);
  });
  return (
    <>
      <div
        className={
          "flex flex-row border-r border-t border-l rounded-t-lg items-center"
        }
      >
        <div className={"basis-2/4 flex items-center"}>
          <div
            className={"px-5 cursor-pointer"}
            onClick={handleSortingByCreatedAt}
          >
            <MdOutlineSortByAlpha size="24px" color={"#4BA26F"} />
          </div>
          <SearchBar
            placeholder={"Search users"}
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
      <div className={"rounded-b-md border h-[700px] overflow-auto"}>
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
                        <MdOutlineImage size={"24px"} />
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
            {ActivityData?.map((data) => (
              <TableRow
                key={data?.id}
                className="text-secondary-600 font-normal"
              >
                <TableCell className={"text-16 font-normal pl-[8px] w-[300px]"}>
                  {newDate}
                  {/* <span>
                    {" "}
                    {dayjs(`${data?.created_at}`).format(
                      "DD MMM, YYYY - h:mm A"
                    )}
                  </span> */}
                </TableCell>
                <TableCell className={"text-16 font-normal pl-[8px] w-[400px]"}>
                  {" "}
                  {data?.user_name}{" "}
                </TableCell>
                <TableCell className={"text-16 font-normal pl-[8px] w-[846px]"}>
                  {stringManuipulation(data?.name)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
