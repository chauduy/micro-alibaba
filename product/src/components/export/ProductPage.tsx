import { useEffect, useState } from "react";

import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { PiWarningLight } from "react-icons/pi";

import AssuranceDrawer from "@/components/AssuranceDrawer";
import Loading from "@/components/Loading";
import RelatedProduct from "@/components/RelatedProduct";
import ReviewStar from "@/components/ReviewStar";
import { Button } from "@/components/ui/button";
import { Product as ProductProps } from "@/types";
import { getRelatedProducts, notifyEvent, storage } from "@/utils";

import data from "../../../data.json";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ButtonLoading from "../ButtonLoading";
import { CART_UPDATE, LIST_UPDATE } from "@/constants";

function Product({
    id,
    onShowToast,
    onNavigateToCart,
}: {
    id: string;
    onShowToast: (name: string, add: boolean) => void;
    onNavigateToCart: () => void;
}) {
    const [product, setProduct] = useState<ProductProps>();
    const [relatedProducts, setRelatedProducts] = useState<ProductProps[]>([]);
    const [cartList, setCartList] = useState<ProductProps[]>([]);
    const [favoriteList, setFavoriteList] = useState<ProductProps[]>([]);
    const [loadingCart, setLoadingCart] = useState<boolean>(false);
    const [loadingCheckout, setLoadingCheckout] = useState<boolean>(false);
    const [loadingLike, setLoadingLike] = useState(false);
    const [isInCart, setIsInCart] = useState<boolean>();
    const [isInList, setIsInList] = useState<boolean>();
    const productId = Number(id);
    const user = JSON.parse(storage.getItem("user") as string);

    useEffect(() => {
        if (productId) {
            let findProduct;
            data.forEach((item) => {
                item.productList.forEach((product) => {
                    if (product.id === productId) {
                        findProduct = product;
                    }
                });
            });
            setProduct(findProduct);
            setRelatedProducts(getRelatedProducts(productId));
        }
    }, [productId]);

    useEffect(() => {
        if (!user?.uid) return;

        handleGetCartList();
        handleGetFavoriteList();
    }, [user?.uid]);

    useEffect(() => {
        if (product) {
            document.getElementById("main-top")?.scrollIntoView({
                behavior: "instant",
            });
        }
    }, [product]);

    useEffect(() => {
        if (product && cartList) {
            const find = cartList?.find((item) => item.id === product.id);
            if (find) {
                setIsInCart(true);
            } else {
                setIsInCart(false);
            }
        }
    }, [cartList, product]);

    useEffect(() => {
        if (product && favoriteList) {
            const find = favoriteList?.find((item) => item.id === product.id);
            if (find) {
                setIsInList(true);
            } else {
                setIsInList(false);
            }
        }
    }, [favoriteList, product]);

    const handleGetCartList = async () => {
        try {
            const userCartRef = doc(
                db,
                "customers",
                user.uid,
                "cart",
                "cartData"
            );
            const cartSnap = await getDoc(userCartRef);
            if (cartSnap.exists()) {
                if (cartSnap.data().list === null) return;
                setCartList(cartSnap.data().list);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleGetFavoriteList = async () => {
        try {
            const userCartRef = doc(
                db,
                "customers",
                user.uid,
                "favorite",
                "listData"
            );
            const favoriteSnap = await getDoc(userCartRef);
            if (favoriteSnap.exists()) {
                if (favoriteSnap.data().list === null) return;
                setFavoriteList(favoriteSnap.data().list);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangCart = async () => {
        setLoadingCart(true);
        try {
            if (!product) return;
            const findItem = cartList.find((item) => item.id === product.id);
            let updatedCart = [];
            if (findItem) {
                updatedCart = cartList.filter(
                    (item) => item?.id !== findItem.id
                );
            } else {
                updatedCart = [...cartList, product];
            }
            const userCartRef = doc(
                db,
                "customers",
                user.uid,
                "cart",
                "cartData"
            );
            await setDoc(userCartRef, { list: updatedCart }, { merge: true });
            await handleGetCartList();

            // call event to let other components notify and get the latest data
            notifyEvent(CART_UPDATE);

            onShowToast("cart", findItem ? false : true);
            setLoadingCart(false);
        } catch (error) {
            console.error(error);
            setLoadingCart(false);
        }
    };

    const handleChangeList = async () => {
        setLoadingLike(true);
        try {
            if (!product) return;
            const findItem = favoriteList.find(
                (item) => item.id === product.id
            );
            let updateList = [];
            if (findItem) {
                updateList = favoriteList.filter(
                    (item) => item?.id !== findItem.id
                );
                setIsInList(false);
            } else {
                updateList = [...favoriteList, product];
                setIsInList(true);
            }
            const userCartRef = doc(
                db,
                "customers",
                user.uid,
                "favorite",
                "listData"
            );
            await setDoc(userCartRef, { list: updateList }, { merge: true });
            await handleGetFavoriteList();

            // call event to let other components notify and get the latest data
            notifyEvent(LIST_UPDATE);
            setLoadingLike(false);
            onShowToast("list", findItem ? false : true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStartOrder = async () => {
        setLoadingCheckout(true);
        if (!product) return;
        try {
            if (cartList.find((item) => item.id === product.id)) {
                onNavigateToCart();
            } else {
                let updatedCart = [];
                updatedCart = [...cartList, product];
                const userCartRef = doc(
                    db,
                    "customers",
                    user.uid,
                    "cart",
                    "cartData"
                );
                await setDoc(
                    userCartRef,
                    { list: updatedCart },
                    { merge: true }
                );
                notifyEvent(CART_UPDATE);
                setLoadingCheckout(false);
                onNavigateToCart();
            }
        } catch (error) {
            console.error(error);
            setLoadingCheckout(false);
        }
    };

    const handleOpenMail = () => {
        return window.open(
            "mailto:email@example.com?subject=Subject&body=Body%20goes%20here"
        );
    };

    return (
        <>
            {product ? (
                <div className="largeScreenConstrain bg-gray-100 pb-4 lg:bg-white/80">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-7">
                            <div className="mb-6 hidden pt-6 lg:block">
                                <h1 className="mb-1 text-lg font-bold">
                                    {product.subject}
                                </h1>

                                <div className="flex items-center">
                                    <ReviewStar star={product.star} />
                                    <div className="mt-0.5 text-[#767676]">
                                        {product.sold} sold
                                    </div>
                                </div>
                            </div>
                            <Image
                                width={1000}
                                height={1000}
                                alt="product-img"
                                src={product.imageSrc}
                                className="object-cover md:h-[500px] lg:hidden"
                            />
                            <div className="mt-8 hidden items-center justify-center rounded-[12px] bg-black/5 lg:flex">
                                <Image
                                    width={1000}
                                    height={1000}
                                    alt="product-img"
                                    src={product.imageSrc}
                                    className="h-[500px] w-[80%] object-cover"
                                />
                            </div>
                            <div className="bg-white p-3 text-sm md:p-6 lg:hidden">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="text-2xl font-bold">
                                            {product.price}
                                        </div>
                                        <div className="mt-1">
                                            Min order: {product.minPerOrder}
                                        </div>
                                    </div>
                                    <Button
                                        disabled={!user || loadingLike}
                                        className="!bg-transparent"
                                        variant={"ghost"}
                                        onClick={handleChangeList}
                                    >
                                        {isInList ? (
                                            <FaHeart className="mt-2 !h-6 !w-6 text-red-700" />
                                        ) : (
                                            <FaRegHeart className="mt-2 !h-6 !w-6 text-gray-500" />
                                        )}
                                    </Button>
                                </div>
                                <div className="mt-6">{product.subject}</div>

                                <div className="flex items-center">
                                    <ReviewStar star={product.star!} />
                                    <div className="mt-0.5 text-[#767676]">
                                        {product.sold} sold
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-5 lg:ml-20 lg:mt-6 lg:rounded-xl lg:border-[1px] lg:border-[#fff] lg:shadow-[0_-4px_20px_#0000000f]">
                            <div className="mt-2 bg-white p-3 text-sm md:p-6 lg:mt-0 lg:py-0 lg:text-[16px]">
                                <div className="mt-6 hidden justify-between border-b-[1px] border-[#dddddd] pb-5 lg:flex">
                                    <div>
                                        <div className="mb-1 mt-1 text-[16px] text-gray-500">
                                            Minimum order quantity:{" "}
                                            {product.minPerOrder}
                                        </div>
                                        <div className="text-3xl font-bold">
                                            {product.price}
                                        </div>
                                    </div>
                                    <Button
                                        disabled={!user || loadingLike}
                                        className="!bg-transparent"
                                        variant={"ghost"}
                                        onClick={handleChangeList}
                                    >
                                        {isInList ? (
                                            <FaHeart className="mt-2 !h-8 !w-8 text-red-700" />
                                        ) : (
                                            <FaRegHeart className="mt-2 !h-8 !w-8 text-gray-500" />
                                        )}
                                    </Button>
                                </div>
                                <div className="mb-2 font-bold lg:mb-4 lg:mt-5 lg:text-lg">
                                    Shipping
                                </div>
                                <div className="font-bold lg:mb-1">
                                    Electronic Parcels (Standard)
                                </div>
                                <div className="lg:mb-1">
                                    Shipping total: {product.price} for{" "}
                                    {product.minPerOrder}
                                </div>
                                <div>Estimated delivery within 7 days</div>
                                <div
                                    className={`mt-4 flex items-center gap-x-2 lg:mt-6 ${user ? "lg:border-b-[1px] lg:border-[#dddddd] lg:pb-6" : ""}`}
                                >
                                    <div className="flex w-[calc(100%-48px)] items-center gap-x-2 md:w-fit lg:w-full">
                                        <Button
                                            disabled={!user}
                                            variant={"default"}
                                            className="h-10 w-1/2 rounded-full bg-primary text-sm font-bold text-white md:w-40 lg:h-12 lg:w-1/2"
                                            onClick={handleStartOrder}
                                        >
                                            {loadingCheckout ? (
                                                <ButtonLoading />
                                            ) : (
                                                "Start order"
                                            )}
                                        </Button>
                                        <Button
                                            disabled={!user}
                                            variant={"outline"}
                                            className="h-10 w-1/2 rounded-full border-[1px] border-black bg-gray-100 text-sm font-bold md:w-40 lg:h-12 lg:w-1/2"
                                            onClick={handleChangCart}
                                        >
                                            {loadingCart ? (
                                                <ButtonLoading color="#ff6a00" />
                                            ) : isInCart ? (
                                                "Remove from cart"
                                            ) : (
                                                "Add to cart"
                                            )}
                                        </Button>
                                    </div>
                                    <Button
                                        variant={"ghost"}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-black lg:hidden"
                                        onClick={handleOpenMail}
                                    >
                                        <IoMailOutline className="h-5 w-5" />
                                    </Button>
                                </div>
                                {!user && (
                                    <div className="mt-3 flex items-center gap-x-2 text-[16px] text-yellow-400 lg:border-b-[1px] lg:border-[#dddddd] lg:pb-6">
                                        <PiWarningLight className="h-5 w-5" />
                                        <div className="pt-0.5">
                                            You need to log in to start
                                            shopping.
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 bg-white p-3 text-sm md:p-6 lg:mt-0">
                                <AssuranceDrawer />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 px-3 md:mt-6 md:px-6 lg:px-0">
                        <div className="mb-2.5 text-sm font-bold md:mb-4 md:text-[16px] lg:text-lg">
                            Recommended From Other Suppliers
                        </div>
                        <div className="flex flex-wrap gap-x-1 gap-y-2 md:gap-x-2">
                            {relatedProducts.map((item) => (
                                <div
                                    className="w-[calc((100%-4px)/2)] rounded-b-sm bg-white md:w-[calc((100%-24px)/4)] lg:w-[calc((100%-40px)/6)]"
                                    key={item.id}
                                >
                                    <RelatedProduct product={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="screenWrapperLoading">
                    <Loading />
                </div>
            )}
        </>
    );
}

export default Product;
