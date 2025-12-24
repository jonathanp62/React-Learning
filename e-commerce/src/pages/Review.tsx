/*
 * (#)Review.tsx    0.4.0   12/24/2025
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

import type { JSX} from "react";
import type { Order } from "../types/Order";
import type { OrderDocument } from "../types/OrderDocument";
import type { Product } from "../types/Product";
import type { RootState } from "../redux/Store";

import { clear } from "../redux/slices/CartSlice";
import { clearOrder } from "../redux/slices/OrderSlice";
import { getTax, computeGrandTotal } from "../utils/Calculators";
import { computeProductsTotal } from "../utils/Reducers";
import { formatIso8601Date, formatPhone, formatPrice, formatRating } from "../utils/Formatters";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

import toast from "react-hot-toast";
import ApiContext from "../ApiContext.ts";

/**
 * The order review page.
 *
 * @returns {JSX.Element}
 */
export default function Review(): JSX.Element  {
    const { t } = useTranslation();
    const { apiServiceUrl, debug } = useContext(ApiContext);

    const order: Order = useSelector((state: RootState): Order => state.order);
    const dispatch = useDispatch();

    /**
     * Handles the place order action.
     *
     * @returns {void}
     */
    const handlePlaceOrder: () => Promise<void> = async (): Promise<void> => {
        const success: boolean = await placeOrder();

        if (success) {
            dispatch(clear());      // Empty the cart
            dispatch(clearOrder()); // Clear the order

            toast.success(t("order-placed-ok"));
        } else {
            toast.error(t("order-place-failed"));
        }
    }

    /**
     * Places the order.
     *
     * @return  {Promise<boolean>}
     */
    const placeOrder: () => Promise<boolean> = async (): Promise<boolean> => {
        const postUrl: string = `${apiServiceUrl}/order`;

        try {
            const response: Response = await fetch(postUrl, {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (debug) {
                console.log("Response:");
                console.log({
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries()),
                    url: response.url,
                    ok: response.ok,
                    redirected: response.redirected,
                    type: response.type
                });
            }

            const document: OrderDocument = await response.json();

            console.log(`Order document saved: ${document.documentId}`);

            if (debug) {
                console.log(document);
            }

            return response.ok;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto pt-4 relative">
            <p className="font-bold text-2xl mb-2 dark:text-white">{ t("review-order") }</p>
            <div className="flex justify-between">
                <div className="mt-16">
                    {
                        order.products.map((product: Product): JSX.Element => (
                            <div key={product.id} className="w-full border-b-2 p-6 mt-3 flex border-black">
                                <div className="w-full flex justify-between gap-x-10">
                                    <div className="w-[170px] object-fill">
                                        <img src={ product.image } alt={ t("product-image") } className=""/>
                                    </div>
                                    <div className="w-[450px] flex flex-col gap-y-4">
                                        <h1 className="font-semibold text-lg dark:text-white">{ product.title }</h1>
                                        <h1 className="text-sm dark:text-white">{ product.description }</h1>
                                        <h1 className="text-sm dark:text-white">{ formatRating(product.rating.rate) } { t("stars") } ({ product.rating.count } { t("reviews") })</h1>
                                        <div className="flex justify-between">
                                            <p className="text-green-700 font-semibold">{ formatPrice(product.price) }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="mt-32 flex flex-col justify-between h-[500px] ml-8">
                    <div className="uppercase text-green-700 font-semibold">{ t("your-order") }</div>
                    <div className="uppercase text-green-700 font-bold text-4xl">{ t("summary") }</div>
                    <p className="mt-3 font-bold dark:text-white">
                        <span>{ t("total-items") }: {order.products.length}</span>
                    </p>
                    <p className="mt-0 font-bold dark:text-white">
                        <span>{ t("sub-total") }: {formatPrice(computeProductsTotal(order.products))}</span>
                    </p>
                    <p className="mt-0 font-bold dark:text-white">
                        <span>{ t("tax") }: {formatPrice(getTax(order))}</span>
                    </p>
                    <p className="mt-0 font-bold dark:text-white">
                        <span>{ t("total-amount") }: {formatPrice(computeGrandTotal(order))}</span>
                    </p>
                    <p className="mt-5 font-bold dark:text-white">
                        <span>{ t("ordered-by") }</span>
                    </p>
                    <p className="mt-1 font-bold dark:text-white">
                        <span className="font-normal">{order.firstName} {order.lastName}</span>
                    </p>
                    <p className="mt-0 font-bold dark:text-white">
                        <span className="font-normal">{formatIso8601Date(order.orderDate)}</span>
                    </p>
                    <p className="mt-5 font-bold dark:text-white">
                        <span>Shipping Information</span>
                    </p>
                    <p className="mt-1 font-bold dark:text-white">
                        <span className="font-normal">{order.firstName} {order.lastName}</span>
                    </p>
                    <p className="mt-0 font-bold dark:text-white">
                        <span className="font-normal">{order.address}</span>
                    </p>
                    <p className="mt-0 font-bold dark:text-white">
                        <span className="font-normal">{order.city}, {order.state} {order.zipCode}</span>
                    </p>
                    <p className="mt-0 font-bold dark:text-white">
                        <span className="font-normal">{order.country}</span>
                    </p>
                    <p className="mt-5 font-bold dark:text-white">
                        <span>Contact Information</span>
                    </p>
                    <p className="mt-1 font-bold dark:text-white">
                        <span className="font-normal">{formatPhone(order.phone)}</span>
                    </p>
                    <p className="mt-0 font-bold dark:text-white">
                        <span className="font-normal">{order.email}</span>
                    </p>
                    <div className="w-full flex justify-left">
                        <button
                            onClick={ handlePlaceOrder }
                            className="mb-10 mt-10 bg-green-700 w-[200px] text-white py-2 rounded-md hover:scale-110 transition-all"
                        >
                            { t("place-order") }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
