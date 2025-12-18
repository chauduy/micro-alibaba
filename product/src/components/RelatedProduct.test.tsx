import { render, screen } from "@testing-library/react";
import RelatedProduct from "./RelatedProduct";
import { Product } from "@/types";

jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => {
        return <img {...props} />;
    },
}));

jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ children, href, ...props }: any) => {
        return (
            <a href={href} {...props}>
                {children}
            </a>
        );
    },
}));

describe("RelatedProduct", () => {
    const mockProduct: Product = {
        id: 1,
        imageSrc: "https://example.com/product.jpg",
        minPerOrder: "2 pieces",
        price: "$1.18",
        subject: "Test Product Name",
        star: 4,
        sold: 100,
    };

    it("should render the product image with correct src and alt", () => {
        render(<RelatedProduct product={mockProduct} />);

        const image = screen.getByAltText("product-img");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", mockProduct.imageSrc);
        expect(image).toHaveAttribute("width", "1000");
        expect(image).toHaveAttribute("height", "1000");
    });

    it("should render the product link with correct href", () => {
        render(<RelatedProduct product={mockProduct} />);

        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", `/product/${mockProduct.id}`);
        expect(link).toHaveAttribute("target", "_self");
    });

    it("should display product information when isHideInfo is false", () => {
        render(<RelatedProduct product={mockProduct} isHideInfo={false} />);

        expect(screen.getByText(mockProduct.subject)).toBeInTheDocument();
        expect(screen.getByText(mockProduct.price)).toBeInTheDocument();
        expect(
            screen.getByText(`Min order: ${mockProduct.minPerOrder}`)
        ).toBeInTheDocument();
    });

    it("should display product information when isHideInfo is undefined", () => {
        render(<RelatedProduct product={mockProduct} />);

        expect(screen.getByText(mockProduct.subject)).toBeInTheDocument();
        expect(screen.getByText(mockProduct.price)).toBeInTheDocument();
        expect(
            screen.getByText(`Min order: ${mockProduct.minPerOrder}`)
        ).toBeInTheDocument();
    });

    it("should hide product information when isHideInfo is true", () => {
        render(<RelatedProduct product={mockProduct} isHideInfo={true} />);

        expect(screen.queryByText(mockProduct.subject)).not.toBeInTheDocument();
        expect(screen.queryByText(mockProduct.price)).not.toBeInTheDocument();
        expect(
            screen.queryByText(`Min order: ${mockProduct.minPerOrder}`)
        ).not.toBeInTheDocument();
    });

    it("should still render the image when isHideInfo is true", () => {
        render(<RelatedProduct product={mockProduct} isHideInfo={true} />);

        const image = screen.getByAltText("product-img");
        expect(image).toBeInTheDocument();
    });

    it("should apply correct CSS classes to the image", () => {
        render(<RelatedProduct product={mockProduct} />);

        const image = screen.getByAltText("product-img");
        expect(image).toHaveClass("w-full", "rounded-sm", "lg:rounded-lg");
    });

    it("should render with different product data", () => {
        const differentProduct: Product = {
            id: 999,
            imageSrc: "https://example.com/different-product.jpg",
            minPerOrder: "10 pieces",
            price: "$2.18-2.48",
            subject: "Different Product Name",
            star: 5,
            sold: 500,
        };

        render(<RelatedProduct product={differentProduct} />);

        expect(screen.getByText(differentProduct.subject)).toBeInTheDocument();
        expect(screen.getByText(differentProduct.price)).toBeInTheDocument();
        expect(
            screen.getByText(`Min order: ${differentProduct.minPerOrder}`)
        ).toBeInTheDocument();

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", `/product/${differentProduct.id}`);

        const image = screen.getByAltText("product-img");
        expect(image).toHaveAttribute("src", differentProduct.imageSrc);
    });

    it("should render link with w-full class", () => {
        render(<RelatedProduct product={mockProduct} />);

        const link = screen.getByRole("link");
        expect(link).toHaveClass("w-full");
    });
});
