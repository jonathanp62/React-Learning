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

import React, { useState, useEffect } from 'react';
//import { useTranslate, T } from '@tolgee/react';

/**
 * The BMI calculator component.
 *
 * @returns {JSX.Element}
 */
export default function BMICalculator(): JSX.Element {
    // const { t } = useTranslate();
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
            const bmiAsNumber: number = (weightAsNumber / (heightAsNumber * heightAsNumber));
            const bmiAsString: string = bmiAsNumber.toFixed(2);

            setBMI(bmiAsString);
            setIsCalculated(true);

            if (bmiAsNumber < 18.5) {
                // setMessage(t('bmi-calculator-underweight'));
                setMessage('Under weight');
            } else if (bmiAsNumber < 24.9) {
                // setMessage(t('bmi-calculator-normal-weight'));
                setMessage('Normal weight');
            } else if (bmiAsNumber < 29.9) {
                // setMessage(t('bmi-calculator-overweight'));
                setMessage('Over weight');
            } else {
                // setMessage(t('bmi-calculator-obese'));
                setMessage('Obese');
            }
        } else {
            // setMessage(t('bmi-calculator-invalid-input'));
            setMessage('Invalid input');
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-200">
            <h1 className="text-3xl font-bold underline">BMI Calculator</h1>
        </div>
    );
}
