"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sanityClient_js_1 = require("./sanityClient.js");
const slugify_1 = __importDefault(require("slugify"));
// async function uploadImageToSanity(imageUrl: string): Promise<string|null> {
//   try {
//     // Fetch the image from the URL and convert it to a buffer
//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//     const buffer = Buffer.from(response.data);
//     // Upload the image to Sanity
//     const asset = await client.assets.upload('image', buffer, {
//       filename: imageUrl.split('/').pop(), // Extract the filename from URL
//     });
//     // Debugging: Log the asset returned by Sanity
//     console.log('Image uploaded successfully:', asset);
//     return asset._id; // Return the uploaded image asset reference ID
//   } catch (error) {
//     console.error('❌ Failed to upload image:', imageUrl, error);
//     throw error;
//   }
// }
async function uploadImageToSanity(imageUrl) {
    try {
        // Fetch the image from the URL and convert it to a buffer
        const response = await axios_1.default.get(imageUrl, { responseType: 'arraybuffer', timeout: 10000 });
        const buffer = Buffer.from(response.data);
        // Upload the image to Sanity
        const asset = await sanityClient_js_1.client.assets.upload('image', buffer, {
            filename: imageUrl.split('/').pop(), // Extract the filename from URL
        });
        // Debugging: Log the asset returned by Sanity
        console.log('Image uploaded successfully:', asset);
        return asset._id; // Return the uploaded image asset reference ID
    }
    catch (error) {
        console.error('❌ Failed to upload image:', imageUrl, error);
        return null;
        //throw error;
    }
}
async function createCategory(category, counter) {
    try {
        const categoryExist = await sanityClient_js_1.client.fetch(`*[_type=="category" && slug==$slug][0]`, { slug: category.slug });
        if (categoryExist) {
            return categoryExist._id;
        }
        const catObj = {
            _type: "category",
            _id: category.slug + "-" + counter,
            name: category.name,
            slug: category.slug
        };
        const response = await sanityClient_js_1.client.createOrReplace(catObj);
        // Debugging: Log the asset returned by Sanity
        console.log('Category created successfully', response);
        return response._id; // Return the uploaded image asset reference ID
    }
    catch (error) {
        console.error('❌ Failed to category:', category.name, error);
        //throw error;
    }
}
async function importData() {
    try {
        // Fetch data from external API
        const response = await axios_1.default.get('https://hackathon-apis.vercel.app/api/products');
        const products = response.data;
        //console.log(products)
        let counter = 1;
        // Iterate over the products
        for (const product of products) {
            let imageRef = null;
            let catRef = null;
            // Upload image and get asset reference if it exists
            if (product.image) {
                //imageRef = await uploadImageToSanity(product.imageUrl);
                imageRef = await uploadImageToSanity(product.image);
            }
            if (product.category.name) {
                catRef = await createCategory(product.category, counter);
            }
            const sanityProduct = {
                _id: `product-${counter}`, // Prefix the ID to ensure validity
                _type: 'product',
                name: product.name,
                slug: {
                    _type: 'slug',
                    current: (0, slugify_1.default)(product.name || 'default-product', {
                        lower: true, // Ensure the slug is lowercase
                        strict: true, // Remove special characters
                    }),
                },
                price: product.price,
                category: {
                    _type: 'reference',
                    _ref: catRef ? catRef : undefined
                },
                tags: product.tags ? product.tags : [],
                quantity: 50,
                image: imageRef ? {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: imageRef, // Set the correct asset reference ID
                    },
                } : undefined,
                description: product.description ? product.description : "A timeless design, with premium materials features as one of our most popular and iconic pieces. The dandy chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.",
                features: product.features ? product.features : [
                    "Premium material",
                    "Handmade upholstery",
                    "Quality timeless classic",
                ],
                dimensions: product.dimensions ? product.dimensions : {
                    _type: 'dimensions', // Custom object type for dimensions
                    height: "110cm",
                    width: "75cm",
                    depth: "50cm",
                }
            };
            counter++;
            // Log the product before attempting to upload it to Sanity
            console.log('Uploading product:', sanityProduct);
            // Import data into Sanity
            await sanityClient_js_1.client.createOrReplace(sanityProduct);
            console.log(`✅ Imported product: ${sanityProduct.name}`);
        }
        console.log('✅ Data import completed!');
    }
    catch (error) {
        console.error('❌ Error importing data:', error);
    }
}
importData();
