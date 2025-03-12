// import fetchInterceptor from "@/interceptor";

// export const GetLeads = async (type, radius, keyword, location, sort) => {

//     const url = sort ? `/api/admin/restaurants-google-map/?type=${type}&radius=${radius}&keyword=${keyword}&place=${location}&sort=z2a` :
//         `/api/admin/restaurants-google-map/?type=${type}&radius=${radius}&keyword=${keyword}&place=${location}`
//     try {
//         const option = {
//             method: "GET",
//             headers: {
//                 "content-type": "application/json",
//             },
//         };
//         return await fetchInterceptor(url, option);
//     } catch (error) {
//         return error;
//     }
// };
