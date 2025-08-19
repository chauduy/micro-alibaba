"use client";

import React from "react";

import { GoShieldCheck } from "react-icons/go";

import { Product } from "@/types";
import { getAmount } from "@/utils";

import { Button } from "./ui/button";
import ButtonLoading from "./ButtonLoading";

function OrderSummary({
    loading,
    list,
    hideCheckout,
    disabledCheckout,
    onCheckout,
}: {
    loading?: boolean;
    list: Product[];
    hideCheckout?: boolean;
    disabledCheckout?: boolean;
    onCheckout?: () => void;
}) {
    const quantity = list!.reduce((acc, cur) => acc + cur.quantity!, 0);
    const subtotal = getAmount(list);

    return (
        <div className="h-fit rounded border border-gray-300 p-4 md:mx-auto md:w-1/2 lg:w-1/3 lg:rounded-md lg:border-[#fff] lg:shadow-[0_-4px_20px_#0000000f] xl:w-[40%]">
            <div className="text-[20px] font-bold">Order Summary</div>
            <div className="mt-6 flex items-center justify-between text-sm">
                <div>Item quantity</div>
                <div className="font-bold">{quantity}</div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
                <div>Item subtotal</div>
                <div className="font-bold">
                    ${(Number(subtotal) - 10).toFixed(2)}
                </div>
            </div>
            <div className="mt-2 flex items-center justify-between border-b border-gray-200 pb-4 text-sm">
                <div>Shipping fee</div>
                <div className="font-bold">$10</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm font-bold">
                <div>Subtotal excl, tax</div>
                <div>{subtotal}</div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
                (Excluding tax fee)
            </div>
            {!hideCheckout && (
                <Button
                    variant={"default"}
                    className="mt-6 h-10 w-full rounded-full bg-primary text-sm font-bold text-white"
                    disabled={disabledCheckout}
                    onClick={onCheckout}
                >
                    {loading ? (
                        <ButtonLoading />
                    ) : (
                        <div className="flex items-center gap-x-2">
                            <GoShieldCheck />
                            <span>Check out</span>
                        </div>
                    )}
                </Button>
            )}
        </div>
    );
}

export default OrderSummary;
