/*
 * (#)TextField.tsx 0.5.0   01/19/2026
 * (#)TextField.tsx 0.4.0   12/15/2025
 *
 * @author  Jonathan Parker
 * @version 0.5.0
 * @since   0.4.0
 *
 * MIT License
 *
 * Copyright (c) 2025, 2026 Jonathan M. Parker
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
import type { TextFieldProps } from "../../types/TextFieldProps";

/**
 * The text field component.
 *
 * @param   {TextFieldProps}    props   The props for the component
 * @returns {JSX.Element}
 */
export default function TextField({ name, label, value, placeholder, register, errorMessage }: Readonly<TextFieldProps>): JSX.Element {
    return (
        <div className="text-container">
            <label className="dark:text-white" htmlFor={ name }>{ label }</label>
            <input
                className="text-field peer dark:text-white"
                id={ name }
                placeholder={ placeholder }
                value={ value }
                type="text"
                { ...register(name) }
            />
            <span className="error">{ errorMessage }</span>
        </div>
    );
}
