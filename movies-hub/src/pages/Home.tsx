/*
 * (#)Home.tsx  0.3.0   11/11/2025
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

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import useFetchMoviesNowPlaying from "../hooks/useFetchMoviesNowPlaying.tsx";

/**
 * The home page component.
 *
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
    const { t } = useTranslation();
    const { data, loading, error } = useFetchMoviesNowPlaying("/movie/now_playing");

    if (loading)
        return <div className="min-h-screen flex justify-center">{ t("loading") }...</div>;

    if (error)
        return <div className="min-h-screen flex justify-center">{ error }</div>;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero section */}
            <section className="py-60 bg-gradient-to-br from-blue-300 to-blue-700">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h1 className="font-bold mb-6 text-5xl md:text-6xl">
                        { t("welcome") }
                    </h1>

                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        { t("browse-discover") }
                    </p>
                    <div className="space-x-4">
                        <Link
                            to="/movies"
                            className="bg-blue-500  text-white font-semibold rounded-lg px-8 py-3 border-2 border-whit hover:bg-blue-600  transition duration-300 inline-block"
                        >
                            { t("browse-movies") }
                        </Link>
                        <Link
                            to="/tvshows"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300 inline-block"
                        >
                            { t("browse-tv") }
                        </Link>
                    </div>
                </div>
            </section>
            <section className="bg-gray-50 py-16">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="font-bold text-2xl text-gray-800">{ t("now-playing") }</h2>
                        <Link
                            to="/movies"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            { t("view-all-movies") }
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.results?.map((nowPlaying: Movie): JSX.Element => (
                            <div
                                key={nowPlaying.id}
                                className="bg-white/5 p-3 rounded-xl shadow-md flex flex-col items-center text-center hover:transform hover:scale-105"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${nowPlaying.poster_path}`}
                                    alt="poster"
                                    className="w-48 h-auto rounded-xl"
                                />
                                <p className="mt-3 font-bold text-gray-900 text-2xl">
                                    {nowPlaying.title}
                                </p>
                                <p className="mt-1 text-gray-600 text-sm">
                                    {nowPlaying.release_date}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
