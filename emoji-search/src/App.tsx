/*
 * (#)App.tsx   0.2.0   10/30/2025
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

import './styles/App.css';
import EmojiSearch from "./components/EmojiSearch.tsx";
import ThemeToggle from "./components/ThemeToggle.tsx";

/**
 * The App component.
 *
 * @returns {JSX.Element}
 */
function App(): JSX.Element {
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-red-700 ">
            <EmojiSearch />

            <div className='absolute top-4 right-4'>
                <ThemeToggle />
            </div>
        </div>
    );
}

export default App;
