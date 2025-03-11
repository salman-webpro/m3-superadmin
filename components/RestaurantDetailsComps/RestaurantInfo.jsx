import Image from "next/image";
import {
  MdOutlineCall,
  MdDomain,
  MdOutlineMonetizationOn,
  MdOutlineRequestPage,
  MdMailOutline,
} from "react-icons/md";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import EmailView from "../shared/EmailView";
import { getResDetails } from "@/utils/getData";
import PlaceHolderImage from "../../public/user-icon.png";

export default async function RestaurantInfo({ data, getSlug }) {
  const resData = await getResDetails(getSlug);
  const restaurentInformation = data?.restaurant_info;
  return (
    <>
      <div className={"p-2 border rounded-[16px]"}>
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
                  restaurentInformation?.image === null
                    ? PlaceHolderImage
                    : restaurentInformation?.image
                }
                alt={"logo"}
                className="object-cover rounded-[50%] h-full w-full"
              />
            </AspectRatio>
          </div>

          <div className={"col-span-9 mx-0 my-auto"}>
            <div className={"flex items-center justify-between pb-3"}>
              <span className={"text-32 font-lightBold textFixLength"}>
                {restaurentInformation?.restaurant_name}
              </span>
              <div className={"flex gap-3 items-start"}>
                <span
                  className={
                    "text-11 font-medium border py-1 px-2 rounded-[15px] textFixLength"
                  }
                >
                  {restaurentInformation?.validity
                    ? restaurentInformation?.validity
                    : 0}{" "}
                  days Remaining
                </span>
                <span
                  className={
                    "text-11 font-medium bg-magnolia py-1 px-2 rounded-[15px] truncate"
                  }
                >
                  {restaurentInformation?.package_name
                    ? restaurentInformation?.package_name
                    : "No Package"}
                </span>
              </div>
            </div>

            <div className={"grid w-full grid-cols-12 gap-2"}>
              <div className={"col-span-5 justify-between pb-3 gap-3 "}>
                <EmailView email={restaurentInformation?.email} />
                <div className={"flex items-center gap-2 mt-3"}>
                  <MdOutlineMonetizationOn size={20} color={"#6B7280"} />
                  <span className={"text-16 text-secondary-500 truncate"}>
                    {restaurentInformation?.pay_type
                      ? restaurentInformation?.pay_type === "PAY_FIRST"
                        ? "Pay First"
                        : "Pay Later"
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className={"col-span-4 justify-between gap-3 pb-3 "}>
                <div className={"flex items-center gap-2"}>
                  <MdOutlineCall size={20} color={"#6B7280"} />
                  <span className={"text-16 text-secondary-500 truncate"}>
                    {restaurentInformation?.phone
                      ? restaurentInformation?.phone
                      : "N/A"}
                  </span>
                </div>
                <div className={"flex items-center gap-2 mt-3"}>
                  <HiOutlineReceiptPercent size={20} color={"#6B7280"} />
                  <span className={"text-16 text-secondary-500 truncate"}>
                    {`${
                      restaurentInformation?.vat_tax
                        ? restaurentInformation.vat_tax + " %"
                        : "N/A"
                    }`}
                  </span>
                </div>
              </div>

              <div className={"col-span-3 justify-between gap-3 "}>
                <div className={"flex items-center gap-2"}>
                  <MdDomain size={20} color={"#6B7280"} />
                  <span className={"text-16 text-secondary-500 truncate"}>
                    {restaurentInformation?.bin_no
                      ? restaurentInformation?.bin_no
                      : "N/A"}
                  </span>
                </div>
                <div className={"flex items-center gap-2 mt-3"}>
                  <MdOutlineRequestPage size={20} color={"#6B7280"} />
                  <span className={"text-16 text-secondary-500 truncate"}>
                    {` ৳ ${
                      restaurentInformation?.service_charge
                        ? restaurentInformation?.service_charge
                        : "N/A"
                    } `}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
