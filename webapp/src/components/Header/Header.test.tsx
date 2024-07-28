import React from "react";
import { create, ReactTestRenderer } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

const links = [
  { label: 'Home', url: '/' },
  { label: 'Products', url: '/products' }
];

describe('Header', () => {
  let tree: ReactTestRenderer;

  const renderHeader = (initialEntries = ['/']) => {
    tree = create(
      <MemoryRouter initialEntries={initialEntries}>
        <Header links={links} />
      </MemoryRouter>
    );
  };

  afterEach(() => {
    if (tree) {
      tree.unmount();
    }
  });

  it('renders the main icon and links', async () => {
    renderHeader();
    const testInstance = tree.root;
    
    expect(testInstance.findByProps({ 'data-testid': 'header-container-div' })).toBeTruthy();
    expect(testInstance.findByProps({ 'data-testid': 'main-icon' })).toBeTruthy();
    links.forEach((_, index) => {
      expect(testInstance.findByProps({ 'data-testid': `link-${index}` })).toBeTruthy();
    });
  });

  it('highlights the active link', async () => {
    renderHeader(['/products']);
    const testInstance = tree.root;

    links.forEach((link, index) => {
      const linkElement = testInstance.findByProps({ 'data-testid': `link-${index}` });
      if (link.url === '/products') {
        expect(linkElement.props.className).toContain('bg-black text-red-500');
      } else {
        expect(linkElement.props.className).toContain('text-white');
      }
    });
  });
});