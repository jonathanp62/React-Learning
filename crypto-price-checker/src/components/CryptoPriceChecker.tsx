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

import { useState, useEffect } from 'react';
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

/**
 * The crypto price checker component.
 *
 * @returns {JSX.Element}
 */
export default function CryptoPriceChecker(): JSX.Element {
    const { t } = useTranslation();
    const [prices, setPrices] = useState<CryptoResponse>();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const cryptoSymbols: string[] = ["bitcoin", "ethereum", "dogecoin", "cardano", "litecoin"];

    useEffect((): void => {
        const fetchPrices: () => Promise<void> = async (): Promise<void> => {
            try {
                setIsLoading(true);

                const symbols: string[] = ["bitcoin", "ethereum", "dogecoin", "cardano", "litecoin"];
                const response: Response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${symbols.join(
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
    }, []);

    if (isLoading) {
        return <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">Loading data...</div>;
    }

    if (error) {
        return <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">Error: {error}</div>;
    }

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">{ t("title") }</h1>
        </div>
    );
}
