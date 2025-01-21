/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/legacy/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: {
    name: string;
    price: number;
    image: any;
    quantity: number;
    slug: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
};

export default ProductCard;
