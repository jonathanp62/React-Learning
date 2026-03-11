/*
 * (#)useFetchShippingCost.ts   0.7.0   03/11/2026
 *
 * @author  Jonathan Parker
 * @version 0.7.0
 * @since   0.7.0
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

import type { ShippingCost } from "../types/ShippingCost";

import { createBasicAuthToken } from "../utils/Auth";
import { useContext, useEffect, useState } from "react";

import ApiContext from "../ApiContext.ts";

/**
 * Fetches the shipping cost data from the service API.
 *
 * @param   {string}                toZipCode   The 'to' zip code
 * @param   {number}                subTotal    The sub total
 * @param   {number}                items       The number of items
 * @returns {ShippingCost | null}               The shipping cost
 * @returns {boolean}                           The loading state
 * @returns {string | null}                     The error message
 */
const useFetchShippingCost: (toZipCode: string, subTotal: number, items: number) => {shippingCost: ShippingCost | null, loading: boolean, error: string | null} = (toZipCode: string, subTotal: number, items: number): {shippingCost: ShippingCost | null, loading: boolean, error: string | null} => {
    const { apiServiceUrl, debug, users } = useContext(ApiContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [shippingCost, setShippingCost] = useState<ShippingCost | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        const fetchShippingCost: () => Promise<void> = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);

                const res: Response = await fetch(`${apiServiceUrl}/shipping-cost/calculate?toZipCode=${toZipCode}&subTotal=${subTotal}&items=${items}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Basic ${createBasicAuthToken(users.READONLY)}`,
                        Accept: "application/json"
                    }
                });

                if (res.ok) {
                    const shippingCost: ShippingCost = await res.json();

                    if (debug) {
                        //console.log(t("order"));
                        console.log(shippingCost);
                    }

                    setShippingCost(shippingCost);
                } else if (res.status === 404) {
                    //setError(t("order-not-found"));
                    setShippingCost(null);
                } else {
                    //setError(t("error-loading-order", {orderId: orderId}));
                    setShippingCost(null);
                }
            } catch (err) {
                setError(`Failed to calculate shipping cost: ${err}`);
                //setError(`${t("error-loading-order", {orderId: orderId})}: ${err}`);
                setShippingCost(null);
            } finally {
                setLoading(false);
            }
        };

        void fetchShippingCost();
    }, [toZipCode, subTotal, items]);

    return {shippingCost, loading, error};
}

export default useFetchShippingCost;
