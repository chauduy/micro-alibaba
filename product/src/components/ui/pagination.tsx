import * as React from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        />
    );
}

function PaginationContent({
    className,
    ...props
}: React.ComponentProps<"ul">) {
    return (
        <ul
            data-slot="pagination-content"
            className={cn("flex flex-row items-center gap-1", className)}
            {...props}
        />
    );
}

function PaginationItem({
    isActive,
    disabled,
    ...props
}: React.ComponentProps<"li"> & { isActive?: boolean; disabled?: boolean }) {
    return (
        <li
            data-slot="pagination-item"
            {...props}
            className={`border ${isActive ? "border-[#40a9ff]" : "border-gray-300"} ${disabled ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
        />
    );
}

type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
    React.ComponentProps<"a">;

function PaginationLink({
    className,
    isActive,
    size = "sm",
    ...props
}: PaginationLinkProps) {
    return (
        <a
            aria-current={isActive ? "page" : undefined}
            data-slot="pagination-link"
            data-active={isActive}
            className={cn(
                buttonVariants({
                    variant: isActive ? "custom" : "ghost",
                    size,
                }),
                className,
                isActive ? "text-[#40a9ff]" : "",
                "text-sm cursor-pointer"
            )}
            {...props}
        />
    );
}

function PaginationPrevious({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="sm"
            className={cn(
                "px-[9px]",
                disabled && "opacity-50 pointer-events-none cursor-not-allowed",
                className
            )}
            {...props}
        >
            <ChevronLeftIcon />
        </PaginationLink>
    );
}

function PaginationNext({
    className,
    disabled,
    ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="sm"
            className={cn(
                "px-[9px]",
                disabled && "opacity-50 pointer-events-none cursor-not-allowed",
                className
            )}
            {...props}
        >
            <ChevronRightIcon />
        </PaginationLink>
    );
}

const CustomPagination = ({
    totalPage,
    currentPage,
    setCurrentPage,
}: {
    totalPage: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prevState) => prevState - 1)}
                >
                    <PaginationPrevious disabled={currentPage === 1} />
                </PaginationItem>

                {pages.map((page) => (
                    <PaginationItem
                        isActive={currentPage === page}
                        key={page}
                        onClick={() => setCurrentPage(page)}
                    >
                        <PaginationLink
                            isActive={currentPage === page}
                            aria-current={
                                page === currentPage ? "page" : undefined
                            }
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem
                    disabled={currentPage === totalPage}
                    onClick={() => setCurrentPage((prevState) => prevState + 1)}
                >
                    <PaginationNext disabled={currentPage === totalPage} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default CustomPagination;
