import React, { useState } from "react";
import { ProductCardProps } from "../interfaces";
import Spinner from "../../components/Spinner/Spinner";

const ProductCard = ({ product }: ProductCardProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <figure className="bg-neutral-300 max-w-2xl min-w-[250px] w-full h-fit flex flex-col m-0 rounded-xl">
      {!imageError && product.ProductPhotoURL ? (
        <>
          {!loaded && (
            <div className="relative w-full h-48 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          <img
            src={product.ProductPhotoURL}
            alt={product.ProductName || "Unknown Product"}
            onLoad={() => setLoaded(true)}
            onError={() => setImageError(true)}
            className={`relative rounded-xl w-full h-auto transition-opacity duration-500
              ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </>
      ) : (
        <div className="relative w-full h-48 flex items-center justify-center bg-gray-200 rounded-xl">
          <span className="text-gray-800">No Image</span>
        </div>
      )}
      <div className="p-4">
        <figcaption className="font-bold">{product.ProductName || "Unknown Product"}</figcaption>
        <span className="text-gray-800">{product.ProductID}</span>
      </div>
    </figure>
  );
};

export default ProductCard;