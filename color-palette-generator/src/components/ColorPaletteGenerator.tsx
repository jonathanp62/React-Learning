/*
 * (#)ColorPaletteGenerator.tsx 0.2.0   10/28/2025
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

import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { IoIosArrowDropdownCircle } from "react-icons/io";

/**
 * The color palette generator component.
 *
 * @returns {JSX.Element}
 */
export default function ColorPaletteGenerator(): JSX.Element {
    const { t } = useTranslation();
    const [palettes, setPalettes] = useState<string[][][]>([]);
    const [copiedColor, setCopiedColor] = useState<string | null>(null);
    const [paletteStates, setPaletteStates] = useState<boolean[]>([]);
    const [rotation, setRotation] = useState<number[]>(new Array(8).fill(0)); // Initialize rotation to 0 for all palettes

    const generateRandomMatchingColors: () => void = (): void => {
        const baseColors: string[] = [
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
            getRandomColor(),
        ];

        const generatedPalette: string[][] = baseColors.map((baseColor: string): string[] => {
            return [
                baseColor,
                shadeColor(baseColor, -20),
                shadeColor(baseColor, 20),
            ];
        });

        setPaletteStates((prevStates: boolean[]): boolean[] => [...prevStates, true]);
        setPalettes((prevPalettes: string[][][]): string[][][] => [...prevPalettes, generatedPalette]);
        setRotation((prevRotation: number[]): number[] => [...prevRotation, 0]);
    }

    const deletePalette: (index: number) => void = (index: number): void => {
        const updatedPalettes: string[][][] = [...palettes];
        const updatedStates: boolean[] = [...paletteStates];
        const updatedRotation: number[] = [...rotation];

        updatedPalettes.splice(index, 1);
        updatedStates.splice(index, 1);
        updatedRotation.splice(index, 1);

        setPalettes(updatedPalettes);
        setPaletteStates(updatedStates);
        setRotation(updatedRotation);
    };

    const togglePalette: (index: number) => void = (index: number): void => {
        const updatedStates: boolean[] = [...paletteStates];

        updatedStates[index] = !updatedStates[index];
        setPaletteStates(updatedStates);

        const updatedRotation: number[] = [...rotation];

        updatedRotation[index] = updatedStates[index] ? -90 : 0;
        setRotation(updatedRotation);
    };

    const copyToClipboard: (text: string) => void = (text: string): void => {
        navigator.clipboard.writeText(text).then((): void => {
            setCopiedColor(text);
            setTimeout((): void => {
                setCopiedColor(null);
            }, 2000);
        });
    };

    /**
     * Generates a random color.
     *
     * @returns {string}
     */
    function getRandomColor(): string {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    /**
     * Shades a color by a given percentage.
     *
     * @param   {string}    color
     * @param   {number}    percent
     * @return              {string}
     */
    function shadeColor(color: string, percent: number): string {
        const num: number = Number.parseInt(color.slice(1), 16);
        const amt: number = Math.round(2.55 * percent);
        const R: number = (num >> 16) + amt;
        const G: number = ((num >> 8) & 0x00ff) + amt;
        const B: number = (num & 0x0000ff) + amt;

        return `#${((1 << 24) | (R << 16) | (G << 8) | B)
            .toString(16)
            .slice(1)}`;
    }

    return (
        <div className="p-8 flex items-center flex-col">
            <nav className="sticky top-8">
                <button
                    className="bg-blue-500 hover:bg-blue-700 hover:scale-105 active:scale-90 text-white shadow-xl hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,1)] font-bold py-2 px-4 mb-4 transition-all duration-300"
                    onClick={ generateRandomMatchingColors }
                    type="button"
                >
                    { t("generate-palette") }
                </button>
            </nav>
            {palettes.map((palette: string[][], index: number): JSX.Element => (
                <div key={index} className="mb-8">
                    <div className="flex items-center justify-between p-2 w-[100vw] md:w-[50vw]">
                        <h2
                            className="text-lg font-semibold mb-2 cursor-pointer flex items-center"
                            onClick={ (): void => togglePalette(index) }
                        >
                            <IoIosArrowDropdownCircle
                                className="text-2xl mr-2"
                                style={{
                                    transform: `rotate(${rotation[index]}deg)`,
                                    transition: "transform 0.3s ease",
                                }}
                            />
                            { t("palette") } {index + 1}{" "}   {/* TODO: Improve */}
                        </h2>
                        <button
                            className="text-red-500 hover:underline font-semibold"
                            onClick={ (): void => deletePalette(index) }
                            type="button"
                        >
                            { t("delete-palette") }
                        </button>
                    </div>
                    <div
                        className={`flex flex-wrap items-center justify-around w-full transition-all duration-300 ${
                            paletteStates[index] ? "opacity-100 h-auto" : "opacity-0 h-0"
                        }`}
                    >
                        {palette.map((colors: string[], colorIndex: number): JSX.Element => (
                            <div key={colorIndex} className="flex flex-col items-center m-2">
                                <div
                                    className="w-16 h-16 rounded-full cursor-pointer transition-all duration-300 hover:scale-105"
                                    style={{ backgroundColor: colors[0] }}
                                    onClick={ () => copyToClipboard(colors[0]) }
                                />
                                    <span
                                        className="mt-2 cursor-pointer"
                                        onClick={ () => copyToClipboard(colors[0]) }
                                    >
                                        { copiedColor === colors[0] ? t("copied") : colors[0] }
                                    </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
