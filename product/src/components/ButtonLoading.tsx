function ButtonLoading({ color }: { color?: string }) {
    return (
        <div
            className="h-5 w-5 animate-spin rounded-full border-4 border-t-4"
            style={{ borderTopColor: color ? color : "#fff" }}
        ></div>
    );
}

export default ButtonLoading;
