/*
 * (#)ReduxDemo.tsx 0.3.0   11/21/2025
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

import type { JSX } from "react";
import type { User } from "../types/User.tsx";

import React, { useEffect } from "react";

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setEmail, setAge, setAddress, setPhone, setActive } from '../redux/UserSlice';

/**
 * The redux demonstration component.
 *
 * @returns {JSX.Element}
 */
export default function ReduxDemo(): JSX.Element {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user: User = useSelector((state: { user: User }): User => state.user);

    const initialUser: User = {
        name: "John Doe",
        email: "john.doe@example.com",
        age: 30,
        address: "123 Main St.",
        phone: "123-456-7890",
        active: true
    }

    function loadStore(): void {
        dispatch(setName(initialUser.name));
        dispatch(setEmail(initialUser.email));
        dispatch(setAge(initialUser.age));
        dispatch(setAddress(initialUser.address));
        dispatch(setPhone(initialUser.phone));
        dispatch(setActive(initialUser.active));
    }

    const handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setName(e.target.value));
    };

    const handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setEmail(e.target.value));
    };

    const handleAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setAge(e.target.value));
    };

    const handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setAddress(e.target.value));
    };

    const handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setPhone(e.target.value));
    };

    const handleActiveChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(setActive(e.target.checked));
    };

    useEffect((): void => {
        loadStore();
    }, []);

    return (
        <div className="flex justify-center items-start w-full pt-10 bg-green-300 h-screen">
            <div className="flex flex-col items-center">
                <p className="mb-4 text-xl font-bold">{ t("title") }</p>

                <div className="flex flex-col space-y-4">
                    <label htmlFor="name" className="mb-1 font-medium text-gray-700">
                        { t("name") }
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder={ t("name") }
                        value={ user.name }
                        onChange={ handleNameChange }
                        className="p-2 border border-gray-300 rounded shadow-sm"
                    />
                    <label htmlFor="email" className="mb-1 font-medium text-gray-700">
                        { t("email") }
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder={ t("email") }
                        value={ user.email }
                        onChange={ handleEmailChange }
                        className="p-2 border border-gray-300 rounded shadow-sm"
                    />
                    <label htmlFor="age" className="mb-1 font-medium text-gray-700">
                        { t("age") }
                    </label>
                    <input
                        id="age"
                        type="number"
                        placeholder={ t("age") }
                        value={ user.age }
                        onChange={ handleAgeChange }
                        className="p-2 border border-gray-300 rounded shadow-sm"
                    />
                    <label htmlFor="address" className="mb-1 font-medium text-gray-700">
                        { t("address") }
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder={ t("address") }
                        value={ user.address }
                        onChange={ handleAddressChange }
                        className="p-2 border border-gray-300 rounded shadow-sm"
                    />
                    <label htmlFor="phone" className="mb-1 font-medium text-gray-700">
                        { t("phone") }
                    </label>
                    <input
                        id="phone"
                        type="text"
                        placeholder={ t("phone") }
                        value={ user.phone }
                        onChange={ handlePhoneChange }
                        className="p-2 border border-gray-300 rounded shadow-sm"
                    />
                    <label htmlFor="active" className="mb-1 font-medium text-gray-700">
                        { t("active") }
                    </label>
                    <input
                        id="active"
                        type="checkbox"
                        checked={ user.active }
                        onChange={ handleActiveChange }
                    />
                </div>
            </div>
        </div>
    );
}
