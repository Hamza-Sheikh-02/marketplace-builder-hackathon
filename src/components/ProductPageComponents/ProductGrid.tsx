/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ProductGrid.tsx
"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
// import { urlFor } from "@/sanity/lib/image";
import ProductCard from "./ProductCard"; // Import the ProductCard component
import { Pagination } from "./Pagination"; // Import the Pagination component
import FilterBar from "./FilterBar";

async function fetchProducts() {
  const query = `*[_type == "product"]{
    name,
    price,
    image,
    quantity,
    "slug": slug.current
  }`;
  const products = await client.fetch(query);
  return products;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Date added");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8); // Number of items per page

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = () => {
    if (sortOption === "Price (Low to High)") {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price (High to Low)") {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    }
    return filteredProducts;
  };

  const handleSortChange = (sortBy: string) => {
    setSortOption(sortBy);
  };

  // Pagination Logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts().slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change Page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    <>
      <FilterBar onSortChange={handleSortChange} />
      <div className="mb-20 mt-20">
        <div className="text-center mb-10">
          <h1 className="sm:text-4xl text-3xl font-bold mb-4">All Products</h1>
          <div className="flex justify-center">
            <div className="w-16 h-1 rounded-full bg-primary" />
          </div>
        </div>

        <div className="flex items-center justify-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-lg text-gray-600">
                No products found matching your search.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredProducts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}
