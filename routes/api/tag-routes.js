const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagData = Tag.findAll({
    include: [{
      model: Product, through: ProductTag, as: 'tag_product'
    }]
  })
  .then((tagData) => res.json(tagData));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagData = Tag.findByPk(req.params.id, {
    include: [{
      model: Product, through: ProductTag, as: 'tag_product'
    }]
  }).then((tagData) => res.json(tagData));
});

router.post('/', (req, res) => {
  // create a new tag
  const tagData = Tag.create(req, res);
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const tagData = Tag.update(req.body, {
    where: {id: req.params.id}
  })
  .then((tagData) => {
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id"});
      return;
    }
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const tagData = Tag.destroy({
    where: { id: req.params.id }
  })
  .then((tagData) => {
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id"});
    return;
    }
    res.json(tagData);
  });
});

module.exports = router;
