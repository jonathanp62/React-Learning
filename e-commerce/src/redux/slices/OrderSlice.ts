/*
 * (#)OrderSlice.ts 0.7.0   03/18/2026
 * (#)OrderSlice.ts 0.4.0   12/24/2025
 *
 * @author  Jonathan Parker
 * @version 0.7.0
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

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Order } from "../../types/Order";

const initialState: Order = {
    orderId: "",
    orderDate: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
    taxRate: 0,
    shippingCost: 0,
    products: []
};

const OrderSlice = createSlice({
    name:"order",
    initialState,
    reducers: {
        setOrder: (_state: Order, action: PayloadAction<Order>): Order => {
            return action.payload;
        },
        setShippingCost: (state: Order, action: PayloadAction<number>): void => {
            state.shippingCost = action.payload;
        },
        clearOrder: (_state: Order): Order => {
            return initialState;
        }
    }
})

export const { clearOrder, setOrder, setShippingCost } = OrderSlice.actions;

export default OrderSlice.reducer;
