/*
 * (#)FunFactGenerator.tsx   0.2.0   11/05/2025
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

import { useState} from "react";
import { useTranslation } from "react-i18next";

import packageJson from "../../package.json";

type FunFact = {
    id: string
    text: string
    source: string
    source_url: string
    language: string
    permalink: string
}

/**
 * The fun fact generator component.
 *
 * @returns {JSX.Element}
 */
export default function FunFactGenerator(): JSX.Element {
    const { t } = useTranslation();
    const [fact, setFact] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchFunFact: () => Promise<void> = async (): Promise<void> => {
        setLoading(true);

        try {
            const dataSource: string = packageJson.appConfig.dataSource;
            const response: Response = await fetch(dataSource);
            const data: FunFact = await response.json();

            setFact(data.text);
        } catch (error) {
            setFact(`Error fetching a fun fact: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">{ t("title") }</h1>
            <p className="text-gray-600 italic mb-6">{ fact || `${t("prompt")}!` }</p>

            <button
                onClick={ fetchFunFact }
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            >
                { loading ? `${t("loading")}...` : t("get-fun-fact") }
            </button>
        </div>
    );
}
