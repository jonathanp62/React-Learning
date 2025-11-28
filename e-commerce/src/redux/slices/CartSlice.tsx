/*
 * (#)CartSlice.tsx 0.3.0   11/22/2025
 *
 * @author  Jonathan Parker
 * @version 0.3.0
 * @since   0.3.0
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

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '../../types/Product';
import type { CartState } from "../../types/CartState.tsx";

const initialState: CartState = [];

const CartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        add: (state: CartState, action: PayloadAction<Product>): void => {
            state.push(action.payload)
        },
        remove: (state: CartState, action: PayloadAction<number>): Product[] => {
            return state.filter((item: Product): boolean => item.id !== action.payload)
        },
        clear: (_state: CartState): Product[] => {
            return [];
        }
    }
})

export const { add, remove, clear } = CartSlice.actions;

export default CartSlice.reducer;
