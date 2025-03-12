"use client";

import React, { useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MdMailOutline, MdOutlineCall } from "react-icons/md";
import { GoLocation } from "react-icons/go";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsPhone } from "react-icons/bs";
import BranchDetailsModal from "@/components/RestaurantDetailsComps/BranchDetailsModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getResDetails } from "@/utils/getData";

export default function Branches({ main_branch = true, data }) {
  const [restaurenBranchData, setRestaurenBranchData] = React.useState("");
  // const resData = await getResDetails(getSlug);
  const branchData = data?.branches;
  const [selectedBranchData, setSelectedBranchData] = React.useState(null);
  // useEffect(() => {
  //     const fetchBranchData = async () => {
  //         try {
  //             const resBranchData = await getResDetails(getSlug);
  //             setRestaurenBranchData(resBranchData?.data?.branches[0] || []);
  //             console.log('resBranchData', resBranchData.data)
  //         } catch (error) {
  //             console.error('Error fetching branch data:', error);
  //         }
  //     };

  //     fetchBranchData();
  // }, [getSlug]);
  const handleModalOpen = (branch) => {
    setOpen(true);
    setSelectedBranchData(branch);
  };
  const [open, setOpen] = React.useState(false);
  return (
    <div className={"border rounded-[16px]"}>
      <div className={"p-4 border-b m-auto flex items-center gap-2"}>
        <span className={"text-24 font-lightBold"}>Branches</span>{" "}
        <span className={"text-14 font-medium text-primary-900"}>
          ({branchData?.length} branches)
        </span>
      </div>
      <div
        className={
          "grid grid-cols-12 p-3 bg-secondary-50 rounded-b-[16px] cursor-pointer gap-3"
        }
      >
        {branchData && (
          <>
            {branchData?.map((branch, index) => (
              <div
                key={index}
                className={"col-span-4 border rounded-[16px] bg-white"}
                onClick={() => handleModalOpen(branch)}
              >
                {/*Branches Map*/}
                <div className={"grid grid-cols-12 gap-2 px-4 pt-4"}>
                  <div
                    className={
                      "col-span-4 flex justify-center items-center h-full w-full relative"
                    }
                  >
                    <AspectRatio ratio={1}>
                      <Image
                        fill={true}
                        src={branch?.qr_image}
                        alt={"logo"}
                        className="object-cover h-full w-full"
                      />
                    </AspectRatio>
                  </div>
                  <div className={"col-span-8"}>
                    <div className={"flex items-center justify-between pb-3"}>
                      <span
                        className={"text-22 font-lightBold text-primary-900"}
                      >
                        {branch?.branch_name ? branch?.branch_name : "N/A"}
                      </span>
                      {branch?.is_main_branch && (
                        <span
                          className={
                            "text-12 font-medium border text-white bg-info py-1 px-2 rounded-[15px]"
                          }
                        >
                          Main Branch
                        </span>
                      )}
                    </div>
                    <div>
                      <div className={"flex items-center gap-2 pb-2"}>
                        <MdOutlineCall size={20} color={"#6B7280"} />
                        <span
                          className={
                            "flex-grow text-secondary-500 text-14 font-normal"
                          }
                        >
                          {branch?.phone ? branch?.phone : "N/A"}{" "}
                        </span>
                      </div>
                      <div className={"flex items-center gap-2 pb-2"}>
                        <MdMailOutline size={20} color={"#6B7280"} />
                        <span
                          className={
                            "text-secondary-500 text-14 font-normal truncate"
                          }
                        >
                          {branch?.email ? branch?.email : "N/A"}
                        </span>
                      </div>

                      <div className={"flex gap-2"}>
                        <div
                          className={"flex items-center gap-2 overflow-hidden"}
                        >
                          <GoLocation size={20} />
                          <span className={"text-16 font-medium truncate"}>
                            {branch?.Location ? branch?.Location : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    "flex gap-2 border-t w-full py-2 px-4 mt-2 items-center"
                  }
                >
                  <Avatar className={"w-[20px] h-[20px] rounded-[50%]"}>
                    <AvatarImage src={branch?.manager_image} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <span className={"text-16 font-medium"}>
                    {branch?.Manager_name ? branch?.Manager_name : "N/A"}
                  </span>
                </div>
                {/*Branches Map*/}
              </div>
            ))}
          </>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        {/*<DialogTrigger>Open</DialogTrigger>*/}
        <DialogContent className={"max-w-[858px]"}>
          <BranchDetailsModal data={selectedBranchData} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
