/*
 * (#)UserSlice.tsx 0.3.0   11/21/2025
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

import { createSlice } from '@reduxjs/toolkit';

const initialState: User = {
    name: "",
    email: "",
    age: 0,
    address: "",
    phone: "",
    active: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: (state, action) : void=> {
            state.name = action.payload;
        },
        setEmail: (state, action): void => {
            state.email = action.payload;
        },
        setAge: (state, action) : void=> {
            state.age = action.payload;
        },
        setAddress: (state, action): void => {
            state.address = action.payload;
        },
        setPhone: (state, action) : void=> {
            state.phone = action.payload;
        },
        setActive: (state, action): void => {
            state.active = action.payload;
        },
    },
});

export const { setName, setEmail, setAge, setAddress, setPhone, setActive } = userSlice.actions;
export default userSlice.reducer;
