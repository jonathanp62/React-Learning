/*
 * (#)InputFieldsProps.ts   0.5.0   01/19/2026
 * (#)InputFieldsProps.ts   0.4.0   12/15/2025
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

import type { UseFormRegister } from "react-hook-form";
import type { SelectOption } from "./SelectOption";

/** The interface for the component's props for clarity and type safety. */

export interface InputFieldsProps {
    readonly name: string
    readonly type: string
    readonly label: string
    readonly options?: SelectOption[];
    readonly placeholder?: string;
    readonly value?: string;
    readonly defaultValue?: string;
    readonly register: UseFormRegister<any>;
    readonly errorMessage?: string;
}
