/*
 * (#)Item.tsx  0.3.0   11/29/2025
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
import type { CartState } from "../types/CartState.tsx";

import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { capitalizeString, formatPrice, formatRating } from "../utils/Formatters.tsx";
import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";
import ApiContext from "../ApiContext.tsx";
import Spinner from "../components/Spinner.tsx";
import {add, remove} from "../redux/slices/CartSlice.tsx";

/**
 * The product item page.
 *
 * @returns {JSX.Element}
 */
export default function Item(): JSX.Element {
    const { t } = useTranslation();
    const { id } = useParams<'id'>();
    const { baseUrl, debug } = useContext(ApiContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [item, setItem] = useState<Product | null>(null);

    const cart: Product[] = useSelector((state: RootState): CartState => state.cart);
    const dispatch = useDispatch();

    const addToCart: () => void = (): void =>  {
        if (item !== null) {
            dispatch(add(item));
            toast.success("Item added to Cart");
        }
    }

    const removeFromCart: () => void = (): void => {
        if (item !== null) {
            dispatch(remove(item.id));
            toast.success("Item removed from Cart");
        }
    }

    /**
     * Fetches product item data from the API.
     *
     * @returns {Promise<void>}
     */
    async function fetchProductItemData(): Promise<void> {
        setLoading(true);

        try {
            const res: Response = await fetch(`${baseUrl}/${id}`);
            const text: string = await res.text();

            if (text) {
                const item: Product = JSON.parse(text);

                setItem(item);
            } else {
                setItem(null);
            }
        } catch (err) {
            toast.error(`${t("error-loading")}: ${err}`);
            setItem(null);
        } finally {
            setLoading(false);
        }
    }

    /* Fetch product item data on mount */

    useEffect((): void => {
        fetchProductItemData();
    }, []);

    if (debug) {
        console.log(item);
    }

    return (
        <div className="w-full p-6 mt-3">
            { loading ?  (
                <Spinner />
            ) : (
                item !== null ? (
                <div className="w-full flex justify-between gap-x-6">
                    <div className="w-[500px] object-fill">
                        <img src={ item.image } alt={ t("product-image") } className=""/>
                    </div>

                    <div className="flex-grow flex flex-col gap-y-6">
                        <h1 className="font-semibold text-lg dark:text-white">{ item.title }</h1>
                        <h1 className="text-base dark:text-white">{ item.description }</h1>
                        <h1 className="text-base dark:text-white">{ capitalizeString(item.category) }</h1>
                        <h1 className="text-base dark:text-white">{ formatPrice(item.price) }</h1>
                        <h1 className="text-base dark:text-white">{ formatRating(item.rating.rate) } { t("stars") } ({ item.rating.count } { t("reviews") })</h1>
                        <h1 className="text-base dark:text-white">{ formatRating(item.rating.rate) } { t("stars") } ({ item.rating.count } { t("reviews") })</h1>

                        <div className=" inlilne-flex space-x-4">
                            { cart.some((product: Product): boolean => item.id === product.id) ? (
                                <button className="
                                    text-gray-700 dark:text-white
                                    border-2
                                    border-gray-700 dark:border-white
                                    rounded-full
                                    font-semibold
                                    text-[12px]
                                    p-1
                                    px-3
                                    uppercase
                                    hover:bg-gray-700 dark:hover:bg-white
                                    hover:text-white dark:hover:text-gray-700
                                    transition
                                    duration-300
                                    ease-in"
                                    onClick={ removeFromCart }>
                                    { t("remove-from-cart") }
                                </button>) : (
                                <button className="
                                    text-gray-700 dark:text-white
                                    border-2
                                    border-gray-700 dark:border-white
                                    rounded-full
                                    font-semibold
                                    text-[12px]
                                    p-1
                                    px-3
                                    uppercase
                                    hover:bg-gray-700 dark:hover:bg-white
                                    hover:text-white dark:hover:text-gray-700
                                    transition
                                    duration-300
                                    ease-in"
                                    onClick={ addToCart }>
                                    { t("add-to-cart") }
                                </button>)
                            }
                        </div>
                    </div>
                </div>
                ) : (
                    <div className="flex justify-center h-screen">
                        <p className="text-center text-4xl font-bold">{ t("not-found", {id: id}) }</p>
                    </div>
                )
            )
            }
        </div>
    );
}
