/*
 * (#)CryptoPriceChecker.tsx   0.2.0   11/06/2025
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

import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type CryptoResponse = {
    bitcoin: {
        usd: number;
    };
    cardano: {
        usd: number;
    };
    dogecoin: {
        usd: number;
    };
    ethereum: {
        usd: number;
    };
    litecoin: {
        usd: number;
    };
}

type CryptoSymbol = keyof CryptoResponse;

/**
 * The crypto price checker component.
 *
 * @returns {JSX.Element}
 */
export default function CryptoPriceChecker(): JSX.Element {
    const defaultPrices = {
        bitcoin: {
            usd: 0
        },
        cardano: {
            usd: 0
        },
        dogecoin: {
            usd: 0
        },
        ethereum: {
            usd: 0
        },
        litecoin: {
            usd: 0
        }
    }

    const { t } = useTranslation();
    const [prices, setPrices] = useState<CryptoResponse>(defaultPrices);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    /*
     * Memoize cryptoSymbols using useMemo. This ensures the array's reference remains
     * stable across re-renders, preventing the useEffect from running unnecessarily.
     */

    const cryptoSymbols: CryptoSymbol[] = useMemo((): CryptoSymbol[] => ["bitcoin", "ethereum", "dogecoin", "cardano", "litecoin"], []);

    useEffect((): void => {
        const fetchPrices: () => Promise<void> = async (): Promise<void> => {
            try {
                setIsLoading(true);

                const response: Response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbols.join(
                        ","
                    )}&vs_currencies=usd`
                );

                const data: CryptoResponse = await response.json();

                setPrices(data);
            } catch (error) {
                setError(`Failed to fetch data: ${error}`);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPrices();
    }, [cryptoSymbols]);

    const refreshPrices: () => void = (): void => {
        const refresh: () => Promise<void> = async (): Promise<void> => {
            try {
                const response: Response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbols.join(
                        ","
                    )}&vs_currencies=usd`
                );

                const data: CryptoResponse = await response.json();

                setPrices(data);
            } catch (error) {
                setError(`Failed to fetch data: ${error}`);
            }
        };

        refresh();
    };

    if (isLoading) {
        return <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">Loading data...</div>;
    }

    if (error) {
        return <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-red-500">Error: { error }</div>;
    }

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl text-center font-bold mb-4 text-gray-800">{ t("title") }</h1>

            <div className="space-y-4">
                { cryptoSymbols.map((crypto: CryptoSymbol): JSX.Element => (
                    <div
                        key={ crypto }
                        className="flex justify-between items-center p-4 bg-gray-100 rounded"
                    >
                        <span className="capitalize font-medium text-gray-700">{ crypto }</span>
                        <span className="font-semibold text-gray-800">
                            ${prices[crypto].usd.toFixed(2)}
                        </span>
                    </div>
                ))}
                <div className="flex justify-center items-center p-4 bg-gray-100 rounded">
                    <button
                        onClick={ refreshPrices }
                        className="px-6
                                    py-3
                                    rounded-full
                                    text-lg
                                    font-semibold
                                    shadow-lg
                                    transition-transform
                                    duration-300
                                    transform hover:scale-105
                                    bg-gray-200 text-gray-700"
                    >
                        Refresh Prices
                    </button>
                </div>
            </div>
        </div>
    );
}
