/*
 * (#)Calculators.ts    0.4.0   12/24/2025
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

import type { Order } from "../types/Order";
import type { OrderDocument } from "../types/OrderDocument";

import { computeProductsTotal } from "./Reducers";

/**
 * Computes the tax for the order.
 *
 * @param   {Order | OrderDocument} order   The order to compute the tax for
 * @returns {number}                        The tax for the order
 */
export function getTax(order: Order | OrderDocument): number {
    return order.taxRate * computeProductsTotal(order.products);
}

/**
 * Computes the grand total for the order.
 *
 * @param   {Order | OrderDocument} order   The order to compute the total for
 * @returns {number}                        The total for the order
 */
export function computeGrandTotal(order: Order | OrderDocument): number {
    const subTotal: number = computeProductsTotal(order.products);

    return subTotal + getTax(order);
}
