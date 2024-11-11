import React from 'react';

function ProductList({ products }) {
  if (products.length === 0) {
    return <p>No products found matching your criteria.</p>;
  }

  return (
    <div className="product-list">
      <h2>Recommended Products</h2>
      {products.map((product) => (
        <div key={product.product_href} className="product-item">
          <img src={product.picture_src} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Brand: {product.brand}</p>
          <p>Type: {product.product_type}</p>
          <p>Effects: {product.notable_effects}</p>
          <p>Skin Type: {product.skintype}</p>
          <p>Price: {product.price} Rs</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;