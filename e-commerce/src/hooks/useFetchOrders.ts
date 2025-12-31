/*
 * (#)useFetchOrders.ts 0.4.0   12/22/2025
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
 * Fetches orders data from the service API.
 *
 * @returns {OrderDocument[]}   The orders data
 * @returns {boolean}           The loading state
 * @returns {string | null}     The error message
 */
const useFetchOrders: () => {orders: OrderDocument[], loading: boolean, error: string | null} = (): {orders: OrderDocument[], loading: boolean, error: string | null} => {
    const { apiServiceUrl, debug, users } = useContext(ApiContext);
    const { t } = useTranslation();

    const [loading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<OrderDocument[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        const fetchOrders: () => Promise<void> = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);

                const res: Response = await fetch(`${apiServiceUrl}/orders`, {
                    method: "GET",
                    headers: {
                        Authorization: `Basic ${createBasicAuthToken(users.READONLY)}`,
                        Accept: "application/json"
                    }
                });

                if (res.ok) {
                    const orderDocuments: OrderDocument[] = await res.json();

                    if (debug) {
                        console.log("Orders");
                        console.log(orderDocuments);
                    }

                    setOrders(orderDocuments);
                } else if (res.status === 401) {
                    setError(t("orders-not-authorized"));
                    setOrders([]);
                } else {
                    setError(t("error-loading-orders"));
                    setOrders([]);
                }
            } catch (err) {
                setError(`${t("error-loading-orders")}: ${err}`);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        }

        void fetchOrders();
    }, []);

    return {orders, loading, error};
}

export default useFetchOrders;
