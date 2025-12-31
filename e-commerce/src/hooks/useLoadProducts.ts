/*
 * (#)useLoadProducts.ts   0.4.0   12/23/2025
 *
 * @author  Jonathan Parker
 * @version 0.4.0
 * @since   0.4.0
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

import type { Product } from "../types/Product";

import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts, updateFilteredProducts } from "../redux/slices/ProductSlice";
import { useTranslation } from "react-i18next";

import ApiContext from "../ApiContext";

/**
 * Fetches products data from the fake store API.
 *
 * @returns {Product[]}     The orders data
 * @returns {boolean}       The loading state
 * @returns {string | null} The error message
 */
const useLoadProducts: () => {loading: boolean, error: string | null} = (): {loading: boolean, error: string | null} => {
    const { baseUrl, debug } = useContext(ApiContext);
    const { t } = useTranslation();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();

    useEffect((): void => {
        const fetchProducts: () => Promise<void> = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);

                const res: Response = await fetch(`${baseUrl}`, {
                    method: "GET"
                });

                if (res.ok) {
                    const productsData: Product[] = await res.json();

                    if (debug) {
                        console.log("Products");
                        console.log(productsData);
                    }

                    dispatch(setProducts(productsData));
                    dispatch(updateFilteredProducts(productsData));
                } else {
                    setError(t("error-loading-products"));

                    dispatch(setProducts([]));
                    dispatch(updateFilteredProducts([]));
                }
            } catch (err) {
                setError(`${t("error-loading-products")}: ${err}`);

                dispatch(setProducts([]));
                dispatch(updateFilteredProducts([]));
            } finally {
                setLoading(false);
            }
        }

        void fetchProducts();
    }, []);

    return {loading, error};
}

export default useLoadProducts;
