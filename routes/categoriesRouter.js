const express = require('express');
const CategoriesServices = require('../services/categoriesServices');

const router = express.Router();
const service = new CategoriesServices();

router.get('/', (req,res) => {
  const categories = service.find();
  res.json(categories);
});

router.get('/:id', (req,res) => {
  const { id } = req.params;
  let category = service.findOne(id);
  res.json(category);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: "created",
    body: body
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  const category = service.create(body);
  res.json(category);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  let cambio = service.update(id,body);
  res.json(cambio);
});

router.delete('/:id', (req, res)=>{
  const { id } = req.params;
  let eliminar = service.delete(id);
  res.json(eliminar);
});

module.exports = router;
