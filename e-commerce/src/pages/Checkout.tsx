/*
 * (#)Checkout.tsx  0.4.0   12/15/2025
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
import type { FormValues } from "../types/FormValues";
import type { Order } from "../types/Order";
import type { OrderDocument } from "../types/OrderDocument.tsx";
import type { Product } from "../types/Product.tsx";
import type { RootState } from "../redux/Store.tsx";

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { clear } from '../redux/slices/CartSlice';

import formConfig from "../configuration/formConfig";
import formSchema from "../configuration/formSchema";
import toast from "react-hot-toast";
import ApiContext from "../ApiContext";

/**
 * The checkout page.
 *
 * @returns {JSX.Element}
 */
export default function Checkout(): JSX.Element {
    const { t } = useTranslation();
    const { apiServiceUrl, debug } = useContext(ApiContext);

    const { register, handleSubmit, formState: { errors } } = useForm<any>({
        resolver: yupResolver(formSchema)
    });

    const dispatch = useDispatch();
    const cart: Product[] = useSelector((state: RootState): Product[] => state.cart);

    const handleClick: () => Promise<void> = async (): Promise<void> => {
        const success: boolean = await placeOrder();

        if (success) {
            dispatch(clear());  // Empty the cart
            toast.success(t("order-placed-ok"));
        } else {
            toast.error(t("order-place-failed"));
        }
    };

    /**
     * Places the order.
     *
     * @return  {Promise<boolean>}
     */
    const placeOrder: () => Promise<boolean> = async (): Promise<boolean> => {
        const postUrl: string = apiServiceUrl;
        const now: Date = new Date();
        const isoNow: string = now.toISOString();

        const order: Order = {
            orderId: uuidv4(),
            orderDate: isoNow,
            firstName: "John",
            lastName: "Doe",
            address: "123 Main Street",
            city: "Anytown",
            state: "MD",
            zipCode: "54321",
            country: "USA",
            phone: "555-123-4567",
            email: "john.doe@example.com",
            products: cart
        }

        if (debug) {
            console.log("Order:");
            console.log(order);
        }

        try {
            const response: Response = await fetch(postUrl, {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
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

            const document: OrderDocument = await response.json();

            console.log(`Order document saved: ${document.documentId}`);

            if (debug) {
                console.log(document);
            }

            return response.ok;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const handleFormSubmit: (data: FormValues) => void = (data: FormValues): void => {
        if (debug) {
            console.log(data);
        }
    }

    return (
        <>
            <div className="w-full max-w-[1000px] mx-auto pt-4 relative">
                <p className="font-bold text-2xl mb-10 dark:text-white">{ t("checkout") }</p>
            </div>

            <div className="w-full max-w-[1000px] mx-auto flex justify-center">
                <form onSubmit={ handleSubmit(handleFormSubmit) } noValidate>
                    {formConfig.sections.map(section => (
                        <>
                            <div className="mb-20" key={section.id}>
                                <p className="font-semibold text-xl mb-2 dark:text-white">{section.heading}</p>
                            </div>
                            {section.fields.map(field => {
                                    const {id, name, type, label, options, placeholder, defaultValue} = field;

                                    return (
                                        <p>{label}</p>
                                    );
                                }
                            )}
                        </>
                    ))}
                </form>
            </div>

            <div className="w-full max-w-[1000px] mx-auto flex justify-center">
                <button className="mt-20 bg-green-700 w-[200px] text-white py-2 rounded-md hover:scale-110 transition-all"
                        onClick={ handleClick }>
                    { t("place-order") }
                </button>
            </div>
        </>
    );
}
