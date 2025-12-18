import { getOrderStatus, convertToDate, getAmount } from "./order";
import { Product, Timestamp } from "@/types";

describe("order utils", () => {
    describe("getOrderStatus", () => {
        it("should return 'Delivering' when delivery time is in the future", () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 1); // 1 day in the future

            const timestamp: Timestamp = {
                seconds: Math.floor(futureDate.getTime() / 1000),
                nanoseconds: (futureDate.getTime() % 1000) * 1e6,
            };

            expect(getOrderStatus(timestamp)).toBe("Delivering");
        });

        it("should return 'Completed' when delivery time is in the past", () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 1); // 1 day in the past

            const timestamp: Timestamp = {
                seconds: Math.floor(pastDate.getTime() / 1000),
                nanoseconds: (pastDate.getTime() % 1000) * 1e6,
            };

            expect(getOrderStatus(timestamp)).toBe("Completed");
        });

        it("should return 'Completed' when delivery time is exactly now", () => {
            const now = new Date();

            const timestamp: Timestamp = {
                seconds: Math.floor(now.getTime() / 1000),
                nanoseconds: (now.getTime() % 1000) * 1e6,
            };

            // there might be a small delay, so it should be "Completed"
            expect(getOrderStatus(timestamp)).toBe("Completed");
        });

        it("should handle nanoseconds correctly", () => {
            const futureDate = new Date();
            futureDate.setHours(futureDate.getHours() + 1); // 1 hour in the future

            const timestamp: Timestamp = {
                seconds: Math.floor(futureDate.getTime() / 1000),
                nanoseconds: 500000000, // 500ms in nanoseconds
            };

            expect(getOrderStatus(timestamp)).toBe("Delivering");
        });
    });

    describe("convertToDate", () => {
        it("should convert timestamp to formatted date string", () => {
            const date = new Date(2024, 0, 15);

            const timestamp: Timestamp = {
                seconds: Math.floor(date.getTime() / 1000),
                nanoseconds: (date.getTime() % 1000) * 1e6,
            };

            const result = convertToDate(timestamp);
            expect(result).toBe("01/15/2024");
        });

        it("should handle different dates correctly", () => {
            const date = new Date(2023, 11, 25);

            const timestamp: Timestamp = {
                seconds: Math.floor(date.getTime() / 1000),
                nanoseconds: (date.getTime() % 1000) * 1e6,
            };

            const result = convertToDate(timestamp);
            expect(result).toBe("12/25/2023");
        });

        it("should format single digit months and days with leading zeros", () => {
            const date = new Date(2024, 0, 5);

            const timestamp: Timestamp = {
                seconds: Math.floor(date.getTime() / 1000),
                nanoseconds: (date.getTime() % 1000) * 1e6,
            };

            const result = convertToDate(timestamp);
            expect(result).toBe("01/05/2024");
        });

        it("should handle nanoseconds in conversion", () => {
            const date = new Date(2024, 5, 20, 12, 30, 45, 500);

            const timestamp: Timestamp = {
                seconds: Math.floor(date.getTime() / 1000),
                nanoseconds: 500000000,
            };

            const result = convertToDate(timestamp);
            expect(result).toBe("06/20/2024");
        });
    });

    describe("getAmount", () => {
        it("should calculate total amount for products with single price", () => {
            const products: Product[] = [
                {
                    id: 1,
                    imageSrc: "test.jpg",
                    minPerOrder: "2 pieces",
                    price: "$1.18",
                    subject: "Test Product 1",
                    star: 4,
                    sold: 100,
                    quantity: 2,
                },
                {
                    id: 2,
                    imageSrc: "test2.jpg",
                    minPerOrder: "1 piece",
                    price: "$0.62",
                    subject: "Test Product 2",
                    star: 5,
                    sold: 200,
                    quantity: 3,
                },
            ];

            const result = getAmount(products);
            expect(result).toBe("14.22");
        });

        it("should calculate total amount for products with price range", () => {
            const products: Product[] = [
                {
                    id: 1,
                    imageSrc: "test.jpg",
                    minPerOrder: "10 pieces",
                    price: "$2.18-2.48",
                    subject: "Test Product",
                    star: 4,
                    sold: 100,
                    quantity: 5,
                },
            ];

            const result = getAmount(products);
            expect(result).toBe("22.40");
        });

        it("should handle mixed price formats", () => {
            const products: Product[] = [
                {
                    id: 1,
                    imageSrc: "test.jpg",
                    minPerOrder: "2 pieces",
                    price: "$1.10",
                    subject: "Test Product 1",
                    star: 4,
                    sold: 100,
                    quantity: 2,
                },
                {
                    id: 2,
                    imageSrc: "test2.jpg",
                    minPerOrder: "10 pieces",
                    price: "$1.10-1.50",
                    subject: "Test Product 2",
                    star: 5,
                    sold: 200,
                    quantity: 3,
                },
            ];

            const result = getAmount(products);
            expect(result).toBe("16.70");
        });

        it("should include shipping price (10) in the calculation", () => {
            const products: Product[] = [
                {
                    id: 1,
                    imageSrc: "test.jpg",
                    minPerOrder: "1 piece",
                    price: "$5.00",
                    subject: "Test Product",
                    star: 4,
                    sold: 100,
                    quantity: 1,
                },
            ];

            const result = getAmount(products);
            expect(result).toBe("15.00");
        });

        it("should handle empty product list", () => {
            const products: Product[] = [];

            const result = getAmount(products);
            expect(result).toBe("10.00");
        });

        it("should handle products with quantity 0", () => {
            const products: Product[] = [
                {
                    id: 1,
                    imageSrc: "test.jpg",
                    minPerOrder: "1 piece",
                    price: "$10.00",
                    subject: "Test Product",
                    star: 4,
                    sold: 100,
                    quantity: 0,
                },
            ];

            const result = getAmount(products);
            expect(result).toBe("10.00");
        });

        it("should handle decimal prices correctly", () => {
            const products: Product[] = [
                {
                    id: 1,
                    imageSrc: "test.jpg",
                    minPerOrder: "1 piece",
                    price: "$1.99",
                    subject: "Test Product",
                    star: 4,
                    sold: 100,
                    quantity: 2,
                },
                {
                    id: 2,
                    imageSrc: "test2.jpg",
                    minPerOrder: "1 piece",
                    price: "$0.33",
                    subject: "Test Product 2",
                    star: 5,
                    sold: 200,
                    quantity: 3,
                },
            ];

            const result = getAmount(products);
            expect(result).toBe("14.97");
        });

        it("should use the higher price from range when price includes dash", () => {
            const products: Product[] = [
                {
                    id: 1,
                    imageSrc: "test.jpg",
                    minPerOrder: "10 pieces",
                    price: "$10.00-15.00",
                    subject: "Test Product",
                    star: 4,
                    sold: 100,
                    quantity: 1,
                },
            ];

            const result = getAmount(products);
            expect(result).toBe("25.00");
        });
    });
});
