// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'

});

// Categories have many Products
Product.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products belongToMany Tags (through ProductTag)
Tag.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
    foreignKey: 'product_id'
  },
  as: 'product_tags'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {ProductTag,
  unique: false
  },
  as: 'tag_product'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
