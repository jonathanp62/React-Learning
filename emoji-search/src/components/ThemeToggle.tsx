/*
 * (#)ThemeToggle.tsx   0.2.0   10/31/2025
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

/**
 * The theme toggle component.
 *
 * @returns {JSX.Element}
 */
export default function ThemeToggle(): JSX.Element {
    const [theme, setTheme] = useState((): string => {
        // Load theme from localStorage

        console.log(localStorage.getItem('theme') || 'light');
        return localStorage.getItem('theme') || 'light';
    });

    const [isHovered , setIsHovered] = useState<boolean>(false);

    useEffect((): void => {
        // Apply the theme to the body
        // Changing to light mode really just means removing dark mode

        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add(theme);
        }

        localStorage.setItem('theme', theme); // Save theme to localStorage
    }, [theme]);

    const toggleTheme: () => void = (): void => {
        setTheme((prevTheme: string):"light" | "dark" => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '50px',
        backgroundColor: 'blue',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        background: 'Linear-gradient(to right, #4CAF50, #2196F3)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    };

    return (
        <div>
            <button
                onClick={ toggleTheme }
                style={ buttonStyle }
                onMouseEnter={ () => setIsHovered(true) }
                onMouseLeave={ () => setIsHovered(false) }
            >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
        </div>
    );
}
