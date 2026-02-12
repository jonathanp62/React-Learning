/*
 * (#)Sales.ts  0.6.0   02/12/2026
 * (#)Sales.ts  0.4.0   12/20/2025
 *
 * @author  Jonathan Parker
 * @version 0.6.0
 * @since   0.4.0
 *
 * MIT License
 *
 * Copyright (c) 2025, 2026 Jonathan M. Parker
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
import type { TFunction } from "i18next";
import type { User } from "../types/User";

import {createBasicAuthToken} from "./Auth.ts";

/**
 * Fetches order data from the service API.
 *
 * @param   {string}                                url     The URL of the service API
 * @param   {string}                                state   The state to fetch sales tax for
 * @param   {User}                                  user    The user authorized to fetch sales tax
 * @param   {boolean}                               debug   Whether to enable debug logging
 * @param   {TFunction<'translation', undefined>}   t       The translation function
 * @returns {Promise<void>}
 */
async function fetchSalesTax(url: string, state: string, user: User, debug: boolean, t: TFunction<'translation', undefined>): Promise<SalesTaxDocument | null> {
    let salesTaxDocument: SalesTaxDocument | null = null;
    let errorMessage: string = "";  //Empty strings are falsey

    try {
        const res: Response = await fetch(`${url}/sales-tax/${state}`, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${createBasicAuthToken(user)}`,
                "Accept": "application/json"
            }
        });

        if (res.ok) {
            salesTaxDocument = await res.json();

            if (debug) {
                console.log(t("sales-tax"));
                console.log(salesTaxDocument);
            }
        } else if (res.status === 404) {
            console.warn(`${t("sales-tax-not-found", {state: state})}`);
        } else if (res.status === 401) {
            errorMessage = t("sales-tax-unauthorized", {state: state});
        } else {
            errorMessage = t("sales-tax-failed-to-fetch", {state: state});
        }
    } catch (err) {
        throw err instanceof Error ? err : new Error(String(err));
    }

    if (errorMessage) {
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    return salesTaxDocument;
}

export default fetchSalesTax;