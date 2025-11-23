/*
 * (#)Home.tsx  0.3.0   11/20/2025
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
import type { Product } from "../types/Product.tsx";
import type { ProductState } from "../types/ProductState.tsx";

import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setSelectedCategory, setSelectedPrice, updateFilteredProducts } from "../redux/slices/ProductSlice";

import ApiContext from "../ApiContext.tsx";

/**
 * The home page.
 *
 * @todo    This is incomplete.
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
    const { baseUrl } = useContext(ApiContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<Product[]>([]);

    const dispatch = useDispatch();
    const data: Product[] = useSelector((state: ProductState): Product[] => state.data);
    const filtered: Product[] = useSelector((state: ProductState): Product[] => state.filtered);
    const selectedCategory: string = useSelector((state: ProductState): string => state.selectedCategory);
    const selectedPrice: string = useSelector((state: ProductState): string => state.selectedPrice);

    async function fetchProductData(): Promise<void> {
        setLoading(true);

        try {
            const res: Response = await fetch(baseUrl);
            const products: Product[] = await res.json();

            setPosts(products);

            dispatch(setProducts(products));
            dispatch(updateFilteredProducts(data));

            console.log(products);
        } catch (err) {
            alert("Error loading products: " + err);    // @todo Convert to toast
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, []);

    return (
        <div className="flex bg-gray-100 p-10 mx-auto space-x-4">
            <p>Home</p>
        </div>
    );
}
