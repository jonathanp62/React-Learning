/*
 * (#)TvShows.tsx   0.3.0   11/15/2025
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

import type { JSX } from "react";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "../hooks/useFetch.js";
import useSearchTvShows from "../hooks/useSearchTvShows.tsx";

/**
 * The TV shows page component.
 *
 * @returns {JSX.Element}
 */
export default function TvShows(): JSX.Element {
    const { t } = useTranslation();

    const [searchText, setSearchText] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>(""); // Main trigger
    const { data, loading, error } = useFetch("/tv/popular");

    // This is destructuring with renaming. It's a common pattern in React.
    // It's used to avoid naming conflicts and to make the code more readable.
    // The 'data' field is renamed to 'query'.
    // The 'loading' field is renamed to 'queryLoading'.
    // The 'error' field is renamed to 'queryError'.

    const {
        data: query,
        loading: queryLoading,
        error: queryError,
    } = useSearchTvShows(searchQuery);

    if (error)
        return <p>{ error }</p>;

    if (loading)
        return <p className="min-h-screen">{ t("loading") }...</p>;

    return (
        <div className="min-h-screen bg-white">
            <div className="flex justify-center items-center">
                <input
                    type="text"
                    name=""
                    id=""
                    value={ searchText }
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Enter TV show name"
                    className="bg-white border border-gray rounded-2xl px-10 py-2 mt-3"
                />
                <button
                    className="bg-blue-700 text-white rounded-2xl px-5 py-2 mt-3  ml-3 hover:bg-blue-800 cursor-pointer"
                    onClick={ (): void => setSearchQuery(searchText) }
                    disabled={queryLoading}
                >
                    { queryLoading ? t("loading") + " ..." : t("search") }
                </button>
            </div>

            {queryError && (
                <p className="text-center text-red-600 mt-4">
                    { t("search-error") }:{ queryError }
                </p>
            )}
        </div>
    );
}
