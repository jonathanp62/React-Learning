/*
 * (#)Movies.tsx    0.3.0   11/13/2025
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
import type { Movie } from "../types/Movie.tsx";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useFetchMoviesNowPlaying from "../hooks/useFetchMoviesNowPlaying.tsx";
import useSearchMovies from "../hooks/useSearchMovies.js";

/**
 * The movies page component.
 *
 * @returns {JSX.Element}
 */
export default function Movies(): JSX.Element {
    const { t } = useTranslation();

    const [searchText, setSearchText] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>(""); // Main trigger
    const { data, loading, error } = useFetchMoviesNowPlaying("/movie/popular");

    // This is destructuring with renaming. It's a common pattern in React.
    // It's used to avoid naming conflicts and to make the code more readable.
    // The 'data' field is renamed to 'query'.
    // The 'loading' field is renamed to 'queryLoading'.
    // The 'error' field is renamed to 'queryError'.

    const {
        data: query,
        loading: queryLoading,
        error: queryError,
    } = useSearchMovies(searchQuery);

    if (error)
        return <p>{ error }</p>;

    if (loading)
        return <p className="min-h-screen">{ t("loading") }...</p>;

    return (
        <div>
            <div className="flex justify-center items-center">
                <input
                    type="text"
                    name=""
                    id=""
                    value={ searchText }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>): void => setSearchText(e.target.value) }
                    placeholder={ t("enter-movie") }
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

            {/* Optional chaining is used (?.) */}
            {/* ?? is the nullish coalescing operator. It returns the left operand if it is not null or undefined, otherwise it returns the right operand. */}

            {(query?.results?.length ?? 0) > 0 && (
                <div className="m-8 p-4 border border-yellow-400 bg-yellow-50 rounded-xl shadow-md text-center items-center">
                    <h2 className="text-xl font-bold text-yellow-800">{ t("results") }</h2>
                    {query?.results?.[0] && (
                        <>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${query?.results?.[0]?.poster_path}`}
                                className="w-48 h-auto rounded-xl mx-auto"
                                alt={ query?.results?.[0]?.title || t("movie-poster") }
                            />
                            <p className="font-bold text-2xl">{query?.results?.[0]?.title}</p>
                            <p>{query?.results?.[0]?.overview}</p>
                            <p>{query?.results?.[0]?.vote_average}</p>
                        </>
                    )}
                </div>
            )}

            {/* Movies section */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-8">
                {data?.results?.map((movie: Movie): JSX.Element => (
                    <div
                        key={movie.id}
                        className="bg-white/5 p-3 rounded-xl shadow-md flex flex-col items-center text-center hover:transform hover:scale-105"
                    >
                        <img
                            src={ `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }
                            alt={ t("poster") }
                            className="w-48 h-auto rounded-xl"
                        />
                        <p className="mt-3 font-bold text-gray-900 text-2xl">
                            { movie.title }
                        </p>
                        <p className="text-gray-900 ">{ movie.overview }</p>
                        <p>{ movie.release_date }</p>
                        <p>Average rating : { movie.vote_average }</p>
                    </div>
                ))}
            </div>
        </div>
    );
}