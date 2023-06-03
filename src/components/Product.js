import React, { useReducer } from 'react';
import './Product.css';
import { Container, Row, Col } from 'react-bootstrap';

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

function getTotal(cart) {
  const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
  return total.toLocaleString(undefined, currencyOptions);
}

const products = [
  {
    emoji: '🍦',
    name: 'ice cream',
    price: 5,
  },
  {
    emoji: '🍩',
    name: 'donuts',
    price: 2.5,
  },
  {
    emoji: '🍉',
    name: 'watermelon',
    price: 4,
  },
];

function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.product];
    case 'remove':
      const productIndex = state.findIndex(item => item.name === action.product.name);
      if (productIndex < 0) {
        return state;
      }
      const update = [...state];
      update.splice(productIndex, 1);
      return update;
    default:
      return state;
  }
}

export default function Product() {
  const [cart, setCart] = useReducer(cartReducer, []);

  function add(product) {
    setCart({ type: 'add', product });
  }

  function remove(product) {
    setCart({ type: 'remove', product });
  }

  return (
    <Container>
      <div className="wrapper">
        <div>Shopping Cart: {cart.length} total items.</div>
        <div>Total: {getTotal(cart)}</div>
        <Row className="product-row">
          {products.map(product => (
            <Col key={product.name} xs={12} sm={6} md={4} lg={3}>
              <div className="product">
                <span role="img" aria-label={product.name}>{product.emoji}</span>
              </div>
              <div>
                <button onClick={() => add(product)}>Add</button>
                <button onClick={() => remove(product)}>Remove</button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
