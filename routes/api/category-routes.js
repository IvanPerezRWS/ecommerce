const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  })
  .then((categoryData) => {
    if (!categoryData)  {
      res.status(404).json({ message: "No categories found"});
      return;
    }
    res.json(categoryData);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  
  const categoryData = Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  })
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404)({ message: "No categories found"});
      return
    }
    res.json(categoryData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  const categoryData = Category.create({
    category_name: req.body.category_name
  })
  .then((categoryData) => res.json(categoryData));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const categoryData = Category.update({
    category_name: req.body.category_name
  })
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({ message: "No cateogiry found with this id"});
      return;
    }
    res.json(categoryData);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const categoryData = Category.destroy({
    where: { id: req.params.id }
  })
  .then((categoryData) => {
    if (categoryData) {
      res.status.json({ message: "No category found with this id" });
      return;
    }
    res.json(categoryData);
  })
});

module.exports = router;
