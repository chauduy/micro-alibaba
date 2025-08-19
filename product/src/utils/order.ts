import { Product, Timestamp } from "@/types";

export const getOrderStatus = (date: Timestamp) => {
    const deliveryTime = new Date(date.seconds * 1000 + date.nanoseconds / 1e6);
    const present = new Date();
    if (deliveryTime.getTime() > present.getTime()) {
        return "Delivering";
    } else {
        return "Completed";
    }
};

export const convertToDate = (date: Timestamp) =>
    new Date(date.seconds * 1000 + date.nanoseconds / 1e6).toLocaleDateString(
        "en-US",
        {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }
    );

export const getAmount = (list: Product[]) => {
    return list!
        .reduce((acc, cur) => {
            if (cur.price.includes("-")) {
                const price = cur.price.split("-")[1];
                return acc + parseFloat(price) * cur.quantity!;
            } else {
                const price = cur.price.split("$")[1];
                return acc + parseFloat(price) * cur.quantity!;
            }
        }, 10)
        .toFixed(2);
    // shipping price included
};
