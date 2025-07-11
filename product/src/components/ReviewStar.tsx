import { FaRegStar } from "react-icons/fa6";

function ReviewStar({ star }: { star: number }) {
    const getStyle = (index: number) => {
        switch (star) {
            case 0:
                return "text-gray-300";
            case 1:
                if (index === 0) {
                    return "text-yellow-300";
                }
                return "text-gray-300";
            case 2:
                if (index < 2) {
                    return "text-yellow-300";
                }
                return "text-gray-300";
            case 3:
                if (index < 3) {
                    return "text-yellow-300";
                }
                return "text-gray-300";
            case 4:
                if (index < 4) {
                    return "text-yellow-300";
                }
                return "text-gray-300";
            case 5:
                return "text-yellow-300";
            default:
                return "text-gray-300";
        }
    };

    const renderStar = () => {
        return Array.from({ length: 5 }, (item, index) => {
            return <FaRegStar className={getStyle(index)} key={index} />;
        });
    };

    return (
        <div className="flex items-center gap-x-1">
            {renderStar()}
            <div className="mt-0.5 text-[#767676]">{star} . </div>
        </div>
    );
}

export default ReviewStar;
