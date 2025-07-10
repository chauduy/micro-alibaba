import list from '../../product.json';

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
