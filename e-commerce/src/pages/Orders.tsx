/*
 * (#)Orders.tsx    0.4.0   12/16/2025
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

import type { JSX } from "react";
import type { OrderDocument } from "../types/OrderDocument";

import { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { computeProductsTotal } from "../utils/Reducers";
import { formatIso8601Date, formatPrice } from "../utils/Formatters";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";
import ApiContext from "../ApiContext";
import Spinner from "../components/Spinner";

/**
 * The orders page.
 *
 * @returns {JSX.Element}
 */
export default function Orders(): JSX.Element {
    const { t } = useTranslation();
    const { apiServiceUrl, debug } = useContext(ApiContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<OrderDocument[]>([]);

    /**
     * Fetches order data from the service API.
     *
     * @returns {Promise<void>}
     */
    async function fetchOrderData(): Promise<void> {
        setLoading(true);

        try {
            const res: Response = await fetch(`${apiServiceUrl}/orders`);
            const orders: OrderDocument[] = await res.json();

            if (debug) {
                console.log("Orders:");
                console.log(orders);
            }

            setOrders(orders);
        } catch (err) {
            toast.error(`${t("error-loading-orders")}: ${err}`);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }

    /* Fetch order data on mount */

    useEffect((): void => {
        void fetchOrderData();
    }, []);

    return (
        <div className="w-full max-w-[1000px] mx-auto pt-4 relative">
            <p className="font-bold text-2xl mb-2 dark:text-white">{ t("orders") }</p>

            {loading ? (
                <Spinner />
            ) : orders.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-2 pr-4 font-semibold dark:text-white">{ t("order-placed") }</th>
                                <th className="text-left py-2 pr-4 font-semibold dark:text-white">{ t("ordered-by") }</th>
                                <th className="text-left py-2 pr-4 font-semibold dark:text-white">{ t("products") }</th>
                                <th className="text-left py-2 pr-4 font-semibold dark:text-white">{ t("total") }</th>
                                <th className="text-left py-2 pr-4 font-semibold dark:text-white">{ t("order-id") }</th>
                                <th className="text-left py-2 pr-4 font-semibold dark:text-white">{ t("details") }</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order: OrderDocument): JSX.Element => {
                                return (
                                    <tr key={order.orderId} className="border-b border-white dark:border-gray-800">
                                        <td className="py-2 pr-4 dark:text-white">{formatIso8601Date(order.orderDate)}</td>
                                        <td className="py-2 pr-4 dark:text-white">{order.firstName} {order.lastName}</td>
                                        <td className="py-2 pr-4 dark:text-white">{order.products.length}</td>
                                        <td className="py-2 pr-4 dark:text-white">{formatPrice(computeProductsTotal(order.products))}</td>
                                        <td className="py-2 pr-4 dark:text-white">{order.orderId.toUpperCase()}</td>
                                        <td className="text-center py-2 pr-4 dark:text-white"><Link to={ `/order-detail/${order.orderId}` }>...</Link></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>{ t("no-orders-found") }</p>
            )}
        </div>
    );
}
