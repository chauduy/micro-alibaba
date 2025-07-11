import Image from "next/image";
import Link from "next/link";

import { Product as ProductProps } from "@/types";

function RelatedProduct({
    product,
    isHideInfo,
}: {
    product: ProductProps;
    isHideInfo?: boolean;
}) {
    return (
        <Link className="w-full" target="_self" href={`/product/${product.id}`}>
            <Image
                width={1000}
                height={1000}
                alt="product-img"
                src={product.imageSrc}
                className="w-full rounded-sm lg:rounded-lg"
            />
            {!isHideInfo && (
                <div className="p-2 lg:pl-0">
                    <div className="test mt-2 line-clamp-2 text-xs text-[#666666] lg:text-sm">
                        {product.subject}
                    </div>
                    <div className="mt-0.5 text-sm font-bold lg:text-lg">
                        {product.price}
                    </div>
                    <div className="text-xs lg:text-sm">
                        Min order: {product.minPerOrder}
                    </div>
                </div>
            )}
        </Link>
    );
}

export default RelatedProduct;
