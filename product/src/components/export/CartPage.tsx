"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { notifyEvent, storage } from "@/utils";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types";
import OrderSummary from "../OrderSummary";
import CartItem from "../CartItem";
import { CART_UPDATE } from "@/constants";

interface ProductCheckout {
    name: string;
    quantity: number;
    price: number;
}

function Cart() {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingCart, setLoadingCart] = useState<boolean>(true);
    const [list, setList] = useState<Product[]>([]);
    const router = useRouter();
    const user = JSON.parse(storage.getItem("user") as string) || null;

    const handleCheckout = async () => {
        setLoading(true);

        try {
            const cart: ProductCheckout[] = [];
            cart.push({ name: "Shipping", quantity: 1, price: 10 * 100 });
            list!.forEach((item) => {
                const product = {
                    name: item.subject,
                    quantity: item.quantity!,
                    price: Math.round(
                        item.price.includes("-")
                            ? parseFloat(
                                  item.price.split("-")[1].replace("$", "")
                              ) * 100
                            : parseFloat(
                                  item.price.split("$")[1].replace("$", "")
                              ) * 100
                    ),
                };
                cart.push(product);
            });
            const code = uuidv4();
            storage.setItem("code", code);
            const token = user.token;
            const res = await fetch(
                `https://us-central1-${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.cloudfunctions.net/createCheckoutSession`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ items: cart, uid: user.uid, code }),
                    mode: "cors",
                }
            );
            const { url } = await res.json();
            window.location.href = url;
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!user?.uid) return;

        const handleGetListCart = async () => {
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
                    if (cartSnap.data().list === null) {
                        setLoadingCart(false);
                    }
                    setList(cartSnap.data().list);
                    setLoadingCart(false);
                } else {
                    setLoadingCart(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        handleGetListCart();
    }, [user?.uid]);

    const handleChangeQuantity = async (
        product_id: number,
        isPlus: boolean
    ) => {
        try {
            let newList: Product[] = [];
            const findItem = list.find((item) => item.id === product_id);
            if (findItem) {
                findItem.quantity = isPlus
                    ? findItem.quantity! + 1
                    : findItem.quantity! - 1;
                newList = list.map((item) =>
                    item.id === findItem.id ? findItem : item
                );
                setList(newList);
            }
            const userCartRef = doc(
                db,
                "customers",
                user.uid,
                "cart",
                "cartData"
            );
            await setDoc(userCartRef, { list: newList }, { merge: true });
            notifyEvent(CART_UPDATE);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemove = async (product_id: number) => {
        const temp = list.filter((item) => item.id !== product_id);
        setList(temp);
        try {
            const userCartRef = doc(
                db,
                "customers",
                user.uid,
                "cart",
                "cartData"
            );
            await setDoc(userCartRef, { list: temp }, { merge: true });
            notifyEvent(CART_UPDATE);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="appPadding mx-auto xl:max-w-screen-2xl 2xl:max-w-screen-xl">
            {!loadingCart && list !== null ? (
                <>
                    <h1 className="text-2xl font-bold">Shopping cart</h1>
                    {list!.length > 0 ? (
                        <div className="mt-8 flex flex-col gap-y-4 lg:ml-4 xl:flex-row xl:gap-x-24">
                            <div className="flex flex-col gap-y-4">
                                {list!.map((item, index) => (
                                    <CartItem
                                        product={{
                                            ...item,
                                            isLast: index === list!.length - 1,
                                        }}
                                        key={item.id}
                                        onChangeQuantity={handleChangeQuantity}
                                        onRemoveFromCart={handleRemove}
                                    />
                                ))}
                            </div>
                            <OrderSummary
                                list={list}
                                loading={loading}
                                disabledCheckout={!user}
                                onCheckout={handleCheckout}
                            />
                        </div>
                    ) : (
                        <div className="mx-auto h-[500px] w-fit">
                            <div className="mt-8 lg:mt-28 lg:flex lg:items-start">
                                <Image
                                    src={"/images/empty-card.png"}
                                    alt="empty-card"
                                    width={1000}
                                    height={1000}
                                    className="mx-auto w-[150px] lg:w-[250px]"
                                />
                                <div className="w-full">
                                    <h4 className="text-[20px] font-bold lg:text-2xl">
                                        Your shopping cart is empty.
                                    </h4>
                                    <div className="mb-2 mt-5 text-[16px] lg:mb-4 lg:text-lg">
                                        You’re protected on Alibaba.com
                                    </div>
                                    <div className="mb-2 flex items-center gap-x-2 lg:mb-4 lg:text-[16px]">
                                        <Image
                                            src={"/icons/secure.png"}
                                            alt="secure-icon"
                                            width={1000}
                                            height={1000}
                                            className="w-5"
                                        />
                                        <div>Secure payment</div>
                                        <Image
                                            src={"/icons/visa.webp"}
                                            alt="visa-icon"
                                            width={1000}
                                            height={1000}
                                            className="w-[30px]"
                                        />
                                        <Image
                                            src={"/icons/master-card.webp"}
                                            alt="master-card-icon"
                                            width={1000}
                                            height={1000}
                                            className="w-[40px]"
                                        />
                                        <Image
                                            src={"/icons/t-t.webp"}
                                            alt="t-t-icon"
                                            width={1000}
                                            height={1000}
                                            className="w-5"
                                        />
                                    </div>
                                    <div className="mb-2 flex items-center gap-x-2 lg:mb-4 lg:text-[16px]">
                                        <Image
                                            src={"/icons/refund.png"}
                                            alt="refund-icon"
                                            width={1000}
                                            height={1000}
                                            className="w-5"
                                        />
                                        <div>Refund and return</div>
                                    </div>
                                    <div className="mb-2 flex items-center gap-x-2 lg:mb-4 lg:text-[16px]">
                                        <Image
                                            src={"/icons/logistics.png"}
                                            alt="logistics-icon"
                                            width={1000}
                                            height={1000}
                                            className="w-5"
                                        />
                                        <div>
                                            Fulfillment by Alibaba.com Logistics
                                        </div>
                                    </div>
                                    <Button
                                        variant={"ghost"}
                                        className="border-[#d8d8d8 mt-6 w-full rounded-full border py-6 text-[16px] font-bold lg:hidden"
                                        onClick={() => router.push("/")}
                                    >
                                        Start Sourcing
                                    </Button>
                                </div>
                            </div>
                            <Button
                                variant={"ghost"}
                                className="mx-auto mt-6 hidden h-16 w-[380px] rounded-full border border-[#d8d8d8] text-xl font-bold lg:block"
                                onClick={() => router.push("/")}
                            >
                                Start Sourcing
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="screenWrapperLoading">
                    <Loading />
                </div>
            )}
        </div>
    );
}

export default Cart;
