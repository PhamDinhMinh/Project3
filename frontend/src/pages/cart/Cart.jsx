import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { GrAddCircle } from 'react-icons/gr';
import { BiMinusCircle } from 'react-icons/bi';
import BillPopup from '../../components/BillPopup';

function Cart() {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.rootReducer);

  const handleIncrement = (e) => {
    dispatch({
      type: 'UPDATE_CART',
      payload: { ...e, quantity: e.quantity + 1 },
    });
  };

  const handleDecrement = (e) => {
    if (e.quantity !== 1) {
      dispatch({
        type: 'UPDATE_CART',
        payload: { ...e, quantity: e.quantity - 1 },
      });
    }
  };

  const handleDelete = (e) => {
    dispatch({
      type: 'DELETE_FROM_CART',
      payload: e,
    });
  };

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((productItem) => {
      temp += productItem.price * productItem.quantity;
      setSubTotal(temp);
    });
  }, [cartItems]);

  return (
    <Layout>
      <h2 className="text-center text-lg font-medium my-2">Giỏ hàng</h2>
      <div className="w-full">
        <table className="w-full border border-solid border-[#000] rounded">
          <thead className="mt-2">
            <tr className="border-b-stone-800 border-b-[1px]">
              <th>Tên</th>
              <th>Hình ảnh</th>
              <th>Giá(VND)</th>
              <th>Số lượng</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {cartItems.map((cartItems) => (
              <tr>
                <td>{cartItems.name}</td>
                <td className="flex justify-center">
                  <img src={cartItems.image} alt={cartItems.name} className="w-[60px] h-[60px]" />
                </td>
                <td>{cartItems.price}</td>
                <td>
                  <div className="flex flex-row justify-center items-center">
                    <div className="cursor-pointer">
                      <GrAddCircle onClick={() => handleIncrement(cartItems)} />
                    </div>
                    <h4 className="mx-2">{cartItems.quantity}</h4>
                    <div className="cursor-pointer">
                      <BiMinusCircle onClick={() => handleDecrement(cartItems)} className="cursor-pointer" />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex justify-center cursor-pointer">
                    <RiDeleteBin7Line onClick={() => handleDelete(cartItems)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row justify-between my-2">
          <h4>Tổng : {subTotal.toFixed(0)} (VND)</h4>
          <button
            onClick={() => setBillPopup(true)}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                        hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Tạo bill
          </button>
        </div>
        <BillPopup subTotal={subTotal} cartItems={cartItems} />
      </div>
    </Layout>
  );
}

export default Cart;
