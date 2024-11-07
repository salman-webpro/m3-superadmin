"use client";
import { MdContentCopy } from "react-icons/md";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@radix-ui/react-toast";
import {FaSpinner} from "react-icons/fa";
import { IoCheckmarkCircleSharp } from "react-icons/io5";


const CopyBtn = ({ text }) => {
  const copyTextToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();

    try {
      document.execCommand('copy');
      setTimeout(() => {
        toast({
          description: "Copied to clipboard successfully!",
          duration: 2000,
          variant: "success",
          action: (
              <ToastAction altText="Copy">
                <IoCheckmarkCircleSharp className="text-3xl text-green-700 animate-pulse  " />
              </ToastAction>
          ),
        });
      }, 1000);
    } catch (err) {
      console.log(err)
    } finally {
      document.body.removeChild(textarea);
    }
  };
  const handleCopy = () => {
    copyTextToClipboard(text);
  };
  return (
    <div className="cursor-pointer " onClick={handleCopy}>
      <MdContentCopy size={16} color={"#4BA26F"} />
    </div>
  );
};
export default CopyBtn;
