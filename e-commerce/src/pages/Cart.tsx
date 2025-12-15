/*
 * (#)Cart.tsx  0.4.0   12/14/2025
 * (#)Cart.tsx  0.3.0   11/20/2025
 *
 * @author  Jonathan Parker
 * @version 0.4.0
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
import type { Order } from "../types/Order";
import type { OrderDocument } from "../types/OrderDocument";
import type { Product } from "../types/Product";
import type { RootState } from "../redux/Store";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../utils/Formatters";
import { v4 as uuidv4 } from 'uuid';

import toast from 'react-hot-toast';
import CartItem from "../components/CartItem";
import EmptyCartButton from "../components/EmptyCartButton";
import ApiContext from "../ApiContext";

/**
 * The cart page.
 *
 * @returns {JSX.Element}
 */
export default function Cart(): JSX.Element {
    const { t } = useTranslation();
    const { apiServiceUrl, debug } = useContext(ApiContext);

    const cart: Product[] = useSelector((state: RootState): Product[] => state.cart);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect( (): void => {
        setTotalAmount(cart.reduce( (acc: number, product: Product): number => acc + product.price,0) )
    }, [cart])

    const handleClick: () => Promise<void> = async (): Promise<void> => {
        const success: boolean = await saveCart();

        if (success) {
            toast.success(t("cart-saved-ok"));
        } else {
            toast.error(t("cart-save-failed"));
        }
    }

    /**
     * Saves the cart.
     *
     * @return  {Promise<boolean>}
     */
    const saveCart: () => Promise<boolean> = async (): Promise<boolean> => {
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

            console.log(`Document saved: ${document.documentId}`);

            if (debug) {
                console.log(document);
            }
            
            return response.ok;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    return (
        <div className="w-full max-w-[1000px] mx-auto pt-4 relative">
            {
                cart.length > 0 ?
                    (<div className="flex justify-between">
                        <div className="mt-16">
                            {
                                cart.map((item: Product, index: number): JSX.Element => (
                                    <CartItem key={ index } item={ item } />
                                ))
                            }
                        </div>

                        <div className="mt-32 flex flex-col justify-between h-[500px] ml-8">
                            <div>
                                <div className="uppercase text-green-700 font-semibold">{ t("your-cart") }</div>
                                <div className="uppercase text-green-700 font-bold text-4xl">{ t("summary") }</div>
                                <p className="mt-3 font-bold dark:text-white">
                                    <span>{ t("total-items") }: {cart.length}</span>
                                </p>
                            </div>

                            <div>
                                <p className="dark:text-white">{ t("total-amount") }: <span className="font-bold">{ formatPrice(totalAmount) }</span></p>
                                <button className="mt-2 bg-green-700 w-full text-white py-2 rounded-md"
                                    onClick={ handleClick }>
                                    { t("checkout-now") }
                                </button>
                                <EmptyCartButton />
                            </div>
                        </div>
                    </div>) :
                        (<div className="h-screen flex justify-center items-center flex-col">
                            <h1 className="dark:text-white">{ t("cart-empty") }</h1>
                            <Link to="/">
                                <button className="bg-green-700 py-3 px-8 mt-3 rounded-lg text-white">
                                    { t("shop-now") }
                                </button>
                            </Link>
                        </div>)
            }
        </div>
    );
}
