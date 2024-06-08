import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import List from './List';
import { vi } from 'vitest';
import { fetchProducts } from '../../services/api';

const mockProducts = {
    products: [
        { id: 1, title: 'Test Product 1', price: 100 },
        { id: 2, title: 'Test Product 2', price: 200 },
    ],
    total: 2,
};

vi.mock('../../services/api', () => ({
    fetchProducts: vi.fn(() => Promise.resolve(mockProducts)),
}));

test('Отрисовка поля поиска и кнопок пагинации', () => {
    render(<List />);

    expect(screen.getByPlaceholderText('Поиск продуктов')).toBeInTheDocument();
    expect(screen.getByText('Предыдущая')).toBeInTheDocument();
    expect(screen.getByText('Следующая')).toBeInTheDocument();
});

test('Получение данных и отображение продуктов', async () => {
    render(<List />);

    await waitFor(() => {
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
});

test('Отображение спиннера при загрузке', async () => {
    render(<List />);

    await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});

test('Проверка работы поиска', async () => {
    render(<List />);

    fireEvent.change(screen.getByPlaceholderText('Поиск продуктов'), {
        target: { value: 'Test' },
    });

    await waitFor(() => {
        expect(fetchProducts).toHaveBeenCalledWith('Test', 12, 0);
    });
});
