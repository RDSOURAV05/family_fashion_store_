import { Router, Request, Response } from 'express';
import { db } from '../db/index.js';
import { requireAdmin } from '../middleware/auth.js';
import { Product } from '../types.js';

const router = Router();

// GET /api/products
router.get('/', (req: Request, res: Response) => {
  try {
    let products = [...db.getProducts()];

    const {
      category,
      search,
      minPrice,
      maxPrice,
      size,
      color,
      inStock,
      isFeatured,
      isNewArrival,
      sort
    } = req.query;

    // Filter by Category
    if (category && typeof category === 'string' && category !== 'All' && category !== 'Shop All') {
      if (category.toLowerCase() === 'new arrivals') {
        products = products.filter(p => p.isNewArrival);
      } else if (category.toLowerCase() === 'festive collection' || category.toLowerCase() === 'festive wear') {
        products = products.filter(p => 
          p.category === 'Festive Wear' || 
          p.tags?.some(t => t.toLowerCase().includes('festive'))
        );
      } else if (category.toLowerCase() === 'kurtas & kurta sets' || category.toLowerCase() === 'kurtas & sets') {
        products = products.filter(p => p.category === 'Kurtas' || p.category === 'Kurta Sets');
      } else if (category.toLowerCase() === 'dresses & tops') {
        products = products.filter(p => p.category === 'Dresses' || p.category === 'Tops & Tunics');
      } else {
        products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
    }

    // Filter by Search Query
    if (search && typeof search === 'string') {
      const q = search.toLowerCase().trim();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Filter by Price Range
    if (minPrice && !isNaN(Number(minPrice))) {
      products = products.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice && !isNaN(Number(maxPrice))) {
      products = products.filter(p => p.price <= Number(maxPrice));
    }

    // Filter by Size
    if (size && typeof size === 'string') {
      const sizesArray = size.split(',').map(s => s.trim().toUpperCase());
      products = products.filter(p =>
        p.sizes.some(s => sizesArray.includes(s.toUpperCase()))
      );
    }

    // Filter by Color
    if (color && typeof color === 'string') {
      const colorsArray = color.split(',').map(c => c.trim().toLowerCase());
      products = products.filter(p =>
        p.colors.some(c => colorsArray.some(filterCol => c.toLowerCase().includes(filterCol)))
      );
    }

    // Filter by Stock Availability
    if (inStock === 'true' || inStock === '1') {
      products = products.filter(p => p.inStock && p.stockCount > 0);
    }

    // Filter by New Arrival
    if (isNewArrival === 'true' || isNewArrival === '1') {
      products = products.filter(p => p.isNewArrival);
    }

    // Filter by Featured
    if (isFeatured === 'true' || isFeatured === '1') {
      products = products.filter(p => p.isFeatured);
    }

    // Sorting
    if (sort) {
      switch (sort) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'featured':
        default:
          products.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching products.' });
  }
});

// GET /api/products/:idOrSlug
router.get('/:idOrSlug', (req: Request, res: Response) => {
  const { idOrSlug } = req.params;
  const product = db.getProductById(idOrSlug) || db.getProductBySlug(idOrSlug);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  // Get related products (same category or similar tags)
  const related = db.getProducts()
    .filter(p => p.id !== product.id && (p.category === product.category || p.tags?.some(t => product.tags?.includes(t))))
    .slice(0, 4);

  res.json({
    success: true,
    data: product,
    related
  });
});

// POST /api/products (Protected)
router.post('/', requireAdmin, (req: Request, res: Response) => {
  const {
    name,
    category,
    price,
    originalPrice,
    description,
    fabricDetails,
    careInstructions,
    images,
    sizes,
    colors,
    inStock,
    stockCount,
    isFeatured,
    isNewArrival,
    tags
  } = req.body;

  if (!name || !category || !price || !description) {
    return res.status(400).json({ success: false, message: 'Name, category, price, and description are required.' });
  }

  const slug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4);

  const discountPercent = originalPrice && originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : undefined;

  const newProduct = db.createProduct({
    name,
    slug,
    category,
    price: Number(price),
    originalPrice: originalPrice ? Number(originalPrice) : undefined,
    discountPercent,
    description,
    fabricDetails: fabricDetails || '',
    careInstructions: careInstructions || '',
    images: Array.isArray(images) && images.length > 0 ? images : [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: Array.isArray(sizes) && sizes.length > 0 ? sizes : ['Free Size'],
    colors: Array.isArray(colors) && colors.length > 0 ? colors : ['Classic'],
    inStock: inStock !== undefined ? Boolean(inStock) : true,
    stockCount: stockCount !== undefined ? Number(stockCount) : 10,
    isFeatured: Boolean(isFeatured),
    isNewArrival: Boolean(isNewArrival),
    tags: Array.isArray(tags) ? tags : []
  });

  res.status(201).json({ success: true, data: newProduct });
});

// PUT /api/products/:id (Protected)
router.put('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const existing = db.getProductById(id);

  if (!existing) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  const updates = { ...req.body };
  if (updates.price !== undefined) updates.price = Number(updates.price);
  if (updates.originalPrice !== undefined) {
    updates.originalPrice = Number(updates.originalPrice);
    if (updates.originalPrice > (updates.price ?? existing.price)) {
      updates.discountPercent = Math.round(
        ((updates.originalPrice - (updates.price ?? existing.price)) / updates.originalPrice) * 100
      );
    } else {
      updates.discountPercent = undefined;
    }
  }

  const updated = db.updateProduct(id, updates);
  res.json({ success: true, data: updated });
});

// DELETE /api/products/:id (Protected)
router.delete('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = db.deleteProduct(id);

  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Product not found.' });
  }

  res.json({ success: true, message: 'Product deleted successfully.' });
});

export default router;
