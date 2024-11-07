
import LoginForm from "@/components/form/LoginForm";
import {getServerSession} from "next-auth";
import { redirect } from "next/navigation";
import {cookies} from "next/headers";


async function LoginPage() {
    const session = await getServerSession();
    const cookieStore = cookies()
    if (session && cookieStore.has('accessToken') && cookieStore.has('refreshToken')){
        redirect("/")
    }
    return (
        <div className="md:w-[70%] lg:w-[604px] sm:w-[90%] xl:w-[604px] w-[90%] 2xl:w-[604px]">

            <div className="md:w-[70%] lg:w-[604px] sm:w-[90%] xl:w-[604px] w-[90%] 2xl:w-[604px]">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage
