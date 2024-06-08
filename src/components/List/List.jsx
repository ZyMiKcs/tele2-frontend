import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../../services/api';
import ListItem from '../ListItem/ListItem';
import { debounce } from '../../utils/debounce';
import Spinner from '../Spinner';

export default function List() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const limit = 12;

    const getProducts = async (search, page) => {
        setLoading(true);
        let data = await fetchProducts(search, limit, (page - 1) * limit);
        setProducts(data.products);
        setTotal(data.total);
        setLoading(false);
    };

    const debouncedGetProducts = useCallback(
        debounce((search, page) => getProducts(search, page), 500),
        []
    );

    useEffect(() => {
        debouncedGetProducts(search, page);
    }, [search, page, debouncedGetProducts]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handlePrevPage = () => {
        setPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prev) => (prev < Math.ceil(total / limit) ? prev + 1 : prev));
    };

    return (
        <div className="container mx-auto p-4">
            <input
                type="text"
                placeholder="Поиск продуктов"
                value={search}
                onChange={handleSearch}
                className="block w-1/2 p-2 mx-auto mb-4 border rounded-md"
            />
            {loading ? (
                <Spinner />
            ) : total > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <ListItem key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="font-semi text-[24px]">
                        По вашему запросу ничего не найдено =(
                    </p>
                </div>
            )}
            <div className="flex justify-center mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="px-4 py-2 mx-2 text-white bg-blue-500 rounded disabled:opacity-50"
                >
                    Предыдущая
                </button>
                <span className="px-4 py-2 mx-2">{page}</span>
                <button
                    onClick={handleNextPage}
                    disabled={total / page <= limit}
                    className="px-4 py-2 mx-2 text-white bg-blue-500 rounded disabled:opacity-50"
                >
                    Следующая
                </button>
            </div>
        </div>
    );
}
