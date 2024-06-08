export default function ListItem({ product }) {
    return (
        <div className="p-4 border rounded-md shadow-sm">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
        </div>
    );
}
