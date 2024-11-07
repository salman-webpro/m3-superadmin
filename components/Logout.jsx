'use client';
import { signOut } from 'next-auth/react';
import { useCookies } from 'next-client-cookies';
import { useRouter } from "next/navigation"
import { IoMdPower } from "react-icons/io";

const Logout = () => {
    const router = useRouter();
    const cookies = useCookies();

    async function logout () {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/logout/`, {
            method: 'POST',
            body: JSON.stringify({refresh_token: cookies.get('refreshToken')}),
            headers: {
                'Authorization': `Bearer ${cookies.get('accessToken')}`,
                'content-type': 'application/json',
            }
        })

            cookies.remove('refreshToken')
            cookies.remove('accessToken')
            signOut({ callbackUrl: '/login' });
    }

    return (
        <div onClick={logout} className="flex items-center gap-3 rounded-lg px-3 py-2 text-14 text-secondary-500 font-medium transition-all cursor-pointer">
            <IoMdPower className="h-6 w-6"/>
            Logout
        </div>
    )
}
export default Logout
