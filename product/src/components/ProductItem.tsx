import Image from "next/image";
import Link from "next/link";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Product } from "@/types";

function ProductItem({
    id,
    imageSrc,
    minPerOrder,
    popularityScore,
    price,
    subject,
    hotSellingScore,
    bestReviewScore,
    isLast,
}: Product) {
    const getScore = () => {
        if (popularityScore) {
            return (
                <span>
                    Popularity score: <b>{popularityScore}</b>
                </span>
            );
        }
        if (hotSellingScore) {
            return (
                <span>
                    Hot-selling score: <b>{hotSellingScore}</b>
                </span>
            );
        }
        if (bestReviewScore) {
            return (
                <span>
                    Best-reviewed score: <b>{bestReviewScore}</b>
                </span>
            );
        }
    };

    return (
        <Link
            href={`/product/${id}`}
            className={`mb-4 flex h-fit cursor-pointer ${!isLast ? "border-b-2 border-gray-200" : ""} pb-4 md:w-[calc((100%-24px)/4)] md:flex-col md:border-none lg:w-[calc((100%-40px)/6)]`}
            key={id}
        >
            <Image
                src={imageSrc}
                alt="product-image"
                width={1000}
                height={1000}
                className="h-fit w-2/5 rounded-md md:w-full md:rounded-xl"
            />
            <div className="ml-2 mt-1 text-sm xxs:ml-4 xxs:text-lg xs:text-[22px] sm:text-[26px] md:ml-0 md:mt-2 md:text-sm">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="line-clamp-2 text-left hover:text-primary">
                                {subject}
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>{subject}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div className="mt-1.5 text-[20px] font-bold xxs:text-lg xs:mt-3 xs:text-[24px] sm:text-[28px] md:mt-0.5 md:text-[20px]">
                    {price}
                </div>
                <div className="mt-1 xs:mt-3 md:mt-0.5">
                    Min. orde: {minPerOrder}
                </div>
                <div className="mt-1 xs:mt-3 md:mt-0.5">{getScore()}</div>
            </div>
        </Link>
    );
}

export default ProductItem;
