import { useEffect, useState } from "react";

const useFetch = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
    const BASE_URL = "https://api.themoviedb.org/3";

    useEffect((): void => {
        const fetchData: () => Promise<void> = async (): Promise<void> => {
            try {
                const response: Response = await fetch(`${BASE_URL}${endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                        accept: "application/json",
                    },
                });

                console.log(response);

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    setData(data);
                    setError(null);
                } else {
                    setError(`Failed to fetch data: ${error}`)
                }
            } catch (error) {
                setError(`Caught error fetching data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ACCESS_TOKEN, endpoint]);

    return {data, loading, error};
};

export default useFetch;