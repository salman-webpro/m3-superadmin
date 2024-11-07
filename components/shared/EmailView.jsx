"use client";
import React, { useState } from "react";
import { MdMailOutline } from "react-icons/md";
import CopyBtn from "./CopyBtn";

const EmailView = ({ email , owner }) => {
  const [isCopyIconVisible, setIsCopyIconVisible] = useState(false);
  return (
    <div>
      <div
        className={`flex items-center gap-2 email-container w-full`}
        onMouseEnter={() => setIsCopyIconVisible(true)}
        onMouseLeave={() => setIsCopyIconVisible(false)}
      >
        <MdMailOutline className={owner ? 'w-[20px] h-[20px]' : 'w-[25px] h-[20px]'} color={"#6B7280"} />
        <span
          className={"text-16 text-secondary-500 overflow-hidden text-ellipsis"}
        >
          {email}
        </span>
        <div className={`${isCopyIconVisible ? "opacity-100" : "opacity-0"}`}>
          <CopyBtn text={email} />
        </div>
      </div>
    </div>
  );
};

export default EmailView;
