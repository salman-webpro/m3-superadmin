import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Breadcrumbs( {restaurentName} ) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="">
                    <BreadcrumbLink href="/" className='text-[#667085] text-[14px] font-[400]'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/all-restaurants" className='text-[#667085] text-[14px] font-[400]'>Restaurants</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className='text-[#4BA26F] text-[14px] font-[400]' >{restaurentName}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
