/*
 * (#)OrderDetail.tsx   0.4.0   12/19/2025
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

import { formatIso8601Date } from "../utils/Formatters";
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import ApiContext from "../ApiContext";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

/**
 * The order detail page.
 *
 * @returns {JSX.Element}
 */
export default function OrderDetail(): JSX.Element {
    const { t } = useTranslation();
    const { orderId } = useParams<'orderId'>();
    const { apiServiceUrl, debug } = useContext(ApiContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [order, setOrder] = useState<OrderDocument | null>(null);

    /**
     * Fetches order data from the service API.
     *
     * @returns {Promise<void>}
     */
    async function fetchOrderData(): Promise<void> {
        setLoading(true);

        try {
            const res: Response = await fetch(`${apiServiceUrl}/order/${orderId}`);
            const order: OrderDocument = await res.json();

            if (debug) {
                console.log("Order");
                console.log(order);
            }

            setOrder(order);
        } catch (err) {
            toast.error(`${t("error-loading-order", {orderId: orderId})}: ${err}`);
            setOrder(null);
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
            <p className="font-bold text-2xl mb-2 dark:text-white">{ t("order") } { orderId?.toUpperCase() }</p>

            {loading ? (
                <Spinner />
            ) : order !== null ? (
                <p>Order details to come</p>
            ) : (
                <p>{ t("order-not-found") }</p>
            )}
        </div>
    );
}
