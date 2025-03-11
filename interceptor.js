// 'use server'
// import { cookies } from 'next/headers';
// import {signOut} from "next-auth/react";
// import {redirect} from "next/navigation";

// export default async function fetchInterceptor  (url, options){
//     const cookieStore = cookies()
//     const accessToken = cookieStore.get('accessToken');
//     const refreshToken = cookieStore.get('refreshToken');
//     const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
//     const finalUrl = `${apiBaseUrl}${url}`

//     try {
//         const modifiedOptions = {
//             ...options,
//             headers: {
//                 ...options.headers,
//                 'Authorization': `Bearer ${accessToken.value}`,
//             }
//         };

//         const response = await fetch(finalUrl, modifiedOptions);

//         // Retry the request with the new access token
//         if (response.status === 401){
//             if (cookieStore.has('refreshToken')) {
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/token/refresh/`, {
//                     method: 'POST',
//                     body: JSON.stringify({refresh: refreshToken.value}),
//                     headers: {
//                         'content-type': 'application/json',
//                     }
//                 })

//                 const refreshData = await res.json();
//                 if(refreshData?.status_code === 200){
//                     cookies().delete('accessToken')
//                     cookies().set('accessToken', refreshData?.data?.access);
//                     const newAccessToken =  await fetch(finalUrl, modifiedOptions);
//                     return await newAccessToken.json();
//                 }else{
//                     signOut();
//                     cookies().delete('accessToken');
//                     cookies().delete('refreshToken');
//                     redirect("/login")
//                 }

//             } else {
//                 throw new Error('Failed to refresh access token');
//             }
//         }

//         if (response.status === 403) {
//             return Promise.reject(response.json());
//         }

//         if (!response.ok) {
//             return Promise.reject(response.json());
//             // throw new Error('Request failed with status code 500');

//         }
//         return await response.json();

//     } catch (error) {
//         signOut();
//         cookies().delete('accessToken');
//         cookies().delete('refreshToken');
//         redirect("/login")
//     }
// }
