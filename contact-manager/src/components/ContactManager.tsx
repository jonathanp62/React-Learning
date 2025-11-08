/*
 * (#)ContactManager.tsx   0.2.0   11/08/2025
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
import type { ContactType } from "../types/ContactType.jsx";

import { useState } from "react";
import { useTranslation } from 'react-i18next';
import NavBar from "./NavBar.tsx";
import ContactAdder from "./ContactAdder.tsx";

/**
 * The contact manager component.
 *
 * @returns {JSX.Element}
 */
export default function ContactManager(): JSX.Element {
    const { t } = useTranslation();

    const storedContacts: string | null = localStorage.getItem("contacts");

    let getContacts: ContactType[] | null = null; // Initialize as null or a default object

    if (storedContacts !== null) {
        try {
            getContacts = JSON.parse(storedContacts) as ContactType[];
        } catch (e) {
            console.error(t("parsing-error"), e);
        }
    }

    const [contacts, setContacts] = useState<ContactType[] | null>(getContacts);

    const addContact: (contact: ContactType) => void  = (contact: ContactType): void => {
        const newContacts: ContactType[] = [...(contacts ?? []), contact];

        setContacts(newContacts);

        localStorage.setItem(
            "contacts",
            JSON.stringify(newContacts)
        );
    };

    const editContact: (id: number, updatedContact: ContactType) => void = (id: number, updatedContact: ContactType): void => {
        if (contacts === null) {
            return;
        }

        const updatedContacts: ContactType[] = contacts.map((contact: ContactType): ContactType =>
            contact.id === id ? { ...contact, ...updatedContact } : contact
        );

        setContacts(updatedContacts);

        localStorage.setItem(
            "contacts",
            JSON.stringify(updatedContacts)
        );
    };

    const deleteContact: (id: number) => void = (id: number): void => {
        if (contacts === null) {
            return;
        }

        const updatedContacts: ContactType[] = contacts.filter((contact: ContactType): boolean => contact.id !== id);

        setContacts(updatedContacts);

        localStorage.setItem(
            "contacts",
            JSON.stringify(updatedContacts)
        );
    };

    return (
        <>
            <NavBar />
            <div className="flex_container">
                <div className="contact_adder">
                    <ContactAdder addContactFunction={ addContact }  />
                </div>

                <div className="contact_list">
                    <h2>{ t("available-contacts") }</h2>
                    <input
                        type="text"
                        placeholder={ t("search-contact") }
                        className="search_input"
                    />

                    <table id="contacts_table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contacts.map((data: ContactType): JSX.Element => (
                            <Contact
                                key={data.id}
                                data={data}
                                onDelete={deleteContact}
                                onEdit={editContact}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
