/*
 * (#)DarkMode.tsx   0.2.0   10/31/2025
 *
 * @author  Jonathan Parker
 * @version 0.2.0
 * @since   0.2.0
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

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

/**
 * The dark mode component.
 *
 * @returns {JSX.Element}
 */
export default function DarkMode(): JSX.Element {
    const { t } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    // Run once to match the system theme

    useEffect(() => {
        document.documentElement.classList.remove('dark');

        if (globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);

    // Use a useEffect to apply the 'light' or 'dark' class to the root html element

    useEffect((): void => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode: () => void = (): void => {
        setIsDarkMode(!isDarkMode);
    };

    const systemMode: () => void = (): void => {
        document.documentElement.classList.remove('dark');

        const currentTheme: string | null = localStorage.getItem('theme');

        if (globalThis.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');

            if (currentTheme !== 'dark') {
                setIsDarkMode(!isDarkMode);
            }
        } else {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');

            if (currentTheme !== 'light') {
                setIsDarkMode(!isDarkMode);
            }
        }
     };

    const exampleClicked: () => void = (): void => {
        globalThis.alert(`${t("example-clicked")}!`);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <header className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    { isDarkMode ? t("dark-title") : t("light-title") }
                </h1>

                <button
                    onClick={ toggleDarkMode }
                    className="
                        p-2
                        rounded-full
                        bg-green-300
                        text-gray-800
                        hover:bg-gray-300
                        dark:bg-gray-700
                        dark:text-gray-200
                        dark:hover:bg-green-600"
                >
                    { isDarkMode ? (
                        <div title={ t("switch-to-light-mode") }>
                            <SunIcon className="h-6 w-6 text-yellow-400" />
                        </div>
                        ) : (
                            <div title={ t("switch-to-dark-mode") }>
                                <MoonIcon className="h-6 w-6 text-indigo-600" />
                            </div>
                        )
                    }
                </button>
                <button
                    onClick={ systemMode }
                    className="
                        p-2
                        rounded-full
                        bg-green-300
                        text-gray-800
                        hover:bg-gray-300
                        dark:bg-gray-700
                        dark:text-gray-200
                        dark:hover:bg-green-600"
                    title={ t("switch-to-system-theme") }
                >
                    { t("switch-to-system") }
                </button>

            </header>

            <main className="p-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                        { t("main-text") }.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        { t("sub-text") }.
                    </p>
                    <button onClick={ exampleClicked }
                            className="
                                mt-4
                                p-2
                                rounded-full
                                bg-blue-300
                                text-gray-900
                                hover:bg-blue-400
                                focus:ring-blue-400
                                dark:bg-blue-500
                                dark:hover:bg-blue-600
                                dark:focus:ring-blue-500
                                dark:text-gray-200"
                            title={ t("click-me") }
                    >
                        { t("example-button") }
                    </button>
                </div>
            </main>
        </div>
    );
}
