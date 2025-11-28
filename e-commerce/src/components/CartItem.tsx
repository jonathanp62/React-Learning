/*
 * (#)CartItem.tsx  0.3.0   11/27/2025
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
import type { Product } from "../types/Product";

import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/slices/CartSlice";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../utils/Formatters";

/**
 * The cart item component.
 *
 * @param   {Product}   item - An item in the cart
 * @returns {JSX.Element}
 */
const CartItem: ({ item }: { item : Product}) => JSX.Element = ({ item }: { item : Product }): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const removeFromCart: () => void = (): void => {
        dispatch(remove(item.id));
        toast.success(t("item-removed"));
    }

    return (
        <div className="w-full border-b-2 p-6 mt-3 flex border-black">
            <div className="w-full flex justify-between gap-x-10">
                <div className="w-[170px] object-fill">
                    <img src={ item.image } alt={ t("product-image") } className=""/>
                </div>

                <div className="w-[450px] flex flex-col gap-y-4">
                    <h1 className="font-semibold text-lg">{ item.title }</h1>
                    <h1 className="text-sm">{ item.description.split(" ").slice(1,20).join(" ") + "..." }</h1>
                    <div className="flex justify-between">
                        <p className="text-green-700 font-semibold">{ formatPrice(item.price) }</p>
                        {/* @todo Can I add hover text? */}
                        <div
                            className="bg-pink-200 p-3 rounded-full hover:cursor-pointer"
                            onClick={ removeFromCart }
                        >
                            <MdDelete />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
