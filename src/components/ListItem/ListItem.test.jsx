import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListItem from './ListItem';

test('renders product title and price', () => {
    const product = { id: 1, title: 'Test Product', price: 100 };
    const { getByText } = render(<ListItem product={product} />);

    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('$100')).toBeInTheDocument();
});
