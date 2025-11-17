/*
 * (#)useSearchTvShows.tsx  0.3.0   11/15/2025
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

import type { TvShowListResponse } from "../types/TvShowListResponse.tsx";

import { useState, useEffect, useContext } from "react";
import ApiContext from "../ApiContext.tsx";

const useSearchTvShows: (searchQuery: string) => { data: TvShowListResponse | null, loading: boolean, error: string | null } = (searchQuery: string): { data: TvShowListResponse | null, loading: boolean, error: string | null } => {
    const [data, setData] = useState<TvShowListResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { accessToken, baseUrl } = useContext(ApiContext);

    useEffect((): void => {
        const fetchQuery: () => Promise<void> = async (): Promise<void> => {
            try {
                setLoading(true);

                const response: Response = await fetch(
                    `${baseUrl}/search/tv?query=${encodeURIComponent(
                        searchQuery
                    )}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            accept: "application/json",
                        },
                    }
                );

                console.log(response);

                if (response.ok) {
                    const data: TvShowListResponse = await response.json();

                    console.log(data);

                    setData(data);
                    setError(null);
                } else {
                    setError(`Failed to fetch data: ${response.statusText}`);
                }
            } catch (error) {
                setError(`Caught error fetching data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchQuery();
    }, [searchQuery]);

    return {data, loading, error};
}

export default useSearchTvShows;
