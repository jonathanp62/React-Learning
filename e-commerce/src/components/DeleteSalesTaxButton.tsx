/*
 * (#)DeleteSalesTaxButton.tsx  0.5.0   01/15/2026
 *
 * @author  Jonathan Parker
 * @version 0.5.0
 * @since   0.5.0
 *
 * MIT License
 *
 * Copyright (c) 2026 Jonathan M. Parker
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

import {type JSX, useContext} from "react";

import { createBasicAuthToken } from "../utils/Auth";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import ApiContext from "../ApiContext";
import ConfirmationDialog from "./ConfirmationDialog";
import toast from "react-hot-toast";

/**
 * The delete sales tax button component.
 *
 * @returns {JSX.Element}
 */
export default function DeleteSalesTaxButton(
    {
        stateAbbreviation,
        onDeleted,
    }: Readonly<{ stateAbbreviation: string; onDeleted?: () => Promise<void> }>,
): JSX.Element {
    const { t } = useTranslation();
    const { apiServiceUrl, debug, users } = useContext(ApiContext);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleOpenDialog: () => void = (): void => setIsDialogOpen(true);

    const handleConfirm: () => void = (): void => {
        void deleteSalesTax();
        setIsDialogOpen(false);     // Close the dialog
    };

    const handleCancel: () => void = (): void => {
        setIsDialogOpen(false);     // Close the dialog
    };

    /**
     * Delete a sales tax item
     */
    const deleteSalesTax: () => Promise<void> = async (): Promise<void> => {
        const { success } = await deleteSalesTaxWithApi();

        if (success) {
            toast.success(t("sales-tax-deleted", { state: stateAbbreviation }));
            if (onDeleted) {
                await onDeleted();
            }
        } else {
            toast.error(t("sales-tax-not-deleted", { state: stateAbbreviation }));
        }
    };

    /**
     * Delete a sales tax item
     *
     * @return  {Promise<boolean>}
     */
    async function deleteSalesTaxWithApi(): Promise<{ success: boolean }> {
        const deleteUrl: string = `${apiServiceUrl}/sales-tax/abbr/${stateAbbreviation}`;

        try {
            const response: Response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Basic ${createBasicAuthToken(users.READWRITE)}`,
                },
            });

            if (debug) {
                console.log("Response:");
                console.log({
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries()),
                    url: response.url,
                    ok: response.ok,
                    redirected: response.redirected,
                    type: response.type
                });
            }

            return { success: response.ok };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }

    return (
        <>
            <button
                type="button"
                className="bg-red-400 dark:bg-red-600 rounded-full hover:cursor-pointer hover:scale-110 inline-flex items-center justify-center w-10 h-10 transition-all"
                title={ t("delete") }
                aria-label={ t("delete") }
                onClick={ handleOpenDialog }
            >
                <MdDelete aria-hidden="true" focusable="false" />
            </button>
            {isDialogOpen && (
                <ConfirmationDialog
                    message={ `${t("delete-sales-tax-message", { state: stateAbbreviation })}?` }
                    isOpen={ isDialogOpen }         // Pass the state variable
                    onConfirm={ handleConfirm }     // Pass the confirmation handler
                    onCancel={ handleCancel }       // Pass the cancellation handler
                />
            )}
        </>
    );
}
