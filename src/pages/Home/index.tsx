import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    var dict = {
      key: product.id,
      value: sumAmount
    };

    console.log('entrou')
    return dict;
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      // TODO
      setProducts([...products, {
        id: 1,
        image: 'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
        price: 179.90,
        priceFormatted: 'R$ 179,90',
        title: 'Tênis de Caminhada Leve Confortável'
      }])
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    // TODO
    console.log('handleAddProduct')
  }

  return (
    <ProductList>
      {
        products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>
            {
              new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)
            }
            </span>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => handleAddProduct(product.id)}
            >
              <div data-testid="cart-product-quantity">
                <MdAddShoppingCart size={16} color="#FFF" />
                { cartItemsAmount[product.id] || 0 } 
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
      </li>
        ))
      }
    </ProductList>
  );
};

export default Home;
