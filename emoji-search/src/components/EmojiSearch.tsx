/*
 * (#)EmojiSearch.tsx   0.2.0   10/30/2025
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
import {motion} from 'framer-motion';
import { useTranslation } from 'react-i18next';

type Emoji = {
    symbol: string;
    name: string;
}

const emojiList: Emoji[] = [
    { symbol: '😀', name: 'Grinning Face' },
    { symbol: '😂', name: 'Face with Tears of Joy' },
    { symbol: '❤️', name: 'Red Heart' },
    { symbol: '🔥', name: 'Fire' },
    { symbol: '🎉', name: 'Party Popper' },
    { symbol: '🍕', name: 'Pizza' },
    { symbol: '🚀', name: 'Rocket' },
    { symbol: '🌈', name: 'Rainbow' },
    { symbol: '🎶', name: 'Musical Notes' },
    { symbol: '⚽️', name: 'Soccer Ball' },
    { symbol: '🐶', name: 'Dog Face' },
    { symbol: '🐱', name: 'Cat Face' },
];

/**
 * The emoji search component.
 *
 * @returns {JSX.Element}
 */
export default function EmojiSearch(): JSX.Element {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredEmojis: Emoji[] = emojiList.filter((emoji: Emoji): boolean =>
        emoji.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center ">
            <h1 className="text-2xl font-bold mb-4 border border-box rounded bg-yellow-100">{ t("title") }</h1>

            <input
                type="text"
                placeholder={ `${t("search-for-an-emoji")}...` }
                value={ searchTerm }
                onChange={ (e: React.ChangeEvent<HTMLInputElement>): void => setSearchTerm(e.target.value) }
                className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-xl transition-shadow duration-220"
            />

            <div className="grid grid-cols-3 gap-4">
                {filteredEmojis.map((emoji: Emoji): JSX.Element => (
                    <motion.div
                        key={emoji.symbol}
                        className="p-4 border rounded-lg hover:bg-gray-100 text-2xl"
                        initial={{ y: 50, opacity: 0.5}}
                        animate={{ y: 0, opacity: 1}}
                        whileHover={{ y: -20, scale: 1.2}}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 10,
                        }}
                    >
                        <span>{emoji.symbol}</span>
                        <p className="text-sm mt-1">{emoji.name}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
