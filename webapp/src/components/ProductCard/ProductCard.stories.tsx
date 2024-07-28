import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductCard from './ProductCard';

export default {
  title: 'Product Card',
  component: ProductCard,
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />;

export const DefaultProductCard = Template.bind({});
DefaultProductCard.args = {
  product: {
    ProductID: 1234,
    ProductName: 'Test Product',
    ProductPhotoURL: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1000',
    ProductStatus: 'Active',
  },
};

export const LongNameProductCard = Template.bind({});
LongNameProductCard.args = {
  product: {
    ProductID: 1234,
    ProductName: 'This is a very long product name to test how the component handles overflow or text wrapping in the user interface',
    ProductPhotoURL: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1000',
    ProductStatus: 'Active',
  },
};

export const NoImageProductCard = Template.bind({});
NoImageProductCard.args = {
  product: {
    ProductID: 1234,
    ProductName: 'Product Without Image',
    ProductPhotoURL: '',
    ProductStatus: 'Active',
  },
};

export const InvalidImageProductCard = Template.bind({});
InvalidImageProductCard.args = {
  product: {
    ProductID: 1234,
    ProductName: 'Product with Invalid Image URL',
    ProductPhotoURL: 'https://invalid-url.com/image.jpg',
    ProductStatus: 'Active',
  },
};