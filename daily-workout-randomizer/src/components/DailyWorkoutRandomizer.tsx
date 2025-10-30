/*
 * (#)DailyWorkoutRandomizer.tsx    0.2.0   10/30/2025
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
import workoutRoutines from '../workout-routines.json';

interface Workout {
    name: string;
    exercises: string[];
}

/**
 * A simple hash function that returns a number based on the input string.
 *
 * @param   {string}    str The string to hash.
 * @returns             {number} The hash value
 */
function simpleHash(str: string): number {
    let hash: number = 0;

    for (let i: number = 0; i < str.length; i++) {
        const char: number | undefined = str.codePointAt(i);

        if (char !== undefined) {
            hash = (hash << 5) - hash + char;
        }

        hash = Math.trunc(hash);    // Only keep the integer component
    }

    return hash;
}

/**
 * The daily workout randomizer component.
 *
 * @returns {JSX.Element}
 */
export default function DailyWorkoutRandomizer(): JSX.Element {
    const { t } = useTranslation();
    const [workout, setWorkout] = useState<Workout | null>(null);

    const getRandomWorkout: () => void = (): void => {
        const randomIndex: number = Math.floor(Math.random() * workoutRoutines.length);

        setWorkout(workoutRoutines[randomIndex]);
    };

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{ t("title") }</h1>
            <button
                onClick={ getRandomWorkout }
                className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                { t("get-workout") }
            </button>
            {workout && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">{workout.name}</h2>
                    <ul className="mt-2 list-disc list-inside">
                        {workout.exercises.map((exercise: string, _index: number): JSX.Element => (
                            <li key={ simpleHash(exercise) } className="text-gray-700">
                                {exercise}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
