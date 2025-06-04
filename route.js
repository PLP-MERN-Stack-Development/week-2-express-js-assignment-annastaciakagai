const express = require('express');
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
  res.json(products);
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
  products =products.filter(u => u.id !== req.params.id);
  res.status(204).json(products);
})


module.exports = router;