/*
 * (#)Contact.tsx   0.2.0   11/09/2025
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
import type ContactProps from "../types/ContactProps.tsx";

import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

/**
 * The contact component.
 *
 * @returns {JSX.Element}
 */
export default function Contact({ contact, onEdit, onDelete }: Readonly<ContactProps> ): JSX.Element {
    const { t } = useTranslation();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedData, setEditedData] = useState({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        address: contact.address
    });

    const handleEdit: () => void = (): void => {
        setIsEditing(true);
    };

    const handleSave: () => void = (): void => {
        onEdit(contact.id, contact);
        setIsEditing(false);
    };

    const handleCancel: () => void = (): void => {
        setEditedData({
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            address: contact.address
        });

        setIsEditing(false);
    };

    const handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete: () => void = (): void => {
        onDelete(contact.id);
    };

    return (
        <tr>
            {isEditing ? (
                <>
                    <td>
                        <input
                            type="text"
                            name="name"
                            value={editedData.name}
                            onChange={ handleChange }
                            className="edit_input"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="phone"
                            value={editedData.phone}
                            onChange={ handleChange }
                            className="edit_input"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="email"
                            value={editedData.email}
                            onChange={ handleChange }
                            className="edit_input"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="address"
                            value={editedData.address}
                            onChange={ handleChange }
                            className="edit_input"
                        />
                    </td>
                    <td>
                        <div className="action_buttons">
                            <button onClick={ handleSave } className="save_button">
                                { t("save") }
                                {/*<Save size={22} /> */}
                            </button>
                            <button onClick={handleCancel} className="cancel_button">
                                { t("cancel") }
                                {/* <X size={22} /> */}
                            </button>
                        </div>
                    </td>
                </>
            ) : (
                <>
                    <td>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.email}</td>
                    <td>{contact.address}</td>
                    <td>
                        <div className="action_buttons">
                            <button onClick={ handleEdit } className="edit_button">
                                { t("edit") }
                                {/* <Edit size={22} /> */}
                            </button>
                            <button onClick={ handleDelete } className="delete_button">
                                { t("delete") }
                                {/* <Trash2 size={22} /> */}
                            </button>
                        </div>
                    </td>
                </>
            )}
        </tr>
    );
}
