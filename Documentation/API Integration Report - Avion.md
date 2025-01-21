# Day 3: API Integration and Data Migration

## API Integration Process

The API integration process includes selecting appropriate APIs, implementing secure authentication, fetching data using HTTP requests, and handling errors effectively to ensure smooth functionality.

## Sanity Schema Schemas

### Product Schema:

```javascript
import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [
        {
          type: "category",
        },
      ],
    }),
    defineField({
      name: "name",
      title: "Title",
      validation: (rule) => rule.required(),
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      validation: (rule) => rule.required(),
      type: "slug",
    }),
    defineField({
      name: "image",
      type: "image",
      validation: (rule) => rule.required(),
      title: "Product Image",
    }),
    defineField({
      name: "price",
      type: "number",
      validation: (rule) => rule.required(),
      title: "Price",
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [
        {
          type: "string",
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Detailed description of the product",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "List of key features of the product",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        { name: "height", title: "Height", type: "string" },
        { name: "width", title: "Width", type: "string" },
        { name: "depth", title: "Depth", type: "string" },
      ],
      description: "Dimensions of the product",
    }),
  ],
});
```

### Category Schema:

```javascript
import { defineType, defineField } from "sanity";

export const Category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
      options: {
        source: "name",
      },
    }),
  ],
});
```

## Migration Steps and Tools Used

1. **Schema Updates**: Updated schemas to match new requirements.
2. **Data Migration**: Transformed and transferred data using scripts.
3. **Validation**: Verified data integrity post-migration.

### Tools Used

- **Sanity CLI**: For running migration scripts and managing content.
- **Axios**: Used to fetch data from the API.
- **Custom Scripts**: Used for specific data transformations.

### Migration Script

```javascript
import axios from "axios";
import { client } from "./sanityClient.js";
import slugify from "slugify";

async function uploadImageToSanity(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 10000,
    });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop(),
    });
    return asset._id;
  } catch (error) {
    return null;
  }
}

async function createCategory(category, counter) {
  try {
    const categoryExist = await client.fetch(
      `*[_type=="category" && slug==$slug][0]`,
      { slug: category.slug }
    );
    if (categoryExist) {
      return categoryExist._id;
    }
    const catObj = {
      _type: "category",
      _id: category.slug + "-" + counter,
      name: category.name,
      slug: category.slug,
    };
    const response = await client.createOrReplace(catObj);
    return response._id;
  } catch (error) {}
}

async function importData() {
  try {
    const response = await axios.get(
      "https://hackathon-apis.vercel.app/api/products"
    );
    const products = response.data;
    let counter = 1;
    for (const product of products) {
      let imageRef = null;
      let catRef = null;

      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      if (product.category.name) {
        catRef = await createCategory(product.category, counter);
      }

      const sanityProduct = {
        _id: `product-${counter}`,
        _type: "product",
        name: product.name,
        slug: {
          _type: "slug",
          current: slugify(product.name || "default-product", {
            lower: true,
            strict: true,
          }),
        },
        price: product.price,
        category: {
          _type: "reference",
          _ref: catRef ? catRef : undefined,
        },
        tags: product.tags ? product.tags : [],
        quantity: 50,
        image: imageRef
          ? {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageRef,
              },
            }
          : undefined,
        description: product.description
          ? product.description
          : "A timeless design, with premium materials features as one of our most popular and iconic pieces. The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.",
        features: product.features
          ? product.features
          : [
              "Premium material",
              "Handmade upholstery",
              "Quality timeless classic",
            ],
        dimensions: product.dimensions
          ? product.dimensions
          : {
              _type: "dimensions",
              height: "110cm",
              width: "75cm",
              depth: "50cm",
            },
      };
      counter++;
      await client.createOrReplace(sanityProduct);
    }
  } catch (error) {}
}

importData();
```
