/*
 * (#)index.tsx 0.4.0   12/08/2025
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
import type { InputFieldsProps } from "../../../../types/InputFieldsProps";

import DropDown from "./DropDown";
import FileField from "./FileField";
import TextField from "./TextField";

/**
 * The input fields component.
 *
 * @param   {InputFieldsProps}    props   The props for the component
 * @returns {JSX.Element}
 */
export default function InputFields({ name, type, label, options, placeholder, defaultValue, register, errorMessage }: Readonly<InputFieldsProps>): JSX.Element {
    if (type === "select") {
        return (
            <DropDown
                name={ name }
                label={ label }
                defaultValue={ defaultValue }
                register={ register }
                errorMessage={ errorMessage }
                options={ options }
            />
        );
    } else if (type === "file") {
        return (
            <FileField
                name={ name }
                label={ label }
                register={ register }
                errorMessage={ errorMessage }
            />
        );
    } else {
        return (
            <TextField
                name={ name }
                register={ register }
                label={ label }
                placeholder={ placeholder }
                errorMessage={ errorMessage } />
        );
    }
}