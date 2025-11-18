/*
 * (#)HotToastDemo.tsx   0.3.0   11/18/2025
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

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

/**
 * The hot toast demo component.
 *
 * @returns {JSX.Element}
 */
export default function HotToastDemo(): JSX.Element {
    const { t } = useTranslation();

    // A generic toast notification
    const notify: () => string = (): string => toast(`${ t("notify") }.`);

    // A success toast notification
    const successNotify: () => string = (): string => toast.success(`${ t("success") }!`);

    // An error toast notification
    const errorNotify: () => string = (): string => toast.error(`${ t("error") }!`);

    // A promise-based toast for handling async operations
    const handlePromise: () => void = (): void => {
        const myPromise = new Promise((resolve: (value: string) => void, reject: (reason?: string) => void): void => {
            setTimeout((): void => {
                // Simulate a success or error randomly
                if (Math.random() > 0.5) {
                    resolve(`${ t("promise-resolved") }!`);
                } else {
                    reject(`${ t("promise-rejected") }.`);
                }
            }, 2000);
        });

        toast.promise(myPromise, {
            loading: `${ t("fetching-data") }...`,
            success: (data: string): string => `${data}`,
            error: (err: string): string => `${err}`,
        });
    };

    return (
        <div className="flex flex-col justify-center items-center w-full pt-10 bg-yellow-200 h-screen">
            <p className="text-6xl font-bold text-green-700">{ t("title") }</p>
            <div>
                <button
                    className="bg-blue-700 text-white rounded-2xl px-5 py-2 mt-3  ml-3 hover:bg-blue-800 cursor-pointer"
                    onClick={ notify }
                >
                    { t("show-default") }
                </button>
                <button
                    className="bg-blue-700 text-white rounded-2xl px-5 py-2 mt-3  ml-3 hover:bg-blue-800 cursor-pointer"
                    onClick={ successNotify }
                >
                    { t("show-success") }
                </button>
                <button
                    className="bg-blue-700 text-white rounded-2xl px-5 py-2 mt-3  ml-3 hover:bg-blue-800 cursor-pointer"
                    onClick={ errorNotify }>
                    { t("show-error") }
                </button>
                <button
                    className="bg-blue-700 text-white rounded-2xl px-5 py-2 mt-3  ml-3 hover:bg-blue-800 cursor-pointer"
                    onClick={ handlePromise }>
                    { t("show-promise") }
                </button>
            </div>
        </div>
    );
}
