/*
 * (#)CurrencyConverter.tsx 0.2.0   10/28/2025
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

import type {ChangeEvent, JSX} from "react";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/** The interface for the component's props for clarity and type safety. */
export interface Props {
    readonly exchangeRateApi: string;
}

/** The interface for the exchange rate data for clarity and type safety. */
type ExchangeRateData = {
    provider: string;
    WARNING_UPGRADE_TO_V6: string;
    terms: string;
    base: string;
    date: string;
    time_last_updated: number;
    rates: {
        [key: string]: number;
    };
};

/**
 * The currency converter component.
 *
 * @returns {JSX.Element}
 */
export default function CurrencyConverter({ exchangeRateApi }: Props): JSX.Element {
    const { t } = useTranslation();
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>('USD');
    const [toCurrency, setToCurrency] = useState<string>('EUR');
    const [exchangeRate, setExchangeRate] = useState<number | null>(1);
    const [currencies, setCurrencies] = useState<string[]>([]);

    // Fetch all currencies and set initial exchange rate on component mount

    useEffect((): void => {
        const fetchCurrencies: () => Promise<void> = async (): Promise<void> => {
            try {
                const response: Response = await fetch(`${exchangeRateApi}/USD`);
                const data: ExchangeRateData = await response.json();

                setCurrencies(Object.keys(data.rates)); // Set currencies as an array of keys (currency codes)
            } catch (error) {
                console.error(`${ t("error-currencies") }: `, error);
            }
        };

        fetchCurrencies();
    }, [exchangeRateApi, t]);

    // Fetch exchange rate whenever `fromCurrency` or `toCurrency` changes

    useEffect((): void => {
        const fetchExchangeRate: () => Promise<void> = async (): Promise<void> => {
            if (fromCurrency === toCurrency) {
                setExchangeRate(1);
                return;
            }

            try {
                const response: Response = await fetch(`${exchangeRateApi}/${fromCurrency}`);
                const data: ExchangeRateData = await response.json();

                setExchangeRate(data.rates[toCurrency]);
            } catch (error) {
                console.error(`${ t("error-exchange-rate") }: `, error);
                setExchangeRate(null);
            }
        };

        fetchExchangeRate();
    }, [fromCurrency, toCurrency, exchangeRateApi, t]);

    // Handle amount change
    const handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => setAmount(Number(e.target.value));

    // Calculate converted amount
    const calculateConversion: () => string = (): string => (exchangeRate ? (amount * exchangeRate).toFixed(2) : "Error");

    return (
        <div className="max-w-md w-full bg-green-300 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">{ t("title") }</h1>

            <div className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-600" htmlFor="amount-input">{ t("amount") }</label>
                <input
                    id="amount-input"
                    type="number"
                    value={ amount }
                    onChange={ handleAmountChange }
                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-sm font-medium text-gray-600" htmlFor="from-currency-input">{ t("from") }</label>
                    <select
                        id="from-currency-input"
                        value={ fromCurrency }
                        onChange={ (e: ChangeEvent<HTMLSelectElement>): void => setFromCurrency(e.target.value) }
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        {currencies.map((currency: string): JSX.Element => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={(): void => {
                        const temp: string = fromCurrency;

                        setFromCurrency(toCurrency);
                        setToCurrency(temp);
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    { t("swap-currencies") }...
                </button>

                <div>
                    <label className="text-sm font-medium text-gray-600" htmlFor="to-currency-input">{ t("to") }</label>
                    <select
                        id="to-currency-input"
                        value={toCurrency}
                        onChange={ (e: ChangeEvent<HTMLSelectElement>): void => setToCurrency(e.target.value) }
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        {currencies.map((currency: string): JSX.Element => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-700">{ t("converted-amount") }:</p>
                <p className="text-2xl font-bold text-gray-900">{ calculateConversion() } { toCurrency }</p>
            </div>
        </div>
    );
}
