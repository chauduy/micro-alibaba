function Loading({ color }: { color?: string }) {
    return (
        <div
            className={`h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-200 md:h-10 md:w-10 lg:h-12 lg:w-12 ${color ? `border-l-[${color}]` : 'border-l-primary'}`}></div>
    );
}

export default Loading;
