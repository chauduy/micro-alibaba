import { useEffect, useState } from "react";

import Image from "next/image";

import Loading from "@/components/Loading";
import ProductItem from "@/components/ProductItem";
import { productBanner } from "@/constants";
import { BannerProps, Category as CategoryProps } from "@/types";

import data from "../../../data.json";
import useViewport from "@/hooks/useViewport";

interface CategoryDetailProps {
    id: string;
}

function Category({ id }: CategoryDetailProps) {
    const [currentCategory, setCurrentCategory] =
        useState<CategoryProps | null>(null);
    const [bannerContent, setBannerContent] = useState<BannerProps>();
    const { width } = useViewport();
    const isDesktop = width > 1024;
    const categoryId = Number(id);
    const listProduct = isDesktop
        ? currentCategory?.productList?.slice(0, 18)
        : currentCategory?.productList;

    useEffect(() => {
        if (categoryId) {
            setCurrentCategory(data.find((item) => item.id === categoryId)!);
        }
    }, [categoryId]);

    useEffect(() => {
        if (currentCategory) {
            setBannerContent(
                productBanner.find(
                    (item) => item.key === currentCategory.categoryType
                )!
            );
        }
    }, [currentCategory]);

    return (
        <div className="border-t-[1px] border-[#dddddd]">
            {currentCategory ? (
                <>
                    <div className="appPadding largeScreenConstrain">
                        <h4 className="mb-5 mt-4 text-2xl font-bold md:text-3xl lg:mb-10">
                            {currentCategory?.title}
                        </h4>
                        <div className="flex h-[250px] w-full items-center justify-between rounded-xl bg-[#ffc7a1] pl-4 md:pl-8 lg:h-[300px] lg:px-14">
                            <div>
                                <div className="text-[13px]">
                                    {bannerContent?.title}
                                </div>
                                <h4 className="mt-2 text-xl font-bold lg:mt-5 lg:text-3xl">
                                    Garment Patches
                                </h4>
                                <p className="mt-2 text-sm leading-5 md:max-w-[500px] lg:mt-5 lg:max-w-[600px] lg:text-[16px]">
                                    {bannerContent?.description}
                                </p>
                                <button className="font-semibol mt-2 rounded-3xl border-[1px] border-black px-4 py-1.5 text-[16px] lg:mt-5 lg:px-6 lg:py-3">
                                    More Ranking
                                </button>
                            </div>
                            <Image
                                src={"/images/product-banner.avif"}
                                alt="product-banner"
                                width={1000}
                                height={1000}
                                className="w-[150px] object-cover md:w-[250px] lg:w-[388px]"
                            />
                        </div>
                        <div className="mt-5 md:flex md:flex-wrap md:gap-x-2">
                            {listProduct!.map((item, index) => (
                                <ProductItem
                                    {...item}
                                    key={item.id}
                                    isLast={
                                        index ===
                                        currentCategory.productList.length - 1
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="screenWrapperLoading">
                    <Loading />
                </div>
            )}
        </div>
    );
}

export default Category;
