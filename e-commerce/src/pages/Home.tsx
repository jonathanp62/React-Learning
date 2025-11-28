/*
 * (#)Home.tsx  0.3.0   11/20/2025
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
import type { Product } from "../types/Product.tsx";
import type { RootState } from "../redux/Store.tsx";

import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setSelectedCategory, setSelectedPrice, updateFilteredProducts } from "../redux/slices/ProductSlice";

import toast from 'react-hot-toast';
import ApiContext from "../ApiContext.tsx";
import Spinner from "../components/Spinner.tsx";
import ProductItem from "../components/ProductItem.tsx";

/**
 * The home page.
 *
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
    const { t } = useTranslation();
    const { baseUrl, debug } = useContext(ApiContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<Product[]>([]);

    const dispatch = useDispatch();
    const data: Product[] = useSelector((state: RootState): Product[] => state.products.data);
    const filtered: Product[] = useSelector((state: RootState): Product[] => state.products.filtered);
    const selectedCategory: string = useSelector((state: RootState): string => state.products.selectedCategory);
    const selectedPrice: string = useSelector((state: RootState): string => state.products.selectedPrice);

    /**
     * Fetches product data from the API.
     *
     * @returns {Promise<void>}
     */
    async function fetchProductData(): Promise<void> {
        setLoading(true);

        try {
            const res: Response = await fetch(baseUrl);
            const products: Product[] = await res.json();

            setPosts(products);

            dispatch(setProducts(products));
            dispatch(updateFilteredProducts(products));
        } catch (err) {
            toast.error(`${t("error-loading")}: ${err}`);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }

    /* Fetch product data on mount */

    useEffect((): void => {
        fetchProductData();
    }, []);

    /* Apply filters whenever the category or price changes */

    useEffect((): void  => {
        let filteredData: Product[] = posts;

        // Filter by category

        console.log(selectedCategory);
        if (selectedCategory && selectedCategory !== "All") {
            filteredData = filteredData.filter(
                (item: Product): boolean => item.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Filter by price

        if (selectedPrice) {
            filteredData = filteredData.filter((item: Product): boolean => {
                if (selectedPrice === "0+") return item.price >= 0;
                if (selectedPrice === "0-50") return item.price >= 0 && item.price <= 50;
                if (selectedPrice === "50-100") return item.price > 50 && item.price <= 100;
                if (selectedPrice === "100+") return item.price > 100;

                return true;
            });
        }

        dispatch(updateFilteredProducts(filteredData));
    }, [selectedCategory, selectedPrice, posts, dispatch]);

    const uniqueCategories: string[] = ["All", ...new Set(posts.map((product: Product): string => product.category))];

    if (debug) {
        console.log(data);
        console.log(filtered);
    }

    return (
        <div className="flex bg-gray-100 p-10 mx-auto space-x-4">
            {/* Sidebar filters */}

            <div className="w-64 p-4 rounded border-r-2 border-gray-200 bg-white shadow-sm">
                {/* Category Filter */}

                <div className="mb-6 mt-5">
                    <p className="font-semibold text-lg mb-2">{ t("category") }</p>
                    <div className="flex flex-col mt-2 space-y-1">
                        {uniqueCategories.map((cat: string): JSX.Element => (
                            <button
                                key={cat}
                                className={`text-left px-2 py-1 rounded hover:bg-gray-200 ${selectedCategory === cat ? "bg-gray-300 font-semibold" : ""
                                }`}
                                onClick={() => dispatch(setSelectedCategory(cat))}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}

                <div className="mb-4">
                    <p className="font-semibold text-lg mb-2">{ t("price") }</p>
                    <div className="flex flex-col mt-2 space-y-2">
                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="price"
                                value="0+"
                                checked={selectedPrice === "0+"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSelectedPrice(e.target.value))}
                                className="mr-2"
                            />
                            $0+
                        </label>

                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="price"
                                value="0-50"
                                checked={selectedPrice === "0-50"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSelectedPrice(e.target.value))}
                                className="mr-2"
                            />
                            $0 - $50
                        </label>

                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="price"
                                value="50-100"
                                checked={selectedPrice === "50-100"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSelectedPrice(e.target.value))}
                                className="mr-2"
                            />
                            $50 - $100
                        </label>

                        <label className="cursor-pointer">
                            <input
                                type="radio"
                                name="price"
                                value="100+"
                                checked={selectedPrice === "100+"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSelectedPrice(e.target.value))}
                                className="mr-2"
                            />
                            $100+
                        </label>
                    </div>
                </div>
            </div>

            {/* Product item grid */}

            <div className="flex-1 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                    <Spinner />
                ) : filtered.length > 0 ? (
                    filtered.map((post: Product): JSX.Element => <ProductItem key={post.id} post={post} />)
                ) : (
                    <p>{ t("no-data-found") }</p>
                )}
            </div>
        </div>
    );
}
