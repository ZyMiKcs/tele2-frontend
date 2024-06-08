const API_URL = 'https://dummyjson.com/products';

export const fetchProducts = async (query, limit = 10, skip = 0) => {
    const response = await fetch(
        `${API_URL}/search?q=${query}&limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    return data;
};
