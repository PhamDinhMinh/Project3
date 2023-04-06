import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.rootReducer);
  const handleToCart = () => {
    let exist = false;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i]._id === product._id) {
        dispatch({
          type: 'UPDATE_CART',
          payload: { ...cartItems[i], quantity: cartItems[i].quantity + 1 },
        });
        exist = true;
        break;
      } else {
        exist = false;
      }
    }
    if (exist === false) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { ...product, quantity: 1 },
      });
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="rounded-lg shadow-lg bg-white max-w-sm w-full">
        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
          <img className="rounded-t-lg h-52 mx-auto" src={product.image} alt={product.name} />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{product.name}</h5>
          <p className="text-gray-700 text-base mb-4">{product.price} (VND)</p>
          <button
            type="button"
            onClick={() => handleToCart()}
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
