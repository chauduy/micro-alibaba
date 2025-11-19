import React from "react";

import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import { Button } from "./ui/button";

function QuantitySelector({
    quantity,
    productId,
    disabled,
    onChangeQuantity,
}: {
    quantity: number | undefined;
    productId: number;
    disabled?: boolean;
    onChangeQuantity: (productId: number, isPlus: boolean) => void;
}) {
    return (
        <div className="flex h-6 w-[88px] items-center rounded-full border border-l-0 border-r-0 border-[#d8d8d8] md:w-[98px] lg:h-8 lg:w-[126px]">
            <Button
                variant={"outline"}
                size={"icon"}
                className="quantityBtn h-6 w-6 rounded-l-full rounded-r-full border border-[#d8d8d8] p-0 shadow-none hover:bg-accent lg:h-8 lg:w-8"
                disabled={quantity === 1 || disabled}
                onClick={() => onChangeQuantity(productId, false)}
            >
                <FaMinus />
            </Button>

            <input
                type="number"
                value={quantity}
                readOnly
                className="w-10 text-center focus:outline-none md:ml-3.5 lg:w-12"
            />
            <Button
                variant={"outline"}
                size={"icon"}
                disabled={disabled}
                className="quantityBtn h-6 w-6 rounded-r-full rounded-l-full border border-[#d8d8d8] p-0 shadow-none hover:bg-accent lg:h-8 lg:w-8"
                onClick={() => onChangeQuantity(productId, true)}
            >
                <FaPlus />
            </Button>
        </div>
    );
}

export default QuantitySelector;
