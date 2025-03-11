"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    router.push("dashboard");
    // event.preventDefault();
    // setIsLoading(true);
    // const formData = new FormData(event.currentTarget);
    // const response = await signIn("credentials", {
    //   username: formData.get("username"),
    //   password: formData.get("password"),
    //   redirect: false,
    // });
    // if (response.status === 200) {
    //   router.push("/");
    // } else {
    //   toast({
    //     variant: "destructive",

    //     title: "Login Error",
    //     description: "Your credentials is incorrect",
    //     action: <ToastAction altText="Try again">Try again</ToastAction>,
    //   });
    // }
    // setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className={"rounded-[18px] pt-2"}>
          <CardHeader
            className={
              "flex items-center justify-center border-b gap-8 text-center pb-8"
            }
          >
            <span className={""}>
              <Image
                src={"/login-logo.png"}
                alt={"logo"}
                width={90}
                height={80}
              />
            </span>
            <div className={"flex flex-col gap-4"}>
              <h2 className={"text-secondary-900 text-45 font-bold leading-52"}>
                Login
              </h2>
              <p
                className={"text-secondary-500 text-16 leading-24 font-normal"}
              >
                To login to the platform you need to enter the appropriate info
                below
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid px-[40px] gap-6 pt-8">
            <div>
              <Label
                htmlFor="email"
                className={"text-secondary-800 text-12 font-medium leading-16"}
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="username"
                placeholder="Enter your email"
                className={
                  "border-0 border-b py-4 rounded-none focus-visible:ring-0 placeholder:text-secondary-500 text-16"
                }
                required
              />
            </div>
            <div className="grid ">
              <Label
                htmlFor="password"
                className={"text-secondary-800 text-12 font-medium leading-16"}
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className={
                  "border-0 border-b py-4 rounded-none focus-visible:ring-0 placeholder:text-secondary-500 text-16"
                }
                required
              />
              {/* <p className={"text-error"}>{error}</p> */}
            </div>
          </CardContent>
          <CardFooter className={"px-[40px] pb-[40px]"}>
            <Button
              className="w-full bg-primary-500 text-secondary-900 text-14 font-[500] leading-20 h-[50px] flex items-center justify-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Login"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
export default LoginForm;
