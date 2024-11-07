import NavItem from "@/components/NavItem";
import Logout from "@/components/Logout";

export default function Sidebar() {
    return (

            <div className="fixed inset-y-0 left-0 w-2/12  border-r">
                <div className={'flex flex-col h-full max-h-screen gap-2'}>
                    <div className="flex-1 mt-28">
                        <NavItem/>
                    </div>
                    <div className="mt-auto p-4">
                        <Logout />
                    </div>
                </div>
            </div>
    )
}