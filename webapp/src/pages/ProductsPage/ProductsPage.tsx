import React, { useEffect, useState } from "react";
import PageWrapper from "../PageWrapper";
import ProductCard from "../../components/ProductCard/ProductCard";
import Spinner from "../../components/Spinner/Spinner";
import { Product } from "../../components/interfaces";
import { getActiveProducts } from "../ApiHelper";

const ProductsPage = () => {
  /*
    TODO:
      When the drag ends we want to keep the status persistant across logins. 
      Instead of modifying the data locally we want to do it serverside via a post
      request
  */

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const activeProducts = await getActiveProducts();
        setProducts(activeProducts);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  let content;
  if (loading) {
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  } else if (error) {
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occurred fetching the data!
      </div>
    );
  } else if (products.length === 0) {
    content = (
      <div className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white">
        No products available
      </div>
    );
  } else {
    content = (
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.ProductID} product={product} />
        ))}
      </div>
    );
  }

  return (
    <PageWrapper>
      {content}
    </PageWrapper>
  );
};

export default ProductsPage;
