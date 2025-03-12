"use client";
import React, { useEffect, useState } from "react";
import {
  MdOutlineErrorOutline,
  MdOutlineFileDownload,
  MdOutlineSortByAlpha,
} from "react-icons/md";
import SearchBar from "@/components/shared/SearchBar";
import PaginationDemo from "@/components/Tables/Pagination";
import Image from "next/image";
import findLeads from "@/public/find-leads.png";
import Dropdown from "@/components/shared/Dropdown";
import LocationSearch from "@/components/shared/LocationSearch";
import { CiGlobe } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { MdOutlineSearch } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { MdOutlineCall, MdMailOutline } from "react-icons/md";
import { GetLeads } from "@/utils/getLeads";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { FaSpinner } from "react-icons/fa";
import { useCookies } from "next-client-cookies";

export default function FindLeads({ data = true }) {
  const [selectedType, setSelectedType] = React.useState("restaurants");
  const [selectedRadius, setSelectedRadius] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [leads, setLeads] = React.useState([]);
  const [sort, setSort] = React.useState(true);
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [checked, setChecked] = React.useState(true);
  const [reloadOnce, setReloadOnce] = useState(true);
  const cookies = useCookies();
  // window.location.reload()
  // useEffect(() => {
  //     if (reloadOnce) {
  //         setReloadOnce(false); // Prevent further reloads
  //         window.location.reload(); // Reload the page/component once
  //     }
  // }, [reloadOnce]);
  const getFunction = async () => {
    setLoading(true);
    const leadData = await GetLeads(
      selectedType,
      selectedRadius,
      keyword,
      location
    );
    console.log("leadssss", leadData);
    if (leadData.length !== 0) {
      setLoading(false);
    }
    setLeads(leadData?.data);
  };
  // Select Checkbox //
  const selectAll = (checked) => {
    console.log("checked", checked);
    if (checked) {
      const allIds = leads.map((lead) => lead.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  // Sorting //
  const sortLeadsA2Z = async () => {
    const leadData = await GetLeads(
      selectedType,
      selectedRadius,
      keyword,
      location,
      false
    );
    setLeads(leadData?.data);
    setSort(!sort);
  };
  const sortLeadsZ2A = async () => {
    const leadData = await GetLeads(
      selectedType,
      selectedRadius,
      keyword,
      location,
      true
    );
    setLeads(leadData?.data);
    setSort(!sort);
  };
  // Download //
  const selectedLeads = leads?.filter((lead) => selectedIds.includes(lead.id));
  const downloadFromUrl = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "restaurants.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/download-google-map-restaurants/`,
        {
          method: "POST",
          body: JSON.stringify({
            leads: selectedLeads.length === 0 ? leads : selectedLeads,
          }),
          headers: {
            Authorization: `Bearer ${cookies.get("accessToken")}`,
            "content-type": "application/json",
          },
        }
      );
      // const res = downloadLeads()
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
      <div
        className={
          "flex flex-row border-r border-t border-l rounded-t-lg items-center justify-between"
        }
      >
        <div className={"flex items-center"}>
          <div className={"flex items-center"}>
            <div className={"flex flex-row gap-4 py-1 px-5 items-center"}>
              <Checkbox
                id="terms"
                className={
                  "h-[17px] w-[17px] rounded-none border-bg-secondary-50"
                }
                checked={
                  selectedIds?.length === leads?.length && leads?.length !== 0
                }
                onClick={(e) => {
                  selectAll(checked);
                  setChecked(!checked);
                }}
              />
              <MdOutlineSortByAlpha
                size="24px"
                className={"cursor-pointer"}
                color={"#4BA26F"}
                onClick={sort ? sortLeadsZ2A : sortLeadsA2Z}
              />
              <MdOutlineFileDownload
                onClick={handleDownlaod}
                size="24px"
                className={"cursor-pointer"}
                color={"#4BA26F"}
              />
            </div>
            <div className={"border-l border-gray-200 pl-3"}>
              <Dropdown
                setSelectedType={setSelectedType}
                placeholder={"Type"}
              />
            </div>
            {/*keywords*/}
            <SearchBar
              keywords={true}
              placeholder={"Keywords"}
              setSearchText={setKeyword}
              searchText={keyword}
            />
            {/*Location*/}
            <LocationSearch setLocation={setLocation} />
          </div>
          <div className={"pl-2"}>
            <Dropdown
              setSelectedRadius={setSelectedRadius}
              placeholder={"Radius"}
            />
          </div>
          <div className={"pl-2"}>
            <Button
              className={"bg-primary-500 h-[36px]"}
              disabled={
                !keyword || !location || !selectedType || !selectedRadius
              }
              onClick={getFunction}
            >
              {loading ? (
                <RxReload className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <MdOutlineSearch className="mr-2 h-4 w-4" />
              )}
              search
            </Button>
          </div>
        </div>
      </div>
      {/*find leads table*/}
      {leads?.length !== 0 ? (
        <>
          <div className="grid grid-cols-3 grid-rows-1 gap-4 p-3 bg-secondary-50 border rounded-b-[16px] cursor-pointer">
            {leads?.map((lead) => (
              <div
                className={
                  "p-4 bg-white rounded-[10px] border bg-border-secondary-50"
                }
                key={lead.id}
              >
                {" "}
                {/*main div*/}
                <div className={"flex items-center gap-4 mb-4"}>
                  <Checkbox
                    id="terms"
                    checked={selectedIds.includes(lead.id)}
                    className={
                      "h-[17px] w-[17px] rounded-none border-bg-secondary-50"
                    }
                    onClick={() => toggleSelect(lead.id)}
                  />
                  <span className={"text-24 font-normal"}>{lead?.name}</span>
                </div>
                <div className={"flex gap-6 items-center mb-2"}>
                  <div className={"flex gap-2 items-center"}>
                    <MdOutlineCall size={17} className={"text-secondary-400"} />
                    <span className={"text-16 font-normal"}>
                      {lead?.phone ? lead?.phone : "NA"}
                    </span>
                  </div>
                  <div className={"flex gap-2 items-center"}>
                    <MdMailOutline size={17} className={"text-secondary-400"} />
                    <span className={"text-16 font-normal"}>
                      {lead?.email ? lead?.email : "NA"}
                    </span>
                  </div>
                </div>
                <div className={"flex gap-2 items-center mb-2"}>
                  <CiGlobe size={17} className={"text-secondary-400"} />
                  <span>{lead?.website ? lead?.website : "NA"}</span>
                </div>
                <div className={"flex gap-2 items-center mb-2"}>
                  <GoLocation size={17} className={"text-secondary-400"} />
                  <span>{lead?.address ? lead?.address : "NA"} </span>
                </div>
              </div>
            ))}

            {/*main div*/}
          </div>
        </>
      ) : (
        <div
          className={
            "flex flex-col justify-center items-center p-10 border rounded-b-[16px] cursor-pointer gap-3"
          }
        >
          <Image src={findLeads} alt={"findLeads"} />
          <span>
            Find active small business leads and places on google maps...
          </span>
        </div>
      )}
    </>
  );
}
