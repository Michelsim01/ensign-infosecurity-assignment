import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import Cart from './Cart';
import { BrowserRouter } from 'react-router-dom';

// Helper function to render the cart with the necessary wrappers
const renderCart = () => {
    return render(
        <BrowserRouter>
            <CartProvider>
                <Cart />
            </CartProvider>
        </BrowserRouter>
    );
};

describe('Cart Page', () => {
    // Clean up localStorage before each test to ensure tests don't interfere
    beforeEach(() => {
        localStorage.clear();
    });

    // test 1: empty cart shows correct message and 'start shopping' button
    test('shows empty cart message when no items are present', () => {
        renderCart();
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /start shopping/i })).toBeInTheDocument();
    });

    // test 2: check if total price is correct when there are items in the cart
    test('correctly displays the total price when items are in cart', () => {
        // Set up localStorage with cart items before rendering
        // CartProvider reads from localStorage on initialization
        const mockCart = [{ id: 1, title: 'Test Product', price: 50, quantity: 2, image: '' }];
        localStorage.setItem('ensign-cart', JSON.stringify(mockCart));

        renderCart();

        // The total is formatted with toFixed(2), so it will be $100.00
        // The total appears in two places: Subtotal and Total, so use getAllByText
        const totalDisplays = screen.getAllByText(/\$100\.00/);
        expect(totalDisplays.length).toBeGreaterThan(0);
        // Verify the "Total" section specifically
        expect(screen.getByText('Total')).toBeInTheDocument();

        // Clean up localStorage after test
        localStorage.removeItem('ensign-cart');
    });

    // test 3: item quantity increases when plus button is clicked
    test('increases item quantity when plus button is clicked', () => {
        // Set up localStorage with cart items before rendering
        const mockCart = [{ id: 1, title: 'Test Product', price: 50, quantity: 1, image: '' }];
        localStorage.setItem('ensign-cart', JSON.stringify(mockCart));

        renderCart();

        // Verify initial quantity is 1
        expect(screen.getByText('1')).toBeInTheDocument();

        // Find and click the plus button
        const plusButton = screen.getByLabelText('Increase quantity');
        fireEvent.click(plusButton);

        // Verify quantity increased to 2
        expect(screen.getByText('2')).toBeInTheDocument();

        // Clean up
        localStorage.removeItem('ensign-cart');
    });

    // test 4: item quantity decreases when minus button is clicked
    test('decreases item quantity when minus button is clicked', () => {
        // Set up localStorage with cart items before rendering
        const mockCart = [{ id: 1, title: 'Test Product', price: 50, quantity: 2, image: '' }];
        localStorage.setItem('ensign-cart', JSON.stringify(mockCart));

        renderCart();

        // Verify initial quantity is 2
        expect(screen.getByText('2')).toBeInTheDocument();

        // Find and click the minus button
        const minusButton = screen.getByLabelText('Decrease quantity');
        fireEvent.click(minusButton);

        // Verify quantity decreased to 1
        expect(screen.getByText('1')).toBeInTheDocument();

        // Clean up
        localStorage.removeItem('ensign-cart');
    });

    // test 5: item is removed from list when trash icon is clicked
    test('removes item from list when trash icon is clicked', () => {
        // Set up localStorage with cart items before rendering
        const mockCart = [{ id: 1, title: 'Test Product', price: 50, quantity: 1, image: '' }];
        localStorage.setItem('ensign-cart', JSON.stringify(mockCart));

        renderCart();

        // Verify item is in cart
        expect(screen.getByText('Test Product')).toBeInTheDocument();

        // Find and click the remove button
        const removeButton = screen.getByTitle('Remove item');
        fireEvent.click(removeButton);

        // Verify cart is now empty
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();

        // Clean up
        localStorage.removeItem('ensign-cart');
    });
});