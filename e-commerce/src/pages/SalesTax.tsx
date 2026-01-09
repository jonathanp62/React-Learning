/*
 * (#)SalesTax.tsx  0.5.0   01/08/2026
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

import type { JSX } from "react";
import type { SalesTaxDocument } from "../types/SalesTaxDocument";

import { formatPercentage } from "../utils/Formatters";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useTranslation } from 'react-i18next';

import Spinner from "../components/Spinner";
import useFetchSalesTaxes from "../hooks/useFetchSalesTaxes.ts";

/**
 * The sales tax page.
 *
 * @returns {JSX.Element}
 */
export default function SalesTax(): JSX.Element {
    const { t } = useTranslation();
    const { salesTaxes, loading, error } = useFetchSalesTaxes();

    return (
        <div className="w-full max-w-[1000px] mx-auto pt-4 relative">
            <p className="font-bold text-2xl mb-2 dark:text-white">{ t("sales-tax") }</p>

            {loading ? (
                <Spinner />
            ) : salesTaxes.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="text-left py-2 pr-4 font-semibold dark:text-white">State Name</th>
                                <th className="text-left py-2 pr-4 font-semibold dark:text-white">State Abbreviation</th>
                                <th className="text-left py-2 pr-4 font-semibold dark:text-white">Sales Tax Rate</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesTaxes.map((salesTax: SalesTaxDocument): JSX.Element => {
                                return (
                                    <tr key={salesTax.documentId} className="border-b border-white dark:border-gray-800">
                                        <td className="py-2 pr-4 dark:text-white">{salesTax.state}</td>
                                        <td className="py-2 pr-4 dark:text-white">{salesTax.abbreviation}</td>
                                        <td className="py-2 pr-4 dark:text-white">{formatPercentage(salesTax.rate)}</td>
                                        <td>
                                            <div
                                                className="bg-pink-200 rounded-full hover:cursor-pointer inline-flex items-center justify-center w-10 h-10"
                                                title={ t("edit") }
                                            >
                                                <MdEdit />
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className="bg-pink-200 rounded-full hover:cursor-pointer inline-flex items-center justify-center w-10 h-10"
                                                title={ t("delete") }
                                            >
                                                <MdDelete />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="dark:text-white">{ error }</p>
            )}
        </div>
    );
}
