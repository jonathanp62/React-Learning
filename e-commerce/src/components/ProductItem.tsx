/*
 * (#)ProductItem.tsx   0.3.0   11/24/2025
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
import type { RootState } from "../redux/Store.tsx";
import type { Product } from "../types/Product";
import type { CartState } from "../types/CartState.tsx";

import { Link } from "react-router-dom";
import { MdStar } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/slices/CartSlice";
import { formatPrice, formatRating } from "../utils/Formatters";

/**
 * The product item component.
 *
 * @param   {Product}   post - The product to display
 * @returns {JSX.Element}
 */
const ProductItem: ({ post }: { post : Product}) => JSX.Element = ({ post}: { post : Product }): JSX.Element => {
    const { t } = useTranslation();
    const cart: Product[] = useSelector((state: RootState): CartState => state.cart);

    const dispatch = useDispatch();

    const addToCart: () => void = (): void =>  {
        dispatch(add(post));
        toast.success("Item added to Cart");
    }

    const removeFromCart: () => void = (): void => {
        dispatch(remove(post.id));
        toast.success("Item removed from Cart");
    }

    return (
        <div className="flex
         bg-white
         flex-col
         items-center
         justify-between
         hover:scale-110
         transition
         shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
         duration-300
         ease-in
         hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]
         gap-3
         p-4
         mt-10
         ml-5
         rounded-xl
         group
         h-[380px]">
            <div>
                <p className="text-gray-700
                font-semibold
                text-lg
                text-left
                truncate
                w-40
                mt-1">
                    { post.title }
                </p>
            </div>
            <div>
                <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
                    { post.description.split(" ").slice(0,10).join(" ") + "..." }
                </p>
            </div>
            <div className="h-[170px]">
                <Link to={ `/item/${post.id}` }>
                    <img src={ post.image } alt={t("product-image")} className="h-full w-full"/>
                </Link>
            </div>
            <div className="flex justify-center gap-12 items-center w-full mt-5">
                <div>
                    <p className="text-green-600 font-semibold flex items-center gap-1">{ formatRating(post.rating.rate) } <MdStar /></p>
                    <p className="text-green-600 font-semibold ">{ formatPrice(post.price) }</p>
                </div>
                {
                    cart.some((product: Product): boolean => product.id === post.id) ?
                        (<button
                            className="
                            text-gray-700
                            border-2
                            border-gray-700
                            rounded-full
                            font-semibold
                            text-[12px]
                            p-1
                            px-3
                            uppercase
                            hover:bg-gray-700
                            hover:text-white
                            transition
                            duration-300
                            ease-in
                            group-hover:text-white
                            group-hover:bg-gray-700"
                            onClick={ removeFromCart }
                        >
                            { t("remove-from-cart") }
                        </button>) :
                        (<button
                            className="
                            text-gray-700 b
                            order-2
                            border-gray-700
                            rounded-full
                            font-semibold
                            text-[12px]
                            p-1
                            px-3
                            uppercase
                            hover:bg-gray-700
                            hover:text-white
                            transition
                            duration-300
                            ease-in
                            group-hover:text-white
                            group-hover:bg-gray-700"
                            onClick={ addToCart }
                        >
                            { t("add-to-cart") }
                        </button>)
                }
            </div>
        </div>
    );
}

export default ProductItem;
