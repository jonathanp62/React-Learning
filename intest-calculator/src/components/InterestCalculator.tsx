/*
 * (#)InterestCalculator.tsx   0.2.0   11/10/2025
 *
 * @author  Jonathan Parker
 * @version 0.2.0
 * @since   0.2.0
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

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * The interest calculator component.
 *
 * @returns {JSX.Element}
 */
export default function InterestCalculator(): JSX.Element {
    const { t } = useTranslation();
    const [principal, setPrincipal] = useState<string>('');
    const [rate, setRate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [interestType, setInterestType] = useState<string>('simple');
    const [result, setResult] = useState<string | null>(null);

    const calculateInterest: () => void = (): void => {
        const P: number = parseFloat(principal);
        const R: number = parseFloat(rate) / 100;
        const T: number = parseFloat(time);

        if (isNaN(P) || isNaN(R) || isNaN(T)) {
            setResult(`${t("invalid-input")}.`);
            return;
        }

        let interest;

        if (interestType === 'simple') {
            interest = P * R * T;
        } else {
            interest = P * (Math.pow((1 + R), T) - 1);
        }

        setResult(interest.toFixed(2));
    };

    const startOver: () => void = (): void => {
        setPrincipal('');
        setRate('');
        setTime('');
        setInterestType('simple');
        setResult(null);
    };

    const isInputError: () => boolean = (): boolean => {
        if (result === null) {
            return false;
        } else {
            return result.startsWith("Please");
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">{ t("title") }</h1>

            <div className="mb-4">
                <label className="block text-gray-700">{ t("principal-amount") }</label>
                <input
                    type="number"
                    value={ principal }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>): void => setPrincipal(e.target.value) }
                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                    placeholder={ t("enter-principal-amount")}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">{ t("interest-rate") }</label>
                <input
                    type="number"
                    value={ rate }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setRate(e.target.value) }
                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                    placeholder={ t("enter-interest-rate") }
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">{ t("time-in-years") }</label>
                <input
                    type="number"
                    value={ time }
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value) }
                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                    placeholder={ t("enter-time-in-years") }
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">{ t("interest-type") }</label>
                <select
                    value={ interestType }
                    onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => setInterestType(e.target.value) }
                    className="w-full p-2 mt-2 border border-gray-300 rounded"
                >
                    <option value="simple">{ t("simple-interest") }</option>
                    <option value="compound">{ t("compound-interest") }</option>
                </select>
            </div>

            <button
                onClick={ calculateInterest }
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                { t("calculate") }
            </button>

            {result && (
                <>
                    <div className="mt-4 p-4 bg-green-100 rounded text-green-800 font-semibold">
                        { isInputError() ? result : t("interest") + ": " + result }
                    </div>

                    <button
                        onClick={ startOver }
                        className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-500 transition mt-4"
                    >
                        { t("start-over") }
                    </button>
                </>
            )}
        </div>
    );
}
