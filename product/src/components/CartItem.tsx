"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa6";

import { Product } from "@/types";

import data from "../../data.json";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import QuantitySelector from "./QuantitySelector";

function CartItem({
    product,
    disabled,
    onChangeQuantity,
    onRemoveFromCart,
}: {
    product: Product;
    disabled?: boolean;
    onChangeQuantity: (product_id: number, isPlus: boolean) => void;
    onRemoveFromCart: (product_id: number) => void;
}) {
    const getCategory = () => {
        let findCategory;
        data.forEach((item) => {
            if (item.productList.some((prod) => prod.id === product.id)) {
                findCategory = item.title;
            }
        });

        return findCategory;
    };

    return (
        <div
            className={`pb-6 ${product.isLast ? "" : "border-b border-gray-300"}`}
        >
            <h4 className="mb-4 text-xl font-bold">{getCategory()}</h4>
            <div className="flex gap-x-4">
                <Image
                    src={product.imageSrc}
                    width={1000}
                    height={1000}
                    alt={`cart-item-${product.id}`}
                    className="h-[110px] w-[110px] rounded-[8px] border lg:h-auto lg:w-[150px]"
                />
                <div className="flex w-full flex-col justify-between py-1 lg:py-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link
                                    href={`/product/${product.id}`}
                                    target="_self"
                                    className="line-clamp-2 text-left text-sm font-bold hover:underline lg:text-lg"
                                >
                                    {product.subject}
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className="xl:hidden">
                                {product.subject}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="mb-1 text-sm font-extrabold lg:text-[20px]">
                        {product.price}
                    </div>
                    <div className="flex items-center justify-between">
                        <QuantitySelector
                            quantity={product.quantity}
                            productId={product.id}
                            disabled={disabled}
                            onChangeQuantity={onChangeQuantity}
                        />
                        {!disabled && (
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                onClick={() => onRemoveFromCart(product.id)}
                            >
                                <FaTrash className="text-[#FF1A1A]" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
