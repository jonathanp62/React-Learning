/*
 * (#)useFetchTaxess.ts 0.5.0   01/08/2026
 *
 * @author  Jonathan Parker
 * @version 0.5.0
 * @since   0.5.0
 *
 * MIT License
 *
 * Copyright (c) 2026 Jonathan M. Parker
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

import type { SalesTaxDocument } from "../types/SalesTaxDocument";

import { createBasicAuthToken } from "../utils/Auth";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ApiContext from "../ApiContext";

/**
 * Fetches sales tax data from the service API.
 *
 * @returns {SalesTaxDocument[]}    The sales tax data
 * @returns {boolean}               The loading state
 * @returns {string | null}         The error message
 */
const useFetchSalesTaxes: () => {salesTaxes: SalesTaxDocument[], loading: boolean, error: string | null} = (): {salesTaxes: SalesTaxDocument[], loading: boolean, error: string | null} => {
    const { apiServiceUrl, debug, users } = useContext(ApiContext);
    const { t } = useTranslation();

    const [loading, setLoading] = useState<boolean>(false);
    const [salesTaxes, setSalesTaxes] = useState<SalesTaxDocument[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect((): void => {
        const fetchSalesTaxes: () => Promise<void> = async (): Promise<void> => {
            try {
                setLoading(true);
                setError(null);

                const res: Response = await fetch(`${apiServiceUrl}/sales-tax/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Basic ${createBasicAuthToken(users.READONLY)}`,
                        Accept: "application/json"
                    }
                });

                if (res.ok) {
                    const salesTaxDocuments: SalesTaxDocument[] = await res.json();

                    if (debug) {
                        console.log("Sales Taxes");
                        console.log(salesTaxDocuments);
                    }

                    setSalesTaxes(salesTaxDocuments);
                } else if (res.status === 401) {
                    setError(t("sales-tax-not-authorized"));
                    setSalesTaxes([]);
                } else {
                    setError(t("error-loading-sales-tax"));
                    setSalesTaxes([]);
                }
            } catch (err) {
                setError(`${t("error-loading-sales-tax")}: ${err}`);
                setSalesTaxes([]);
            } finally {
                setLoading(false);
            }
        }

        void fetchSalesTaxes();
    }, []);

    return {salesTaxes, loading, error};
}

export default useFetchSalesTaxes;
