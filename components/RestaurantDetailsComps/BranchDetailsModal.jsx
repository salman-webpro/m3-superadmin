'use client'
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React, { useState } from "react";
import {
    MdDomain,
    MdMailOutline,
    MdOutlineCall,
    MdOutlineMonetizationOn,
    MdOutlinePrint,
    MdOutlineRequestPage
} from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {IoCheckmarkCircleSharp, IoCloseCircleOutline} from "react-icons/io5";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@radix-ui/react-toast";
import {useCookies} from "next-client-cookies";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";




function BranchDetailsModal({ main_branch = true, data }) {
    const cookies = useCookies();
    console.log('selected data', data)
    const [isHovered, setIsHovered] = useState(false);
    const convertTo12HourFormat = (time) => {
        // Split the time string into hours, minutes, and seconds
        const [hours, minutes, seconds] = time.split(':');

        // Convert hours to 12-hour format
        let formattedHours = parseInt(hours, 10);
        const amPm = formattedHours >= 12 ? 'PM' : 'AM';
        formattedHours = formattedHours % 12 || 12;

        // Remove leading zero from minutes
        const formattedMinutes = parseInt(minutes, 10) < 10 ? `0${parseInt(minutes, 10)}` : minutes;


        // Return the formatted time with AM/PM
        return `${formattedHours}:${formattedMinutes} ${amPm}`;

    };

    console.log('data =>>>>>>>>>>>', data)

    // const formattedOpeningTime = convertTo12HourFormat(data?.opening_time);
    const handleDownload = async () => {
        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/restaurants/logo-download/?slug=${data?.slug}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${cookies.get("accessToken")}`,
                        "content-type": "application/json",
                    },
                }
            );

            const blob = await res.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "qr_code.png");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);


            // const response = await fetch(data?.qr_image);
            // const blob = await response.blob();
            // const url = window.URL.createObjectURL(new Blob([blob]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'qr_code.png');
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
            // window.URL.revokeObjectURL(url);

            // setTimeout(() =>
            //     toast ({
            //         description: "QR code downloaded successfully!",
            //         variant: "success",
            //         duration: 2000,
            //         action: (
            //             <ToastAction altText="Copy">
            //                 <IoCheckmarkCircleSharp className="text-3xl text-green-700 animate-pulse  " />
            //             </ToastAction>
            //         ),
            //     }),
            //     500
            // )

        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };


    const handlePrint = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/restaurants/logo-download/?slug=${data?.slug}&is_print=true`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${cookies.get("accessToken")}`,
                        "content-type": "application/json",
                    },
                }
            );

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const image = new Image();
            image.src = data?.qr_image;
            image.onload = () => {
                const windowContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Print QR Code</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                        }
                        .qr-container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }
                        .qr-image {
                            max-width: 90%;
                            max-height: 90%;
                        }
                    </style>
                </head>
                <body>
                    <div class="qr-container">
                        <img class="qr-image" src="${image.src}" />
                    </div>
                </body>
                </html>
            `;
                const printWindow = window.open('', '', 'width=800,height=600');

                printWindow.document.open();
                printWindow.document.write(windowContent);
                printWindow.document.close();

                printWindow.onload = () => {
                    printWindow.print();
                    printWindow.close();
                };
            };

            image.onerror = (err) => {
                console.error("Image failed to load:", err);
            };
        } catch (error) {
            console.error('Failed to fetch the logo for printing:', error);
        }
    };



    return (
        <div className={'grid grid-cols-12 gap-4'}>
            <div className={'col-span-6 border-r p-3'}>
                <div className={'relative'} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <img src={data?.qr_image} alt={"logo"} className="object-cover w-full h-full" />
                    {isHovered && (
                        <div className={'absolute top-0 left-0 w-full h-full glassEffect'}>
                            <div className={'flex justify-center items-center h-full gap-2'}>
                                <div
                                    className={'backdrop-filter backdrop-blur-xl bg-opacity-80 p-3 rounded-lg'}
                                    onClick={handlePrint}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <MdOutlinePrint size={'30px'} color={'white'} />
                                </div>
                                <div
                                    className={'backdrop-filter backdrop-blur-xl bg-opacity-80 p-3 rounded-lg'}
                                    onClick={handleDownload}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <BsDownload size={'30px'} color={'white'} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                <div className={'xl:col-span-12 lg:col-span-12 border rounded-[10px] relative mt-4'}>
                    <div className={'grid grid-cols-12 items-center justify-center'}>
                        <div className={'col-span-6 text-center border-r py-[3px] px-[16px] my-3'}>
                            <div className={'grid justify-center items-center'}>
                                <span className={'text-32 font-lightBold '}>{data?.branch_scans}</span>
                                <span className={'text-[12px] font-normal text-secondary-500 '}>Branch Scan</span>
                            </div>
                        </div>
                        <div className={'col-span-6 text-center py-[3px] px-[16px] my-3'}>
                            <div className={'grid justify-center items-center'}>
                                <span className={'text-32 font-lightBold'}>{data?.branch_orders}</span>
                                <span className={'text-[12px] font-normal text-secondary-500'}>Branch Order</span>
                            </div>
                        </div>
                    </div>
                    {
                        data?.is_main_branch && <span
                            className={'text-12 font-medium border text-white bg-info py-1 px-2 rounded-[15px] textFixLength absolute top-[-10px] left-[140px]'}>Main Branch</span>
                    }
                </div>
            </div>

            <div className={'col-span-6'}>
                <div>
                    <div className={'grid border-b gap-2 pb-2 mb-[18px]'}>
                        <span className={'text-12 font-medium'}>Branch name</span>
                        <span className={'text-16 font-normal text-secondary-400'}>{data?.branch_name ? data?.branch_name : 'N/A'}</span>
                    </div>
                    <div className={'grid border-b gap-2 pb-2 mb-[18px]'}>
                        <span className={'text-12 font-medium'}>Email</span>
                        <span className={'text-16 font-normal text-secondary-400'}>{data?.email ? data?.email : 'N/A'}</span>
                    </div>
                    <div className={'grid border-b gap-2 pb-2 mb-[18px]'}>
                        <span className={'text-12 font-medium'}>Phone no.</span>
                        <span className={'text-16 font-normal text-secondary-400'}>{data?.phone ? data?.phone : 'N/A'}</span>
                    </div>
                    <div className={'grid border-b gap-2 pb-2 mb-[18px]'}>
                        <span className={'text-12 font-medium'}>Address</span>
                        <span className={'text-16 font-normal text-secondary-400'}>{data?.Location ? data?.Location : 'N/A'}</span>
                    </div>

                </div>
                <div className={'pt-[10px] pb-[16px] pl-[16px] pr-[16px] border rounded-[8px]'}>
                    <span className={'text-[16px] font-[500] '}>Branch schedule</span>
                    <div className={'flex pt-3 gap-2'}>
                        <div
                            className={'py-[12px] px-[10px] border rounded-[8px] w-full text-12 font-medium flex items-center justify-between'}>
                            <span>Opening time</span> <span className={'text-info'}>    {data?.opening_time ? convertTo12HourFormat(data?.opening_time) : 'N/A'}</span>
                        </div>
                        <div
                            className={'py-[12px] px-[10px] border rounded-[8px] w-full text-12 font-medium flex items-center justify-between'}>
                            <span>Closing time</span> <span className={'text-info'}>{data?.closing_time ? convertTo12HourFormat(data?.closing_time) : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div className={'xl:col-span-6 lg:col-span-12 border rounded-[8px] mt-[18px] p-2'}>
                    <div className={'grid grid-cols-12 gap-1 items-center justify-center'}>
                        <div className={'col-span-2 flex justify-center items-center'}>
                            <Avatar className={'w-[48px] h-[48px] rounded-[50%]'}>
                                <AvatarImage
                                    src={data?.manager_image}/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className={'col-span-10 flex flex-col justify-start items-start'}>
                            <div className={'flex flex-col gap-1.5 '}>
                                <span className={'text-[#4BA26F] text-[16px] font-[500]'}>{data?.Manager_name ? data?.Manager_name : 'N/A'}</span>
                                <div className={'flex gap-2'}>
                                    <div className={'flex items-center gap-2 border-r pr-2'}>
                                        <MdMailOutline size={20} color={'#6C757D'}/>
                                        <span className={'text-12 text-secondary-500'}>{data?.manager_email ? data?.manager_email : 'N/A'}</span>
                                    </div>
                                    <div className={'flex items-center gap-2'}>
                                        <MdOutlineCall size={20} color={'#6B7280'}/>
                                        <span className={'text-12 text-secondary-500'}>{data?.manager_phone ? data?.manager_phone : 'N/A'}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BranchDetailsModal