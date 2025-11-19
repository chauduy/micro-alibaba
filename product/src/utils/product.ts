import list from "../../product.json";

export const getRelatedProducts = (id: number) => {
    let results = [];
    const findIndex = list.findIndex((item) => item.id === id);
    if (id >= list.length - 24) {
        results = list.slice(findIndex - 24, findIndex);
    } else {
        results = list.slice(findIndex + 1, findIndex + 25);
    }

    return results;
};

export const paging = (list: any, itemPerPage: number) => {
    const data: any = {};
    const length =
        list.length % itemPerPage === 0
            ? list.length / itemPerPage
            : Math.floor(list.length / itemPerPage) + 1;
    let current = 0;
    for (let i = 1; i <= length; i++) {
        data[i] = list.slice(current, current + itemPerPage);
        current += itemPerPage;
    }
    return {
        totalPage: length,
        data,
    };
};
