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

import type { JSX } from "react";
import type { Product } from "../types/Product";
import type { CartState } from "../types/CartState.tsx";
import type { RootState } from "../redux/Store.tsx";
import type { ThemeState } from "../types/ThemeState.tsx";

import { Search } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory, setSelectedPrice, updateFilteredProducts } from "../redux/slices/ProductSlice";
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

/**
 * The navigation bar component.
 *
 * @returns {JSX.Element}
 */
export default function NavBar(): JSX.Element {
    const { t } = useTranslation();

    const [inputData, setInputData] = useState<string>("");
    const [dropdownProducts, setDropdownProducts] = useState<Product[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const dispatch = useDispatch();
    const products: Product[] = useSelector((state: RootState): Product[] => state.products.data);

    const cart: Product[] = useSelector((state: RootState): CartState => state.cart);
    const theme: ThemeState = useSelector((state: RootState): ThemeState => state.theme);

    const isDarkMode: boolean = theme === "dark";

    const handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = event.target.value;

        setInputData(value);

        if (value.trim() === "") {
            setDropdownProducts(products); // Show all dropdown options
            setShowDropdown(true);
            return;
        }

        const filtered: Product[] = products.filter(
            (item: Product): boolean =>
                item.title.toLowerCase().includes(value.toLowerCase()) ||
                item.category.toLowerCase().includes(value.toLowerCase())
        );

        setDropdownProducts(filtered); // Dropdown only
        setShowDropdown(true);
    }

    const handleSelectProduct: (item: Product) => void = (item: Product): void => {
        dispatch(updateFilteredProducts([item])); // Update Home products

        // Update sidebar filters globally

        dispatch(setSelectedCategory(item.category));

        // Optionally update price filter

        if (item.price <= 50) dispatch(setSelectedPrice("0-50"));
        else if (item.price <= 100) dispatch(setSelectedPrice("50-100"));
        else dispatch(setSelectedPrice("100+"));

        setShowDropdown(false); // Close dropdown
        setInputData("");           // Clear search input if you want
    }

    // Close dropdown if input is cleared

    useEffect((): void => {
        if (inputData === "") {
            setShowDropdown(false);
        }
    }, [inputData]);

    return (
        <div className="relative">
            <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
                <NavLink to="/">
                    <div className="ml-5">
                        <img src={ logo } className="h-14" alt="Logo" />
                    </div>
                </NavLink>

                <div className="flex items-center font-medium text-slate-900 dark:text-white mr-5 space-x-6">
                    <NavLink to="/">
                        <p>{ t("home") }</p>
                    </NavLink>

                    {/* Search bar */}

                    <div className="relative">
                        <div className="flex items-center w-64 bg-[#2d3748] rounded-full px-4 py-2 shadow-inner">
                            <input
                                onChange={ handleInput }
                                value={ inputData }
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none flex-grow"
                                onFocus={(): void => {
                                    if (showDropdown) {
                                        setShowDropdown(false);
                                    } else {
                                        setDropdownProducts(products); // Always show all dropdown items
                                        setShowDropdown(true);
                                    }
                                }}
                            />
                            <Search className="text-gray-300 w-4 h-4 ml-2 cursor-pointer" />
                        </div>

                        {/* Search dropdown */}

                        {showDropdown && dropdownProducts.length > 0 && (
                            <div className="absolute top-12 left-0 w-64 bg-[#1f2937] text-white rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                                {dropdownProducts.map((item: Product): JSX.Element => (
                                    <div
                                        key={ item.id }
                                        onClick={ (): void => handleSelectProduct(item) }
                                        className="p-2 hover:bg-[#374151] cursor-pointer flex items-center space-x-3"
                                    >
                                        <img
                                            src={ item.image }
                                            alt={ item.title }
                                            className="w-8 h-8 rounded object-contain"
                                        />
                                        <div className="truncate">
                                            <p className="text-sm font-medium truncate w-44">{ item.title }</p>
                                            <p className="text-xs text-gray-400">{ item.category }</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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
                                text-slate-900
                                dark:text-white">
                                { cart.length }
                            </span>

                        )}
                    </NavLink>
                </div>

                <div>
                    { isDarkMode ? (
                            <SunIcon className="h-6 w-6 text-indigo-600" />
                        ) : (
                            <MoonIcon className="h-6 w-6 text-indigo-600" />
                        )
                    }
                </div>
            </nav>
        </div>
    );
}
