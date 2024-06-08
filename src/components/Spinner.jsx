export default function Spinner() {
    return (
        <div role="status" className="flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
