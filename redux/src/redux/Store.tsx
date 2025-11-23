/*
 * (#)Store.tsx 0.3.0   11/21/2025
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

import type { User } from "../types/User.tsx";

import { configureStore } from '@reduxjs/toolkit';
import { initialUser } from './Users';

import userReducer from './UserSlice';

const reduxStoreStateKey: string = "reduxStoreState";

let persistedState: { user: User } = { user: initialUser };

try {
    const serializedState: string | null = localStorage.getItem(reduxStoreStateKey);

    if (serializedState !== null) {
        persistedState = JSON.parse(serializedState) as { user: User };
    }
} catch (e) {
    console.error("Error loading persisted state: ", e);
}

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: persistedState,
});

store.subscribe((): void => {
    localStorage.setItem(reduxStoreStateKey, JSON.stringify(store.getState()));
});
