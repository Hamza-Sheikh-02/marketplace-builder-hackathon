/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
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

function ProductCard({ product }: { product: any }) {
  const imageUrl = product.image ? urlFor(product.image).url() : null;
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/products/${product.slug}`);
  };

  return (
    <Card className="w-full shadow-lg border rounded-lg">
      <CardHeader className="p-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            width={350}
            height={350}
            className="rounded-lg object-cover w-full h-64"
          />
        ) : (
          <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-lg font-medium text-gray-800 dark:text-gray-400">
          £ {product.price.toFixed(2)}
        </p>
        <p className="text-sm text-green-700">
          {product.quantity > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          onClick={handleViewDetails}
          disabled={!product.quantity || product.quantity === 0}
        >
          {product.quantity && product.quantity > 0
            ? "See Details"
            : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("Date added");

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
          {sortedProducts().length > 0 ? (
            sortedProducts().map((product, index) => (
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
      </div>
    </>
  );
}
