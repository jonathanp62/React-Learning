/*
 * (#)ContactAdded.tsx  0.2.0   11/08/2025
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
import type { ContactType } from "../types/ContactType.tsx";
import type ContactAdderProps from "../types/ContactAdderProps.tsx";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from 'react-i18next';

/**
 * The contact adder component.
 *
 * @returns {JSX.Element}
 */
export default function ContactAdder({ addContactFunction }: Readonly<ContactAdderProps> ): JSX.Element {
    const {t} = useTranslation();

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const onClickHandler: () => void = (): void => {
        const contact: ContactType = {
            id: Math.random(),
            name: name,
            phone: phone,
            email: email,
            address: address
        };

        addContactFunction(contact);
    };

    return (
        <div className="input_fields">
            <h2>{ t("add-contact") }</h2>
            <br />
            <input
                type="text"
                value={ name }
                placeholder={ t("name") }
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setName(e.target.value)}
            />
            <br /> <br />
            <input
                type="text"
                value={ phone }
                placeholder={ t("phone") }
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPhone(e.target.value)}
            />
            <br /> <br />
            <input
                type="text"
                value={ email }
                placeholder={ t("email") }
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
            />
            <br /> <br />
            <input
                type="text"
                value={ address }
                placeholder={ t("address") }
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setAddress(e.target.value)}
            />
            <br /> <br />
            <button onClick={ onClickHandler }>
                { t("add-contact") }
                <Plus size={ 25 } />
            </button>
        </div>
    );
}
