/*
 * (#)EmptyCartButton.tsx   0.3.0   12/05/2025
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

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { clear } from '../redux/slices/CartSlice.tsx';

import ConfirmationDialog from "./ConfirmationDialog";
import toast from 'react-hot-toast';

/**
 * The empty cart button component.
 *
 * @returns {JSX.Element}
 */
export default function EmptyCartButton(): JSX.Element {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const handleOpenDialog: () => void = (): void => setIsDialogOpen(true);

    const handleConfirm: () => void = (): void => {
        emptyCart();
        setIsDialogOpen(false);     // Close the dialog
    };

    const handleCancel: () => void = (): void => {
        setIsDialogOpen(false);     // Close the dialog
    };

    const emptyCart: () => void = (): void => {
        dispatch(clear());
        toast.success(t("cart-empty"));
    }

    return (
        <>
            <button className="mt-2 bg-red-700 w-full text-white py-2 rounded-md"
                    onClick={ handleOpenDialog }>
                { t("empty-cart") }
            </button>
            {isDialogOpen && (
                <ConfirmationDialog
                    message={ `${t("empty-cart-message")}?` }
                    isOpen={ isDialogOpen }         // Pass the state variable
                    onConfirm={ handleConfirm }     // Pass the confirmation handler
                    onCancel={ handleCancel }       // Pass the cancellation handler
                />
            )}
        </>
    );
}
