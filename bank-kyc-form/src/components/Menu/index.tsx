/*
 * (#)index.tsx 0.4.0   12/06/2025
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

import { useTranslation } from 'react-i18next';

import Verify from '../../icons/Verify.tsx';

/**
 * The menu component.
 *
 * @returns {JSX.Element}
 */
export default function Menu(): JSX.Element {
    const { t } = useTranslation();

    return (
        <div className="sticky top-0 right-0 flex flex-col h-screen gap-20 p-6 pt-10 text-white bg-dark font-primary">
            <div className="flex items-center brand">
                <img
                    src="https://raw.githubusercontent.com/trishan6969/sign-in-page/main/images/logo.png"
                    alt={ t("logo") }
                    className="w-20"
                />
                <h1 className="ml-8 text-2xl font-bold">{ t("title") }</h1>
            </div>

            <div className="menus">
                <button
                    type="button"
                    id="user-action-submit"
                    className="flex items-center w-full gap-2 p-4 font-bold text-left transition ease-in rounded-md bg-primary hover:bg-secondary"
                >
                    <Verify />
                    { t("verify") }
                </button>
            </div>
        </div>
    );
}
