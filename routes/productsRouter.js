const express = require('express');
const ProductsServices = require('../services/productServices');
const validatorHandler = require('../middlewares/validatorHandler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/productSchema');

const router = express.Router();
const service = new ProductsServices();

router.get('/', async (req,res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'params'),
  async (req,res)=> {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: "created",
      data: newProduct
    });
  }
);

router.patch('/:id',
  validatorHandler(updateProductSchema, 'body'),
  async (req, res,next)=>{
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id,body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res)=>{
  const { id } = req.params;
  const del = await service.delete(id);
  res.json(del);
});

module.exports = router;
