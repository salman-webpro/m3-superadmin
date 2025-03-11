import React from "react";
import Image from "next/image";
import {
  MdDomain,
  MdOutlineContactPhone,
  MdOutlineBadge,
  MdOutlineCake,
  MdOutlineContactMail,
} from "react-icons/md";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmailView from "../shared/EmailView";
import { getResDetails } from "@/utils/getData";
import PlaceHolderImage from "../../public/user-icon.png";

export default async function OwnerInfo({ data, getSlug }) {
  const resData = await getResDetails(getSlug);
  const ownerInformation = data?.owner_info;

  console.log("resData", resData.data);
  return (
    <div className={"xl:col-span-6 lg:col-span-12 p-2 border rounded-[16px]"}>
      <div className={"grid grid-cols-12"}>
        <div
          className={
            "col-span-3 flex justify-center items-center h-[131px] w-[131px] p-2 relative"
          }
        >
          <AspectRatio ratio={1}>
            <Image
              fill={true}
              src={
                ownerInformation?.image === null
                  ? PlaceHolderImage
                  : ownerInformation?.image
              }
              alt={"logo"}
              className="object-cover rounded-[50%] w-full h-full"
            />
          </AspectRatio>
          <Badge
            className={
              "text-12 bg-lightGreen font-medium absolute bottom-0 left-0"
            }
            variant="destructive"
          >
            Owner
          </Badge>
        </div>

        <div className={"col-span-9 mx-0 my-auto"}>
          <div className={"flex items-center justify-between pb-3"}>
            <span className={"text-32 font-lightBold truncate"}>
              {ownerInformation?.owner_name}
            </span>
          </div>
          <div className={"grid w-full grid-cols-12 "}>
            <div className={"col-span-6 gap-3  pb-3"}>
              <EmailView email={ownerInformation?.email} owner={true} />
              <div className={"flex items-center gap-2 mt-3"}>
                <MdOutlineBadge size={20} color={"#6B7280"} />
                <span className={"text-16 text-secondary-500 truncate"}>
                  {ownerInformation?.nid ? ownerInformation?.nid : "N/A"}
                </span>
              </div>
            </div>

            <div className={"col-span-4 gap-3 pb-3"}>
              <div className={"flex items-center gap-2"}>
                <MdOutlineContactPhone size={20} color={"#6B7280"} />
                <span className={"text-16 text-secondary-500 truncate "}>
                  {ownerInformation?.phone ? ownerInformation?.phone : "N/A"}
                </span>
              </div>
              <div className={"flex items-center gap-2 mt-3"}>
                <MdOutlineCake size={20} color={"#6B7280"} />
                <span className={"text-16 text-secondary-500 truncate"}>
                  {ownerInformation?.birth_date
                    ? ownerInformation?.birth_date
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
