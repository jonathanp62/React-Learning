/*
 * (#)BMICalculator.tsx 0.1.0   10/26/2025
 *
 * @author  Jonathan Parker
 * @version 0.1.0
 * @since   0.1.0
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
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

/**
 * The BMI calculator component.
 *
 * @returns {JSX.Element}
 */
export default function BMICalculator(): JSX.Element {
    const { t } = useTranslation();
    const [unit, setUnit] = useState<string>('metric'); // 'metric' or 'imperial'
    const [height, setHeight] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [bmi, setBMI] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const [isCalculated, setIsCalculated] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    // Executed whenever the bmi state changes

    useEffect((): (() => void) | undefined => {
        if (bmi !== null) {
            setIsAnimating(true);

            const timer: number = setTimeout(() => setIsAnimating(false), 500);

            // Cleanup code after the effect has run

            return (): void => clearTimeout(timer);
        }
    }, [bmi]);

    /**
     * Calculates the BMI via form submission
     *
     * @param   {React.FormEvent<HTMLFormElement>}  e
     */
    const calculateBMI: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (height && weight) {
            const heightAsNumber: number = Number.parseFloat(height);
            const weightAsNumber: number = Number.parseFloat(weight);

            let bmiAsNumber: number;

            if (unit ==='metric') {
                bmiAsNumber = (weightAsNumber / (heightAsNumber * heightAsNumber));
            } else {
                bmiAsNumber = (weightAsNumber / (heightAsNumber * heightAsNumber)) * 703;
            }

            const bmiAsString: string = bmiAsNumber.toFixed(2);

            setBMI(bmiAsString);
            setIsCalculated(true);

            if (bmiAsNumber < 18.5) {
                setMessage(t('under-weight'));
            } else if (bmiAsNumber < 24.9) {
                setMessage(t('normal-weight'));
            } else if (bmiAsNumber < 29.9) {
                setMessage(t('over-weight'));
            } else {
                setMessage(t('obese'));
            }
        } else {
            setMessage(t('invalid-input'));
        }
    };

    /**
     * Resets the form.
     */
    const resetForm: () => void = (): void => {
        setHeight('');
        setWeight('');
        setBMI(null);
        setMessage('');
        setIsCalculated(false);
        setIsAnimating(false);
    };

    /**
     * Returns the color of the BMI.
     *
     * @returns {string}
     */
    const getBMIColor: () => string = (): string => {
        if (!bmi) return 'text-gray-600';

        const bmiValue = Number.parseFloat(bmi);

        if (bmiValue < 18.5) return 'text-blue-500';
        if (bmiValue < 24.9) return 'text-green-500';
        if (bmiValue < 29.9) return 'text-yellow-500';

        return 'text-red-500';
    };

    /**
     * Returns the color of the message.
     *
     * @returns {string}
     */
    const getMessageColor: () => string = (): string => {
        if (!bmi) return 'text-gray-600';

        const bmiValue = Number.parseFloat(bmi);

        if (bmiValue < 18.5) return 'text-blue-600';
        if (bmiValue < 24.9) return 'text-green-600';
        if (bmiValue < 29.9) return 'text-yellow-600';

        return 'text-red-600';
    };

    const heightPlaceholderUnits: string = unit === 'metric' ? t('meters') : t('inches');
    const weightPlaceholderUnits: string = unit === 'metric' ? t('kgs') : t('pounds');

    return (
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-xl">
            <h1 className="text-2xl font-bold mb-4 transition-transform duration-300 hover:scale-105">
                {t('title')}
            </h1>

            <div className="mb-4 -ml-10 mr-5 mt-10">
                <label className="mr-2 font-medium -ml-20">{t('units')}</label>
                <select
                    value={ unit }
                    onChange={ (e) => { setUnit(e.target.value); resetForm(); } }
                    className="border rounded px-2 py-1"
                >
                    <option value="metric">{t('metric')}</option>
                    <option value="imperial">{t('imperial')}</option>
                </select>
            </div>

            <form onSubmit={ calculateBMI } className="mb-4">
                <div className="mb-4 transition-all duration-300">
                    <label className="block text-left font-medium text-gray-700 mb-1 transition-colors duration-300">
                        {t('height')}
                    </label>
                    <input
                        type="number"
                        value={ height }
                        onChange={ (e) => setHeight(e.target.value) }
                        step="0.01"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-300"
                        placeholder={t('height-placeholder', { units: heightPlaceholderUnits })}
                        required
                    />
                </div>

                <div className="mb-6 transition-all duration-300">
                    <label className="block text-left font-medium text-gray-700 mb-1 transition-colors duration-300">
                        {t('weight')}
                    </label>
                    <input
                        type="number"
                        value={weight}
                        onChange={ (e) => setWeight(e.target.value) }
                        step="0.1"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-300"
                        placeholder={t('weight-placeholder', { units: weightPlaceholderUnits })}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                >
                    {t('calculate')}
                </button>
            </form>

            {isCalculated && (
                <div
                    className={`
                        transition-all duration-500 transform
                        ${isAnimating ? 'scale-110 opacity-90' : 'scale-100 opacity-100'}
                    `}
                >
                    <div className="bg-linear-to-r from-blue-50 to-green-50 p-6 rounded-lg border-2 border-gray-100 shadow-inner">
                        <div className="flex items-center justify-center mb-4">
                            <div className={ `text-4xl font-bold ${getBMIColor()} transition-all duration-500 transform hover:scale-110` }>
                                {bmi}
                            </div>
                        </div>

                        <p className="text-lg font-semibold mb-2 transition-colors duration-300">
                            {t('your-bmi')}
                        </p>

                        <div
                            className={`
                                text-md font-medium p-3 rounded-lg bg-white shadow-sm border
                                transition-all duration-500 ${getMessageColor()}
                                ${isAnimating ? 'translate-y-2' : 'translate-y-0'}
                            `}
                        >
                            {message}
                        </div>

                        {/* BMI Scale Indicator */}

                        <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ease-out ${
                                    Number.parseFloat(bmi!) < 18.5 ? 'bg-blue-500 w-1/4' :
                                        Number.parseFloat(bmi!) < 24.9 ? 'bg-green-500 w-1/2' :
                                            Number.parseFloat(bmi!) < 29.9 ? 'bg-yellow-500 w-3/4' :
                                                'bg-red-500 w-full'
                                }`}
                                style={{
                                    transition: 'width 1s ease-out, background-color 1s ease-out'
                                }}
                            ></div>
                        </div>

                        <button
                            onClick={ resetForm }
                            className="mt-6 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 active:scale-95 w-full"
                        >
                            {t('reset')}
                        </button>
                    </div>
                </div>
                )}
        </div>
    );
}
