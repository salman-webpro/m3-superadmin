"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {MdBlockFlipped} from "react-icons/md";
import {FaRegTimesCircle} from "react-icons/fa";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {CgTrash} from "react-icons/cg";
import {useState} from "react";
import {PatchPending, rejectPending} from "@/utils/patchData";

function DenyDialogBox({user_id , reFetch , setReFetch}) {
    let [email, setEmail] = useState();

    const handlePatch = async () => {
        await rejectPending(email, user_id);
        setReFetch(!reFetch)
    }
    return (
        <AlertDialog className={'bg-primary-50'}>
            <AlertDialogTrigger asChild>
                <MdBlockFlipped className={'text-24 text-error cursor-pointer ml-2'}/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="grid grid-cols-10 gap-3 items-start">
                        <div className="col-span-1 mt-1.5">
                            <CgTrash
                                className={'h-[48px] w-[48px] p-1 text-[48px] rounded-[28px] bg-denyTwo border-[8px] border-denyThree text-denyOne'}/>
                        </div>
                        <div className="col-span-9 ml-3">

                            <div className={'flex justify-between items-center'}>
                                <h2 className={'text-24 text-secondary-900 font-lightBold pt-0 mt-0'}>Confirm
                                    reject</h2>
                                <AlertDialogCancel
                                    className={'bg-transparent border-0 text-24 hover:bg-transparent p-0 m-0'}><FaRegTimesCircle
                                    className={'text-secondary-400 mt-[-40px] mr-[-10px]'}/></AlertDialogCancel>
                            </div>

                            <p className={'text-secondary-400 text-14 font-normal leading-20 tracking-normal py-2'}>
                                Are you sure you want to reject this? This action cannot be undone. To confirm rejection
                                you have to enter your valid email.
                            </p>
                            <form action="">
                                <div className="">
                                    <Label htmlFor="email"
                                           className={'text-secondary-800 text-[12px] font-medium leading-16 tracking-wider'}>Email</Label>
                                    <Input id="email" type="email" placeholder="dolores.chambers@example.com"
                                           className={'border-0 border-b px-0 rounded-none focus-visible:ring-0 placeholder:text-secondary-500 text-16 py-0'}
                                           required onChange={(e) => setEmail(e.target.value)} onBlur={(e) => setEmail(e.target.value)}/>
                                </div>
                            </form>

                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className={'bg-secondary-100 text-secondary-600 text-[12px] font-medium leading-16'}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className={'bg-error text-primary-50 text-[12px] font-medium leading-16'}
                        onClick={handlePatch}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DenyDialogBox
