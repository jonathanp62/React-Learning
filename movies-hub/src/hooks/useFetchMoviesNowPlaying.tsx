/*
 * (#)useFetchMoviesNowPlaying.tsx  0.3.0   11/11/2025
 *
 * @author  Jonathan Parker
 * @version 0.3.0
 * @since   0.3.0
 *
 * MIT License
 *
 * Copyright (c) 2025 Jonathan M. Parker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { MovieApiResponse } from "../types/MovieApiResponse.tsx";

import { useContext, useEffect, useState } from "react";
import ApiContext from "../ApiContext.tsx";

/**
 * The useFetch hook.
 *
 * @param   {string}    endpoint    The endpoint to fetch data from
 *
 * @returns {{data: MovieApiResponse | null, loading: boolean, error: string | null}}
 */
const useFetchMoviesNowPlaying: (endpoint: string) => {data: MovieApiResponse | null, loading: boolean, error: string | null} = (endpoint: string): {data: MovieApiResponse | null, loading: boolean, error: string | null} => {
    const [data, setData] = useState<MovieApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { accessToken, baseUrl } = useContext(ApiContext);

    useEffect((): void => {
        const fetchData: () => Promise<void> = async (): Promise<void> => {
            try {
                const response: Response = await fetch(`${baseUrl}${endpoint}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        accept: "application/json",
                    },
                });

                console.log(response);

                if (response.ok) {
                    const data: MovieApiResponse = await response.json();

                    console.log(data);

                    setData(data);
                    setError(null);
                } else {
                    setError(`Failed to fetch data: ${response.statusText}`)
                }
            } catch (error) {
                setError(`Caught error fetching data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]);

    return {data, loading, error};
};

export default useFetchMoviesNowPlaying;