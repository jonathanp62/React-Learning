/*
 * (#)FlashlightToggle.tsx   0.2.0   11/04/2025
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

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * The flashlight toggle component.
 *
 * @returns {JSX.Element}
 */
export default function FlashlightToggle(): JSX.Element {
    const { t } = useTranslation();
    const [isOn, setIsOn] = useState<boolean>(false);

    const toggleFlashlight: () => void = (): void => setIsOn(!isOn);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-center">
                {/* Bulb */}
                <div className={ `relative 
                                    w-24 
                                    h-40 
                                    mx-auto 
                                    mb-8 
                                    transition-transform 
                                    duration-300 
                                    ease-in-out 
                                    ${ isOn ? 'scale-105' : 'scale-100' }
                                 ` }
                >
                    {/* Bulb Glass */}
                    <div className={ `absolute 
                                        inset-0 
                                        rounded-full 
                                        bg-yellow-300 
                                        ${ isOn ? 'opacity-100 shadow-[0px_0px_30px_15px_rgba(255,223,72,0.8)]' : 'opacity-50' }
                                     ` }
                    />

                    {/* Bulb Bottom (Socket) */}
                    <div className="absolute bottom-0 w-full h-8 bg-gray-800 rounded-b-md" />

                    {/* Wires */}
                    <div className="absolute
                                    top-0
                                    w-1
                                    h-10
                                    bg-yellow-500
                                    left-1/2
                                    transform -translate-x-1/2"
                    />
                </div>

                {/* Toggle Button */}
                <button
                    onClick={ toggleFlashlight }
                    className={ `mt-6 
                                    px-6 
                                    py-3 
                                    rounded-full 
                                    text-lg 
                                    font-semibold 
                                    shadow-lg 
                                    transition-transform 
                                    duration-300 
                                    transform hover:scale-105
                                     ${ isOn ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white' }
                                ` }
                >
                    {isOn ? t("turn-off") : t("turn-on")}
                </button>
            </div>
        </div>
    );
}
