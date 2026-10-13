const BASE_URL = 'https://dummyjson.com';

// The API's product shape is different from the one our components expect.
// This function translates one API product into our shape, so the cards,
// cart, and checkout keep working without changes.
function normalizeProduct(raw) {
  const hue = (raw.id * 47) % 360; // a color number from 0 to 359
  const description = raw.description || '';

  const specs = [
    raw.brand ? `Brand: ${raw.brand}` : null,
    `Rating: ${raw.rating} / 5`,
    `In stock: ${raw.stock}`,
    raw.warrantyInformation,
    raw.shippingInformation,
  ].filter(Boolean); // removes empty entries

  return {
    id: raw.id,
    name: raw.title,
    category: raw.category.replace(/-/g, ' '),
    price: raw.price,
    tagline: description.length > 70 ? description.slice(0, 67) + '…' : description,
    description: description,
    colorFrom: `hsl(${hue}, 70%, 65%)`,
    colorTo: `hsl(${(hue + 40) % 360}, 80%, 88%)`,
    specs: specs,
  };
}

// Sends the request and returns the JSON, or throws an error if it fails.
async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

// Gets a list of products. With a search term, it calls the API's search address.
export async function fetchProducts(searchTerm = '') {
  const path = searchTerm
    ? `/products/search?q=${encodeURIComponent(searchTerm)}&limit=30`
    : '/products?limit=30';

  const data = await request(path);
  return data.products.map(normalizeProduct);
}

// Gets one product by id.
export async function fetchProductById(id) {
  const raw = await request(`/products/${id}`);
  return normalizeProduct(raw);
}