/*
 * (#)NavBar.tsx    0.3.0   11/20/2025
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

import type{ JSX } from "react";
import type { Product } from "../types/Product";
import type { CartState } from "../types/CartState.tsx";
import type {RootState} from "../redux/Store.tsx";

import { FaShoppingCart } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";
import logo from "../assets/logo.png";

/**
 * The navigation bar component.
 *
 * @todo    This is incomplete.
 * @returns {JSX.Element}
 */
export default function NavBar(): JSX.Element {
    const { t } = useTranslation();
    const cart: Product[] = useSelector((state: RootState): CartState => state.cart);

    const handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = event.target.value;
    }

    return (
        <div className="relative">
            <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
                <NavLink to="/">
                    <div className="ml-5">
                        <img src={ logo } className="h-14" alt="Logo" />
                    </div>
                </NavLink>

                <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
                    <NavLink to="/">
                        <p>{ t("home") }</p>
                    </NavLink>

                    {/* Search bar */}

                    <div className="relative">
                        <div className="flex items-center w-64 bg-[#2d3748] rounded-full px-4 py-2 shadow-inner">
                            <input
                                onChange={ handleInput }
                                value="Search"
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none flex-grow"
                                onFocus={(): void => {
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative font-medium text-slate-100 mr-5 space-x-6">
                    <NavLink to="/cart">
                        <FaShoppingCart className="text-2xl" />
                        {cart.length > 0 && (
                            <span className="
                                absolute
                                -top-1
                                -right-2
                                bg-green-600
                                text-xs
                                w-5
                                h-5
                                flex
                                justify-center
                                items-center
                                rounded-full
                                text-white">
                                { cart.length }
                            </span>
                        )}
                    </NavLink>
                </div>
            </nav>
        </div>
    );
}
