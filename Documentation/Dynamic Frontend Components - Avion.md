# DAY 4 - BUILDING DYNAMIC FRONTEND COMPONENTS FOR MY

---

## Functional Deliverables

### 1. Product Listing Page
The product listing page dynamically fetches and displays data from the API.

#### Screenshot:
![Product Listing Page](/public/screenshots/product-listing-page.png)
  
### 2. Individual Product Detail Pages
- Data is rendered accurately based on the product slug.

#### Screenshot:
![Product Detail Page](/public/screenshots/product-detail-page.png)

### 3. Filters, Search Bar and Pagination
- **Filters:** Functional category filters that update the product list dynamically.
- **Search Bar:** Allows users to search for products by name.

#### Screenshot:
##### Filter Bar:
![Filters](/public/screenshots/filters.png)
##### Search Bar:
![Search](/public/screenshots/search.png)
---
##### Pagination Bar:
![Pagination](/public/screenshots/pagination.png)
---

## Code Deliverables

### Key Components

#### 1. ProductList Component
```tsx
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

```

#### 2. Individual Product Details Component
```tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/legacy/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice";
import BestSelling from "@/components/HomePageComponents/BestSelling";
import AboutNewsletterSection from "@/components/AboutPageComponents/NewsletterSection";
import { toast } from "sonner";
import { IoAddCircle } from "react-icons/io5";

async function fetchProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    name,
    price,
    image,
    description,
    quantity,
    dimensions,
    "slug": slug.current
  }`;

  const product = await client.fetch(query, { slug });
  return product;
}

const ProductPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      if (slug) {
        const fetchedProduct = await fetchProductBySlug(slug);
        setProduct(fetchedProduct);
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.slug,
        title: product.name,
        description: product.description,
        price: product.price,
        image: urlFor(product.image).url(),
        quantity,
      };
      dispatch(addToCart(cartItem));
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between max-w-[1440px] mx-auto p-4 lg:p-8">
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={urlFor(product.image).url()}
            width={500}
            height={650}
            alt={product.name}
            className="object-cover w-full h-auto lg:h-[600px] max-h-[600px] rounded-md"
          />
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 mt-6 lg:mt-0">
          <h1 className="text-3xl lg:text-4xl font-semibold">{product.name}</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 font-medium">
            £{product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 dark:text-gray-400">
            {product.description}
          </p>

          {product.dimensions && (
            <div className="space-y-2">
              <p className="font-medium">Dimensions</p>
              <div className="flex justify-center lg:justify-start space-x-8">
                <div>
                  <p className="font-semibold">Height</p>
                  <p>{product.dimensions.height}</p>
                </div>
                <div>
                  <p className="font-semibold">Width</p>
                  <p>{product.dimensions.width}</p>
                </div>
                <div>
                  <p className="font-semibold">Depth</p>
                  <p>{product.dimensions.depth}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <label htmlFor="quantity" className="font-medium">
              Quantity:
            </label>
            <Input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 border border-gray-300 rounded-md text-center"
            />
          </div>
          <Button
            onClick={() => {
              handleAddToCart();
              toast("Item Has Been Successfully Added", {
                icon: <IoAddCircle />,
              });
            }}
            className="bg-primary hover:bg-primary/80 text-white py-3 px-6 rounded-lg transition"
          >
            Add to cart
          </Button>
        </div>
      </div>
      <BestSelling />
      <AboutNewsletterSection />
    </>
  );
};

export default ProductPage;

```

#### 3. Filter Bar Component
```tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { client } from "@/sanity/lib/client";

async function fetchCategories() {
  const query = `*[_type == "category"]{name, "slug": slug.current}`;
  const categories = await client.fetch(query);
  return categories;
}

const FilterBar = ({
  onSortChange,
}: {
  onSortChange: (sortBy: string) => void;
}) => {
  const [categories, setCategories] = useState<
    { name: string; slug: string | null }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>("Date added");
  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, []);

  const handleCategorySelect = (slug: string | null) => {
    if (slug) {
      router.push(`/products/${slug}`);
    } else {
      router.push("/products");
    }
  };

  const handleSortSelect = (sortBy: string) => {
    setSelectedSort(sortBy);
    onSortChange(sortBy);
  };

  return (
    <div className="bg-gray-100 dark:text-white dark:bg-gray-800 shadow-md h-auto sm:h-[64px] w-full max-w-[1440px] mx-auto rounded-md flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-2 sm:py-0 space-y-2 sm:space-y-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-white hover:text-gray-900 px-4 py-2 rounded-lg">
            <span>{selectedCategory || "All Categories"}</span>
            <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setSelectedCategory(null);
              handleCategorySelect(null);
            }}
          >
            All Categories
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.slug || `fallback-${category.name}`}
              onClick={() => {
                setSelectedCategory(category.name);
                handleCategorySelect(category.slug);
              }}
            >
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-500 dark:text-white">
          Sorting by:
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-white hover:text-gray-900 px-4 py-2 rounded-lg">
              <span>{selectedSort}</span>
              <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleSortSelect("Date added")}>
              Date added
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortSelect("Price (Low to High)")}
            >
              Price (Low to High)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortSelect("Price (High to Low)")}
            >
              Price (High to Low)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterBar;

```

#### 3. Pagination Component
```tsx
"import React from "react";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex space-x-2">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 border rounded-md ${
            currentPage === number ? "bg-primary text-white" : "bg-backgorund"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export { Pagination };
```

---

### API Integration
#### Fetching Products
```typescript
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
```

#### Dynamic Routing
```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/legacy/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice";
import BestSelling from "@/components/HomePageComponents/BestSelling";
import AboutNewsletterSection from "@/components/AboutPageComponents/NewsletterSection";
import { toast } from "sonner";
import { IoAddCircle } from "react-icons/io5";

async function fetchProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    name,
    price,
    image,
    description,
    quantity,
    dimensions,
    "slug": slug.current
  }`;

  const product = await client.fetch(query, { slug });
  return product;
}

const ProductPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      if (slug) {
        const fetchedProduct = await fetchProductBySlug(slug);
        setProduct(fetchedProduct);
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.slug,
        title: product.name,
        description: product.description,
        price: product.price,
        image: urlFor(product.image).url(),
        quantity,
      };
      dispatch(addToCart(cartItem));
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between max-w-[1440px] mx-auto p-4 lg:p-8">
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={urlFor(product.image).url()}
            width={500}
            height={650}
            alt={product.name}
            className="object-cover w-full h-auto lg:h-[600px] max-h-[600px] rounded-md"
          />
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 mt-6 lg:mt-0">
          <h1 className="text-3xl lg:text-4xl font-semibold">{product.name}</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 font-medium">
            £{product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 dark:text-gray-400">
            {product.description}
          </p>

          {product.dimensions && (
            <div className="space-y-2">
              <p className="font-medium">Dimensions</p>
              <div className="flex justify-center lg:justify-start space-x-8">
                <div>
                  <p className="font-semibold">Height</p>
                  <p>{product.dimensions.height}</p>
                </div>
                <div>
                  <p className="font-semibold">Width</p>
                  <p>{product.dimensions.width}</p>
                </div>
                <div>
                  <p className="font-semibold">Depth</p>
                  <p>{product.dimensions.depth}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <label htmlFor="quantity" className="font-medium">
              Quantity:
            </label>
            <Input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 border border-gray-300 rounded-md text-center"
            />
          </div>
          <Button
            onClick={() => {
              handleAddToCart();
              toast("Item Has Been Successfully Added", {
                icon: <IoAddCircle />,
              });
            }}
            className="bg-primary hover:bg-primary/80 text-white py-3 px-6 rounded-lg transition"
          >
            Add to cart
          </Button>
        </div>
      </div>
      <BestSelling />
      <AboutNewsletterSection />
    </>
  );
};

export default ProductPage;

```

---

## Documentation

---

### Steps Taken
1. Set up a Next.js project for server-side rendering and dynamic routing.
2. Created reusable components (`ProductCard`, `ProductList`, `SearchBar`).
3. Integrated API for fetching products and product details.
4. Implemented dynamic routing for individual product pages.
5. Added features like category filters, search bar and pagination.

# Challenges and Solutions

**Challenge:** Handling API latency during product fetch.

**Solution:** Incorporated loading states and fallback components to handle slow API responses effectively.

# Best Practices Followed

- Modular and reusable components to ensure maintainability.
- Clean folder structure following best Next.js conventions.
- Proper use of state management and asynchronous data fetching.
