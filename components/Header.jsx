import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import NavItem from "@/components/NavItem";
import { SlEnvolope } from "react-icons/sl";
import Image from "next/image";
import Logo from "../public/logo.png";
import { getServerSession } from "next-auth";
import Logout from "@/components/Logout";

export default async function Header() {
  const sessionData = await getServerSession();
  return (
    <header className="flex h-25 items-center gap-4 border-b bg-primary-50 py-5 lg:px-7 fixed top-0 left-0 right-0 z-40">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <NavItem />
          <div className="mt-auto">
            <Logout />
          </div>
        </SheetContent>
      </Sheet>
      <div className={"w-full flex justify-between items-center"}>
        <div className="">
          <Link
            href="/"
            className="items-center gap-2 font-semibold hidden bg-muted/40 md:block"
          >
            <span className="">
              <Image src={Logo} alt={"logo"} width={58} height={50} />
            </span>
          </Link>
        </div>
        <div>
          <h2 className={"text-secondary-900 text-22 font-normal leading-28"}>
            {sessionData?.user?.name}
          </h2>
          <div
            className={
              "flex items-center text-secondary-500 text-16 font-normal gap-2"
            }
          >
            <SlEnvolope />
            <p
              className={
                "pl-1 text-secondary-500 text-16 font-normal leading-24"
              }
            >
              {" "}
              {sessionData?.user?.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
