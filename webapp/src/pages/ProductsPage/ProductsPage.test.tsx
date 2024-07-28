import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { ACTIVE_PRODUCTS_URL } from "../ApiHelper";
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from "./ProductsPage";

const server = setupServer(
  rest.get(ACTIVE_PRODUCTS_URL, (req, res, ctx) => {
    return res(ctx.json({
      data: [
        {
          "ProductID": 1,
          "ProductName": "Hat",
          "ProductPhotoURL": "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000",
          "ProductStatus": "Active"
        },
        {
          "ProductID": 2,
          "ProductName": "Shoes",
          "ProductPhotoURL": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1000",
          "ProductStatus": "Active"
        }
      ],
      message: ""
    }));
  })
);

describe("ProductsPage", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should display loading spinner", () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId("loading-spinner-container")).toBeInTheDocument();
  });

  it("should display products", async () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Hat')).toBeInTheDocument();
      expect(screen.getByText('Shoes')).toBeInTheDocument();
    });
  });

  it("should display error message", async () => {
    server.use(
      rest.get(ACTIVE_PRODUCTS_URL, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "Error" }));
      })
    );

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("error-container")).toBeInTheDocument();
    });
  });

  it("should display no products message when no products are returned", async () => {
    server.use(
      rest.get(ACTIVE_PRODUCTS_URL, (req, res, ctx) => {
        return res(ctx.json({ data: [], message: "" }));
      })
    );

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No products available')).toBeInTheDocument();
    });
  });

  it("should handle products with missing data", async () => {
    server.use(
      rest.get(ACTIVE_PRODUCTS_URL, (req, res, ctx) => {
        return res(ctx.json({
          data: [
            {
              "ProductID": 1,
              "ProductName": null,
              "ProductPhotoURL": null,
              "ProductStatus": "Active"
            }
          ],
          message: ""
        }));
      })
    );

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No Image')).toBeInTheDocument();
      expect(screen.getByText('Unknown Product')).toBeInTheDocument();
    });
  });
});