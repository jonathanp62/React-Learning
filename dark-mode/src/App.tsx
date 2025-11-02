/*
 * (#)App.tsx   0.2.0   10/31/2025
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

import DarkMode from "./components/DarkMode.tsx";
import packageJson from "../package.json";

/**
 * The App component.
 *
 * @returns {JSX.Element}
 */
function App(): JSX.Element {
    const header: string = packageJson.appConfig.header;

    const formattedDate: () => string = (): string => {
        const today: Date = new Date();

        // Options object to specify the desired format components

        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',  // "Sunday"
            year: 'numeric',  // "2025"
            month: 'long',    // "November"
            day: 'numeric'    // "1"
        };

        return today.toLocaleDateString('en-US', options);
    }

    return (
        <>
            <p className="bg-amber-200 text-black dark:bg-amber-500 dark:text-white text-center">{ header }</p>
            <DarkMode />
            <p className="bg-amber-200 text-black dark:bg-amber-500 dark:text-white text-center">{ formattedDate() }</p>
        </>
    );
}

export default App;
