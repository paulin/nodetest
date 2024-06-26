const express = require('express');
const models = require('../models');

const router = express.Router();

Object.keys(models).forEach((modelName) => {
  const Model = models[modelName];

  if (modelName === 'sequelize' || modelName === 'Sequelize') {
    return;
  }

  // Create
  router.post(`/${modelName.toLowerCase()}`, async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Read all
  router.get(`/${modelName.toLowerCase()}`, async (req, res) => {
    try {
      const items = await Model.findAll();
      res.json(items);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Read one
  router.get(`/${modelName.toLowerCase()}/:id`, async (req, res) => {
    try {
      const item = await Model.findByPk(req.params.id);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Update
  router.put(`/${modelName.toLowerCase()}/:id`, async (req, res) => {
    try {
      const [updated] = await Model.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedItem = await Model.findByPk(req.params.id);
        res.json(updatedItem);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete
  router.delete(`/${modelName.toLowerCase()}/:id`, async (req, res) => {
    try {
      const deleted = await Model.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.json({ message: 'Item deleted' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
});

module.exports = router;