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
import {
  MdOutlineSortByAlpha,
  MdOutlineFileDownload,
  MdOutlineImage,
} from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SwitchDemo from "@/components/Switch/Switch";
import Link from "next/link";
import dayjs from "dayjs";
import { getResData, getResFile } from "@/utils/getData";
import { useEffect, useState } from "react";
import SearchBar from "@/components/shared/SearchBar";
import { sortRestaurantName } from "@/utils/sorting";
import { toast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { FaSpinner } from "react-icons/fa";
import fetchInterceptor from "@/interceptor";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useCookies } from "next-client-cookies";
import RestaurrantData from "../Json/RestaurentData";
export default function RestaurantsTable({ insights, header }) {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("asc");
  const [searchText, setSearchText] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const [totalData, setTotalData] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  console.log(RestaurrantData);
  const cookies = useCookies();
  useEffect(() => {
    const myFunc = async () => {
      const resData = await getResData(searchText, currentPage);
      setData(resData?.data);
      setTotalData(resData?.count);
      setTotalPages(resData?.total_pages);
    };
    myFunc();
  }, [searchText, currentPage]);
  const MRSData = RestaurrantData?.slice(0, 10);
  console.log(data, "RestaurantsTable");
  const handleSortingByUserName = () => {
    setSort(sort === "asc" ? "desc" : "asc");
    const sortedData = sortRestaurantName(data, sort);
    setData(sortedData);
  };

  const handleDownlaod = async () => {
    toast({
      description: "Downloading...",
      variant: "loading",
      action: (
        <ToastAction altText="Downloading">
          <FaSpinner className="animate-spin text-blue-700" />
        </ToastAction>
      ),
    });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/restaurants/xls-download/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies.get("accessToken")}`,
            "content-type": "application/json",
          },
        }
      );
      const obj = await res.json();
      const fileUrl = obj?.data?.file_url;
      downloadFromUrl(fileUrl);
      toast({
        variant: "success",
        description: "File Downloaded successfully!",
        action: <ToastAction altText="Success">Success</ToastAction>,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "File Download failed",
        action: (
          <ToastAction altText="Error">
            <MdOutlineErrorOutline className="text-3xl text-red-700 animate-pulse  " />
          </ToastAction>
        ),
      });
    }
  };
  return (
    <>
      {!insights && (
        <div
          className={
            "flex flex-row border-r border-t border-l rounded-t-lg items-center mt-5"
          }
        >
          <div className={"basis-2/4"}>
            <div className={"flex items-center"}>
              <div className={"flex flex-row gap-4 py-1 px-5"}>
                <MdOutlineSortByAlpha
                  size="24px"
                  className={"cursor-pointer"}
                  color={"#4BA26F"}
                  onClick={handleSortingByUserName}
                />
                <MdOutlineFileDownload
                  onClick={handleDownlaod}
                  size="24px"
                  className={"cursor-pointer"}
                  color={"#4BA26F"}
                />
              </div>
              <SearchBar
                placeholder={"Search restaurants"}
                setSearchText={setSearchText}
                searchText={searchText}
              />
            </div>
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
      )}
      <div
        className={
          insights
            ? "rounded-b-md border"
            : "rounded-b-md border h-[650px] overflow-auto"
        }
      >
        <Table className={""}>
          <TableHeader className={"bg-primary-100 text-12 tracking-16"}>
            <TableRow>
              {header?.map((header) => (
                <TableHead
                  key={header?.accessorKey}
                  className={
                    header?.accessorKey === "Restaurant_Name"
                      ? "p-4 w-[646px]"
                      : "p-0"
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

          {!insights ? (
            <TableBody className="text-16">
              {RestaurrantData?.map((data) => (
                <TableRow
                  key={data?.id}
                  className="text-secondary-600 font-normal"
                >
                  <Link
                    href={`/all-restaurants/${data?.slug}`}
                    className={"w-full"}
                  >
                    <TableCell className={"text-16 font-normal w-[646px]"}>
                      <div className={"flex items-center gap-2"}>
                        <Avatar className={"w-[30px] h-[30px] rounded-[50%]"}>
                          <AvatarImage src={data?.image} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>{" "}
                        {data?.name}
                      </div>
                    </TableCell>
                  </Link>
                  <TableCell className="font-medium text-12 text-nowrap pl-[8px] w-[200px]">
                    <span
                      className={
                        data?.active_Package === "Free For All"
                          ? "bg-blanchedAlmond text-black font-medium rounded-[15px] py-[5px] px-[10px]"
                          : data?.active_Package === "Restaurant Automation"
                          ? "bg-lightCyan text-black rounded-[15px] py-[5px] px-[10px]"
                          : data?.active_Package === "Order Management"
                          ? "bg-magnolia text-black rounded-[15px] py-[5px] px-[10px]"
                          : ""
                      }
                    >
                      {data?.active_Package}
                    </span>
                  </TableCell>

                  <TableCell
                    className={"text-16 font-normal pl-[8px] w-[200px]"}
                  >
                    {data?.total_branches}
                  </TableCell>
                  <TableCell
                    className={"text-16 font-normal pl-[8px] w-[200px]"}
                  >
                    {data?.menu_scanned}
                  </TableCell>
                  <TableCell
                    className={
                      "text-16 font-normal pl-[8px] whitespace-nowrap w-[300px]"
                    }
                  >
                    {dayjs(`${data?.onboarded_on}`).format(
                      "DD MMM, YYYY - h:mm A"
                    )}
                  </TableCell>
                  <TableCell className={"pl-[8px] w-[100px]"}>
                    <div>
                      <SwitchDemo active={data?.active} slug={data?.slug} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody className="text-16">
              {MRSData?.map((data) => (
                <TableRow
                  key={data?.id}
                  className="text-secondary-600 font-normal"
                >
                  <Link
                    href={`/all-restaurants/${data?.slug}`}
                    className={"w-full"}
                  >
                    <TableCell className={"text-16 font-normal w-[646px]"}>
                      <div className={"flex items-center gap-2"}>
                        <Avatar className={"w-[30px] h-[30px] rounded-[50%]"}>
                          <AvatarImage src={data?.image} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>{" "}
                        {data?.name}
                      </div>
                    </TableCell>
                  </Link>
                  <TableCell className="font-medium text-12 text-nowrap pl-[8px] w-[200px]">
                    <span
                      className={
                        data?.active_Package === "Free For All"
                          ? "bg-blanchedAlmond text-black font-medium rounded-[15px] py-[5px] px-[10px]"
                          : data?.active_Package === "Restaurant Automation"
                          ? "bg-lightCyan text-black rounded-[15px] py-[5px] px-[10px]"
                          : data?.active_Package === "Order Management"
                          ? "bg-magnolia text-black rounded-[15px] py-[5px] px-[10px]"
                          : ""
                      }
                    >
                      {data?.active_Package}
                    </span>
                  </TableCell>

                  <TableCell
                    className={"text-16 font-normal pl-[8px] w-[200px]"}
                  >
                    {data?.total_branches}
                  </TableCell>
                  <TableCell
                    className={"text-16 font-normal pl-[8px] w-[200px]"}
                  >
                    {data?.menu_scanned}
                  </TableCell>
                  <TableCell
                    className={"text-16 font-normal pl-[8px] w-[300px]"}
                  >
                    {dayjs(`${data?.onboarded_on}`).format(
                      "DD MMM, YYYY - h:mm A"
                    )}
                  </TableCell>
                  <TableCell className={"pl-[8px] w-[100px]"}>
                    <div>
                      <SwitchDemo active={data?.active} slug={data?.slug} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </>
  );
}
