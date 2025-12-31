/*
 * (#)useFetchOrderDetail.ts    0.4.0   12/22/2025
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

import type { OrderDocument } from "../types/OrderDocument";

import { createBasicAuthToken } from "../utils/Auth";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ApiContext from "../ApiContext";

/**
 * Fetches order detail data from the service API.
 *
 * @param   {string}                orderId     The order ID
 * @returns {OrderDocument | null}              The order data
 * @returns {boolean}                           The loading state
 * @returns {string | null}                     The error message
 */
const useFetchOrderDetail: (orderId: string | undefined) => {order: OrderDocument | null, loading: boolean, error: string | null} = (orderId: string | undefined): {order: OrderDocument | null, loading: boolean, error: string | null} => {
    const { apiServiceUrl, debug, users } = useContext(ApiContext);
    const { t } = useTranslation();

    const [loading, setLoading] = useState<boolean>(false);
    const [order, setOrder] = useState<OrderDocument | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        const fetchOrderDetail: () => Promise<void> = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);

                if (orderId !== undefined) {
                    const res: Response = await fetch(`${apiServiceUrl}/order/${orderId}`, {
                        headers: {
                            Authorization: `Basic ${createBasicAuthToken(users.READONLY)}`,
                            Accept: "application/json"
                        }
                    });

                    if (res.ok) {
                        const orderDocument: OrderDocument = await res.json();

                        if (debug) {
                            console.log("Order");
                            console.log(orderDocument);
                        }

                        setOrder(orderDocument);
                    } else if (res.status === 404) {
                        setError(t("order-not-found"));
                        setOrder(null);
                    } else if (res.status === 401) {
                        setError(t("order-not-authorized"));
                        setOrder(null);
                    } else {
                        setError(t("error-loading-order", {orderId: orderId}));
                        setOrder(null);
                    }
                } else {
                    setError(t("no-order-id-provided"));
                    setOrder(null);
                }
            } catch (err) {
                setError(`${t("error-loading-order", {orderId: orderId})}: ${err}`);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        void fetchOrderDetail();
    }, [orderId]);

    return {order, loading, error};
}

export default useFetchOrderDetail;
