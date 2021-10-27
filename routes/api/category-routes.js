const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = Category.findAll({
    include: [{ model: Product }],
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  
  const categoryData = Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  });
});

router.post('/', (req, res) => {
  // create a new category
  const categoryData = Category.create({
    category_name: req.body.category_name
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const categoryData = Category.update({
    category_name: req.body.category_name
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const categoryData = Category.destroy({
    where: { id: req.params.id }
  });
});

module.exports = router;
