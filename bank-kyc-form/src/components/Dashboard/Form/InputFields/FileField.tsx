/*
 * (#)FileField.tsx 0.4.0   12/09/2025
 *
 * @author  Jonathan Parker
 * @version 0.4.0
 * @since   0.4.0
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
import type { FileFieldProps } from "../../../../types/FileFieldProps";

import React, { useState, useRef } from "react";
import { useTranslation } from 'react-i18next';

import Delete from "../../../../icons/Delete";

/**
 * The file field component.
 *
 * @param   {FileFieldProps}    props   The props for the component
 * @returns {JSX.Element}
 */

export default function FileField({ name, label, register, errorMessage }: Readonly<FileFieldProps>): JSX.Element {
    const { t } = useTranslation();

    const fileRef: React.RefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const [ image, setImage ] = useState<string | null>(null);

    const previewFile: (event: React.ChangeEvent<HTMLInputElement>) => void = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    const clearImage: () => void = (): void => {
        setImage(null);

        if (fileRef.current) {
            fileRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-1/2 col-span-3 mt-10 place-self-center">
            <div className="upload-file">
                <label htmlFor={ name } className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer hover:underline">
                    {
                        image === null
                            ?
                            <>
                                <p className="mb-2 text-sm text-black"><span className="font-semibold">{ t("upload") }</span> { label }</p>
                                <p className="text-xs text-black">PNG, JPG or JPEG (up to 800x400 px)</p>
                            </>
                            :
                            <img src={image} className="my-8 w-72" alt="" />
                    }
                </label>

                {((): JSX.Element => {
                    const { ref, onChange, ...rest } = register(name);

                    return (
                        <input
                            id={ name }
                            type="file"
                            className="file-input"
                            accept="image/*"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                                previewFile(event);   // update preview
                                onChange(event);      // notify react-hook-form
                            }}
                            ref={(element: HTMLInputElement | null): void => {
                                fileRef.current = element; // keep your own ref
                                ref(element);              // give ref back to RHF
                            }}
                            { ...rest }
                        />
                    );
                })()}

                {
                    image &&
                    <button onClick={ clearImage } type="button" className="flex items-center justify-center gap-4 px-6 py-1 my-4 text-white transition ease-in rounded-full shadow-md bg-primary hover:bg-secondary">
                        <p className="text-sm">
                            { t("delete") }
                        </p>
                        <Delete />
                    </button>
                }
            </div>

            <span className="error">{errorMessage}</span>
        </div>
    );
}
