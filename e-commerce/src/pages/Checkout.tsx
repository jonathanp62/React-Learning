/*
 * (#)Checkout.tsx  0.5.0   01/19/2026
 * (#)Checkout.tsx  0.4.0   12/15/2025
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

import type { JSX } from "react";
import type { FormValues } from "../types/FormValues";
import type { NavigateFunction } from "react-router-dom";
import type { Order } from "../types/Order";
import type { Product } from "../types/Product";
import type { RootState } from "../redux/Store";
import type { SalesTaxDocument } from "../types/SalesTaxDocument";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from 'react-i18next';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { setOrder } from "../redux/slices/OrderSlice";

import fetchSalesTax from '../utils/SalesTax';
import formConfig from "../configuration/formConfig";
import formSchema from "../configuration/formSchema";
import toast from "react-hot-toast";
import ApiContext from "../ApiContext";
import InputField from "../components/InputField";

/**
 * The checkout page.
 *
 * @returns {JSX.Element}
 */
export default function Checkout(): JSX.Element {
    const { t } = useTranslation();
    const { apiServiceUrl, debug, users } = useContext(ApiContext);

    const order: Order = useSelector((state: RootState): Order => state.order);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(formSchema)
    });

    const navigate: NavigateFunction = useNavigate();
    const dispatch = useDispatch();
    const cart: Product[] = useSelector((state: RootState): Product[] => state.cart);

    const getValue: (key: keyof FormValues) => string = (key: keyof FormValues): string => {
        const value: string = order[key];

        return value ?? "";
    };

    /**
     * Handles the form submission and navigates to the review page.
     *
     * @param   {FormValues}    data    The form data
     * @return  {Promise<void>}
     */
    const handleFormSubmit: (data: FormValues) => Promise<void> = async (data: FormValues): Promise<void> => {
        const now: Date = new Date();
        const isoNow: string = now.toISOString();

        let salesTaxDocument: SalesTaxDocument | null = null;

        try {
            salesTaxDocument = await fetchSalesTax(apiServiceUrl, data.state, users.READONLY, debug, t);
        } catch (err) {
            const message: string = err instanceof Error ? err.message : String(err);

            console.error(err);
            toast.error(message);

            return;
        }

        if (debug && salesTaxDocument) {
            console.log("Sales Tax Document:");
            console.log(salesTaxDocument);
        }

        const order: Order = {
            orderId: uuidv4(),
            orderDate: isoNow,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            country: data.country,
            phone: data.phone,
            email: data.email,
            taxRate: salesTaxDocument?.rate || 0,
            products: cart
        }

        if (debug) {
            console.log("Order:");
            console.log(order);
        }

        dispatch(setOrder(order));
        navigate("/review");
    };

    return (
        <>
            <div className="w-full max-w-[1000px] mx-auto pt-4 relative">
                <p className="font-bold text-2xl mb-2 dark:text-white">{ t("checkout") }</p>
            </div>

            <div className="w-full max-w-[1000px] mx-auto flex justify-center">
                <form onSubmit={ handleSubmit(handleFormSubmit) } noValidate className="w-9/12">
                    {formConfig.sections.map(section => (
                        <div key={section.id}>
                            <div className="mb-10" key={section.id}>
                                <p className="font-semibold text-xl mb-2 dark:text-white">{section.heading}</p>
                            </div>
                            {section.fields.map(field => {
                                    const {id, name, type, label, options, placeholder, defaultValue} = field;
                                    const fieldName = name as keyof FormValues;
                                    const value: string = getValue(fieldName);

                                    return (
                                        <InputField
                                            key={ id }
                                            placeholder={ placeholder }
                                            name={ name }
                                            type={ type }
                                            label={ label }
                                            options={ options }
                                            value={ value }
                                            defaultValue={ defaultValue }
                                            register={ register }
                                            errorMessage={ errors[fieldName]?.message  }
                                        />
                                    );
                                }
                            )}
                        </div>
                    ))}

                    <div className="w-full flex justify-center">
                        <button
                            type="submit"
                            className="mb-10 mt-10 bg-green-700 w-[200px] text-white py-2 rounded-md hover:scale-110 transition-all"
                        >
                            { t("review-order") }
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
