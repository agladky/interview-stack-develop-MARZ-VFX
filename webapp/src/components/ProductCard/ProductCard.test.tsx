import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import '@testing-library/jest-dom/extend-expect';

const mockProduct = {
  ProductID: 1234,
  ProductName: 'Test Product',
  ProductPhotoURL: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1000',
  ProductStatus: 'Active',
};

const mockProductNoImage = {
  ProductID: 1234,
  ProductName: 'Product Without Image',
  ProductPhotoURL: '',
  ProductStatus: 'Active',
};

const mockProductInvalidImage = {
  ProductID: 1234,
  ProductName: 'Product with Invalid Image URL',
  ProductPhotoURL: 'https://invalid-url.com/image.jpg',
  ProductStatus: 'Active',
};

// Mock Spinner component
jest.mock('../../components/Spinner/Spinner', () => () => <div data-testid="spinner">Loading...</div>);

describe('ProductCard', () => {
  it('should display the spinner while the image is loading', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should display the image after it has loaded', async () => {
    render(<ProductCard product={mockProduct} />);
    
    const imgElement = screen.getByAltText(mockProduct.ProductName);
    fireEvent.load(imgElement);

    await waitFor(() => expect(imgElement).toBeInTheDocument());
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('should display "No Image" text if there is no image URL', () => {
    render(<ProductCard product={mockProductNoImage} />);
    expect(screen.getByText('No Image')).toBeInTheDocument();
  });

  it('should display "No Image" text if the image URL is invalid', async () => {
    render(<ProductCard product={mockProductInvalidImage} />);
    
    const imgElement = screen.getByAltText(mockProductInvalidImage.ProductName);
    fireEvent.error(imgElement);

    await waitFor(() => expect(screen.getByText('No Image')).toBeInTheDocument());
  });

  it('should display the product name and ID', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.ProductName)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.ProductID.toString())).toBeInTheDocument();
  });
});