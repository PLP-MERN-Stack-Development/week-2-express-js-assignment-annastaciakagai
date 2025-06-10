/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       category:
 *                         type: string
 *                       inStock:
 *                         type: boolean
 * /api/products/stats:
 *   get:
 *     summary: Get product statistics
 *     description: Returns the count of products by category
 *     responses:
 *       200:
 *         description: Product statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: integer
 */

const express = require('express');
const { parse } = require('uuid');
const router = express.Router();

let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// - `GET /api/products`: List all products
router.get('/products', (req, res) => {
  // res.json(products);
  let result = products;
  //filter by category
  if(req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }
  //search by name
  if(req.query.search) {
    const search =req.query.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase(). includes(search));
  }

  //pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page-1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    total: result.length,
    page,
    limit,
    products: paginated
  });
});

// - `GET /api/products/:id`: Get a specific product by ID
router.get('/products/:id', (req,res) => {
    try {
        const product = products.find(u => u.id == req.params.id);
        res.send(product)
    } catch (error) {
        res.status(500).send(error)
    }
});

// - `POST /api/products`: Create a new product
router.post('/products', (req, res) => {
  try {
    const newProduct = {
      id:products.length + 1, 
      name:req.body.name,
      description:req.body.description,
      price: req.body.price,
      category: req.body.category,
      inStock: req.body.inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).send(error)
  }
});

// - `PUT /api/products/:id`: Update an existing product
router.put('/products/:id', (req,res) =>{
  const product = products.find(u => u.id == req.params.id);
  product.price = req.body.price;
  res.send(product);
});

// - `DELETE /api/products/:id`: Delete a product
router.delete('/products/:id', (req,res) => {
  try {
    products =products.filter(u => u.id !== req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/products/stats', (req, res) => {
  console.log(products)
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;