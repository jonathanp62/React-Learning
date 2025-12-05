/*
 * (#)ConfirmationDialog.tsx    0.3.0   12/04/2025
 *
 * @author  Jonathan Parker
 * @version 0.3.0
 * @since   0.3.0
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
import type { ConfirmationDialogProps } from "../types/ConfirmationDialogProps.tsx";

import React, { useRef, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import "../styles/confirmationDialog.css";

/**
 * The confirmation dialog component.
 *
 * @param   {ConfirmationDialogProps}   props   The props for the component
 * @returns {JSX.Element}
 */
export default function ConfirmationDialog({ message, onConfirm, onCancel, isOpen }: ConfirmationDialogProps): JSX.Element {
    const { t } = useTranslation();

    const dialogRef: React.RefObject<HTMLDialogElement | null> = useRef<HTMLDialogElement | null>(null);

    useEffect((): void => {
        if (!dialogRef.current) return;

        if (isOpen) {
            dialogRef.current.showModal();  // Use the native showModal() method for built-in accessibility features
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={ dialogRef } className="dialog-container">
            <div className="dialog-content">
                <p>{ message }</p>
                <div className="dialog-actions">
                    <button className="btn-cancel" onClick={ onCancel }>{ t("cancel") }</button>
                    <button className="btn-confirm" onClick={ onConfirm }>{ t("confirm") }</button>
                </div>
            </div>
        </dialog>
    );
}
