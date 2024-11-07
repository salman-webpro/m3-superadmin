import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {cookies} from "next/headers";

const handler = NextAuth({
    session:{
        strategy : "jwt",
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/login/`, {
                    method: 'POST',
                    body: JSON.stringify({username: credentials.username, password: credentials.password}),
                    headers: { "Content-Type": "application/json" }
                })

                const loginData = await res.json();
                if (loginData.status_code === 200){
                    cookies().set('refreshToken', loginData.data.refresh);
                    cookies().set('accessToken', loginData.data.access);
                    return {
                        email: loginData?.data?.user_info?.email,
                        name: loginData?.data?.user_info?.name,
                        image: loginData?.data?.user_info?.profile_pic,
                    }
                }else{
                    throw new Error();
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };