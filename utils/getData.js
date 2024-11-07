import fetchInterceptor from "@/interceptor";

export const getResData = async (searchText, currentPage) => {
    const url =
        searchText === ""
            ? `/api/admin/restaurants/?page=${currentPage}&size=50`
            : searchText
                ? `/api/admin/restaurants/?search=${searchText}&page=${currentPage}&size=50`
                : `/api/admin/restaurants/?page=${currentPage}&size=50`;
    try {
        const option = {
            cache: 'no-store',
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        };
        return await fetchInterceptor(url, option);
    } catch (error) {
        return error;
    }
};

export const getChartData = async (year1, year2) => {
    try {
        const option = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        };
        if (year1 && year2) {
            return await fetchInterceptor(
                `/api/admin/insights-chart/?year_1=${year1}&year_2=${year2}`,
                option
            );
        } else if (year1) {
            return await fetchInterceptor(
                `/api/admin/insights-chart/?year_1=${year1}`,
                option
            );
        } else if (year2) {
            return await fetchInterceptor(
                `/api/admin/insights-chart/?year_2=${year2}`,
                option
            );
        } else {
            return await fetchInterceptor("/api/admin/insights-chart/", option);
        }
        // return  await fetchInterceptor(`/api/admin/insights-chart/?year_1=${year1}&year_2=${year2}` , option);
    } catch (error) {
        return error;
    }
};

export const getActivityLog = async (searchText, currentPage) => {
    const url =
        searchText === ""
            ? `/api/admin/activity-log/?page=${currentPage}&size=50`
            : searchText
                ? `/api/admin/activity-log/?search=${searchText}&page=${currentPage}&size=50`
                : `/api/admin/activity-log/?page=${currentPage}&size=50`;
    try {
        const option = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        };
        return await fetchInterceptor(url, option);
    } catch (error) {
        return error;
    }
};

export const getResDetails = async (slug) => {
    try {
        const option = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        }
        return await fetchInterceptor(`/api/admin/restaurants/${slug}/`, option);
    } catch (error) {
        return error;
    }

}


export const getPendingResturant = async (searchText, currentPage) => {
    const url =
        searchText === ""
            ? `/api/admin/restaurants/pending/?page=${currentPage}&size=50`
            : searchText
                ? `/api/admin/restaurants/pending/?search=${searchText}&page=${currentPage}&size=50`
                : `/api/admin/restaurants/pending/?page=${currentPage}&size=50`;
    try {
        const option = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        };
        console.log('This function is called')
        return await fetchInterceptor(url, option);
    } catch (error) {
        return error;
    }

};

export const getResFile = async () => {
    try {
        const option = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        };
        return await fetchInterceptor(
            "/api/admin/restaurants/xls-download/",
            option
        );
    } catch (error) {
        return error;
    }
};

