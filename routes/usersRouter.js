const express = require('express');
const UsersServices = require('../services/usersServices');

const router = express.Router();
const service = new UsersServices();

router.get('/', (req,res) => {
  const users = service.find();
  res.json(users);
});

router.get('/:id', (req,res) => {
  const { id } = req.params;
  let user = service.findOne(id);
  res.json(user);
});

router.post('/', (req, res) => {
  const body = req.body;
  const user = service.create(body);
  res.json(user);
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
