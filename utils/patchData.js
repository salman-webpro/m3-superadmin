// interceptor.js
import fetchInterceptor from "@/interceptor";
import {getPendingResturant} from "@/utils/getData";


export const PatchPending = async (payload, id) => {
    try {
        const option = {
            method: "PATCH",
            body: JSON.stringify(payload),
            headers: {
                "content-type": "application/json",
            },
        };
        const response = await fetchInterceptor(`/api/admin/users/${id}/`, option);
        getPendingResturant()
        return response
    } catch (error) {
        return error;
    }
};

export const patchStatus = async (slug, isActive) => {
    try {
        const option = {
            method: "PATCH",
            body: JSON.stringify({is_active: isActive}),
            headers: {
                "Content-Type": "application/json",
            },

        };
        return await fetchInterceptor(`/api/admin/restaurants/${slug}/`, option);

    } catch (error) {
        return error;
    }

};

export const rejectPending = async (email, id) => {
    console.log('idddd', id)
    try {
        const option = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "email": email,
            },
        };
        const response = await fetchInterceptor(`/api/admin/users/${id}/`, option);
        await getPendingResturant
        return response
    } catch (error) {
        return error;
    }
};

