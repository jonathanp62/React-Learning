import type { JSX } from "react";
import {toast} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import type { Product } from "../types/Product";

const ProductItem: ({ post }: { post : Product}) => JSX.Element = ({ post}: { post : Product}): JSX.Element => {
    const dispatch = useDispatch();

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
                <img src={ post.image } alt="Product Image" className="h-full w-full"/>
            </div>
            <div className="flex justify-center gap-12 items-center w-full mt-5">
                <div>
                    <p className="text-green-600 font-semibold ">${ post.price }</p>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
