/*
 * (#)Countdown.tsx 0.1.0   10/25/2025
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

import type {JSX, RefObject} from "react";

import React, { useState, useEffect, useRef } from 'react';

/**
 * The countdown component.
 *
 * @returns {JSX.Element}
 */
export default function Countdown(): JSX.Element {
    // Use null for empty birthday (safer than empty string)
    const [birthday, setBirthday] = useState<Date | null>(null);

    const [countdownButtonLabel, setCountdownButtonLabel] = useState<string>('Start');
    const [name, setName] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isActive, setIsActive] = useState<boolean>(false);

    // Keep interval identifier in ref to avoid stale closures
    // A mutable object is created with a .current property
    // A ref variable persists across re-renders.
    const intervalRef: RefObject<number | null> = useRef(null);

    /**
     * Validates a date.
     *
     * @param   {Date | null}   d
     * @returns {boolean}
     */
    const isValidDate: (d: Date | null) => boolean = (d: Date | null) => {
        if (d === null) {
            return false;
        }

        return !Number.isNaN(d.getTime());
    }

    /**
     * Handles birthday change.
     *
     * @param   {React.ChangeEvent<HTMLInputElement>}   e
     */
    const handleBirthdayChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // e.target.value comes in "YYYY-MM-DD" format; convert to Date
        const val: string = e.target.value;

        if (!val) {
            setBirthday(null);
            return;
        }

        const dt: Date = new Date(val + 'T00:00:00'); // Make it explicit midnight local time

        if (isValidDate(dt)) {
            setBirthday(dt);
        } else {
            setBirthday(null);
        }
    };

    /**
     * Handle name change.
     *
     * @param   {React.ChangeEvent<HTMLInputElement>}   e
     */
    const handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };

    /**
     * Handle start countdown via form submission.
     *
     * @param   {React.FormEvent<HTMLFormElement>}  e
     */
    const handleStartCountdown: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // Validate before starting

        if (!name || !isValidDate(birthday)) {
            alert('Please enter a valid name and date.');
            return;
        }

        try {
            localStorage.setItem('name', name);
            localStorage.setItem('birthday', birthday!.toISOString());
        } catch (err) {
            console.warn('localStorage is not available', err);
        }

        setIsActive(true);  // Function calculateTimeLeft() will be invoked immediately via the effect
    };

    /**
     * Handle reset countdown.
     */
    const handleReset: () => void = (): void => {
        setCountdownButtonLabel('Start');
        setBirthday(null);
        setName('');
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsActive(false);

        try {
            localStorage.removeItem('name');
            localStorage.removeItem('birthday');
        } catch (err) {
            console.warn('localStorage is not available', err);
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current);

            intervalRef.current = null;
        }
    };

    /**
     * Format number with leading zeros
     *
     * @param   {number}    n
     * @returns             {string}
     */
    const format: (n: number) => string = (n: number): string => String(n).padStart(2, '0');

    // Load saved data from localStorage on component mount (only runs once)

    useEffect((): void => {
        try {
            const savedName: string | null = localStorage.getItem('name');
            const savedBirthday: string | null = localStorage.getItem('birthday');

            if (savedName && savedBirthday) {
                const parsed: Date = new Date(savedBirthday);

                if (isValidDate(parsed)) {
                    setName(savedName);
                    setBirthday(parsed);
                    setIsActive(true); // Auto-start if valid saved data exists
                } else {
                    // Remove invalid saved data

                    localStorage.removeItem('birthday');
                    localStorage.removeItem('name');
                }
            }
        } catch (err) {
            // Local Storage may be unavailable in some environments

            console.warn('localStorage is not available', err);
        }
    }, []);

    // Start/stop interval when isActive or birthday changes

    useEffect((): () => void => {
        /**
         * Calculates the time left until the next birthday.
         */
        const calculateTimeLeft: () => void = (): void => {
            if (!isValidDate(birthday)) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const birthdayDate: Date = birthday!;   // Now the birthday is non-null
            const today: Date = new Date();

            // Create a nextBirthday using this year's month & date (ignore stored year)

            const nextBirthday: Date = new Date(today.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());

            // Ensure nextBirthday is strictly in the future (handles same-day/timezone issues)

            while (nextBirthday <= today) {
                nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
            }

            const timeDifference: number = nextBirthday.getTime() - today.getTime();

            if (timeDifference <= 0) {
                // Defensive check: if for some reason difference is zero or negative, show zeros

                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days: number = Math.floor(timeDifference / (1000 * 3600 * 24));
            const hours: number = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
            const minutes: number = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
            const seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        // Clear any existing interval first

        if (intervalRef.current) {
            clearInterval(intervalRef.current);

            intervalRef.current = null;
        }

        if (isActive && isValidDate(birthday)) {
            // Run an initial calculation immediately
            calculateTimeLeft();

            // Set interval takes a TimerHandler and a timeout value
            // Store the interval identifier in the ref
            // Every one second, the callback function will be executed which invokes calculateTimeLeft()

            intervalRef.current = setInterval(() => {
                calculateTimeLeft();
            }, 1000);
        }

        // Cleanup on unmount or when dependencies change

        return (): void => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);

                intervalRef.current = null;
            }
        };
    }, [isActive, birthday]);

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold mb-6">Countdown to Your Birthday</h1>

            {/* Show form when not active */}

            {!isActive && (
                <form onSubmit={ handleStartCountdown } className="mb-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={ handleNameChange }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                        required
                    />
                    <input
                        type="date"
                        value={ birthday ? birthday.toISOString().substring(0, 10) : '' }
                        onChange={handleBirthdayChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        { countdownButtonLabel} Countdown
                    </button>
                </form>
            )}

            {/* When active, show countdown */}

            {isActive && (
                <div className="text-2xl font-semibold">
                    <p className="mb-4 text-lg text-gray-700">Hello { name }!</p>
                    <div className="flex justify-around mb-4">
                        <div>
                            <span className="block text-blue-600 text-4xl">{ timeLeft.days }</span>
                            <span className="text-gray-500">Days</span>
                        </div>
                        <div>
                            <span className="block text-blue-600 text-4xl">{ format(timeLeft.hours) }</span>
                            <span className="text-gray-500">Hours</span>
                        </div>
                        <div>
                            <span className="block text-blue-600 text-4xl">{ format(timeLeft.minutes) }</span>
                            <span className="text-gray-500">Minutes</span>
                        </div>
                        <div>
                            <span className="block text-blue-600 text-4xl">{ format(timeLeft.seconds) }</span>
                            <span className="text-gray-500">Seconds</span>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={ handleReset }
                            className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            Reset
                        </button>

                        <button
                            onClick={() => {
                                // Allow pausing the countdown without clearing saved data
                                if (isActive) {
                                    setIsActive(false);
                                } else if (isValidDate(birthday)) {
                                    // Resume
                                    setIsActive(true);
                                }

                                setCountdownButtonLabel(isActive ? 'Resume' : 'Pause');
                            }}
                            className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                        >
                            Pause
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
