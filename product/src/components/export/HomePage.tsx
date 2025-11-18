import { useEffect, useState } from "react";

import Image from "next/image";

import Loading from "@/components/Loading";
import { CategoryTabs } from "@/components/Tabs";
import { Category } from "@/types";

import data from "../../../data.json";
import CategoryPreview from "@/components/CategoryPreview";
import { categoryTabs } from "@/constants";

function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>(
        categoryTabs[0].key
    );
    const [selectedData, setSelectedData] = useState<Category[]>([]);

    useEffect(() => {
        if (selectedCategory) {
            const findData = data.filter(
                (item) => item.categoryType === selectedCategory
            );
            setSelectedData(findData);
        }
    }, [selectedCategory]);

    return (
        <div className="h-full w-full">
            <Image
                src={
                    "https://s.alicdn.com/@img/imgextra/i1/O1CN01CkOjeV1EaaXM2zUJL_!!6000000000368-2-tps-1920-220.png"
                }
                alt="banner"
                width={1000}
                height={1000}
                className="h-[100px] w-full object-cover md:h-[150px] lg:h-[220px]"
            />

            <main className="appPadding largeScreenConstrain">
                <div className="mx-1.5">
                    <CategoryTabs
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                {selectedData.length !== 0 ? (
                    <div className="grid grid-cols-12">
                        {selectedData.map((item) => (
                            <div
                                className="col-span-12 mx-1.5 mb-3 md:col-span-6 lg:col-span-4"
                                key={item.id}
                            >
                                <CategoryPreview
                                    id={item.id}
                                    categoryType={item.categoryType}
                                    productList={item.productList}
                                    title={item.title}
                                    productPreview={item.productPreview}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="screenWrapperLoading">
                        <Loading />
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;
