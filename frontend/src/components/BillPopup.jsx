import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function BillPopup({ subTotal, cartItems }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      customerName: '',
      customerPhone: '',
      paymentMethod: '',
      customerAddress: '',
    },
    onSubmit: async (values) => {
      try {
        const newObject = {
          ...values,
          cartItems,
          totalAmount: Number((Number(subTotal) + Number((subTotal / 100) * 10)).toFixed(2)),
          tax: Number(((subTotal / 100) * 10).toFixed(2)),
          subTotal: Number(subTotal.toFixed(0)),
          userID: JSON.parse(localStorage.getItem('auth'))._id,
        };
        await axios.post('/api/bills/addbills', newObject);
        dispatch({
          type: 'DELETE',
          payload: '',
        });
        navigate('/bill');
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div>
      <div
        className="modal hidden fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog relative w-auto pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                Bill
              </h5>
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body relative p-4">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-6">
                  <label htmlFor="customerName" className="form-label inline-block mb-2 text-gray-700">
                    Tên khách hàng
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                           border border-solid border-gray-300 rounded transition ease-in-out m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="customerName"
                    aria-describedby="emailHelp"
                    placeholder="Tên khách hàng"
                    name="customerName"
                    value={formik.values.customerName}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-6">
                  <label htmlFor="customerPhone" className="form-label inline-block mb-2 text-gray-700">
                    Số điện thoại khách hàng
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                           border border-solid border-gray-300 rounded transition ease-in-out m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="customerPhone"
                    aria-describedby="emailHelp"
                    placeholder="Số điện thoại khách hàng"
                    name="customerPhone"
                    value={formik.values.customerPhone}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-6">
                  <label htmlFor="customerAddress" className="form-label inline-block mb-2 text-gray-700">
                    Địa chỉ khách hàng
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                           border border-solid border-gray-300 rounded transition ease-in-out m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="customerAddress"
                    aria-describedby="emailHelp"
                    placeholder="Địa chỉ khách hàng"
                    name="customerAddress"
                    value={formik.values.customerAddress}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div className="form-group mb-6">
                  <label htmlFor="exampleInputPayment" className="form-label inline-block mb-2 text-gray-700">
                    Phương thức thanh toán
                  </label>
                  <select
                    name="paymentMethod"
                    onChange={formik.handleChange}
                    value={formik.values.paymentMethod}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                           border border-solid border-gray-300 rounded transition ease-in-out m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="cash">Cash</option>
                    <option value="paypal">Paypal</option>
                    <option value="cart">Cart</option>
                  </select>
                </div>
                <div className="flex justify-between mb-3">
                  <h4>Chi phí: {subTotal.toFixed(0)}(VND)</h4>
                  <h4>Tax: {((subTotal / 100) * 10).toFixed(0)}(VND)</h4>
                  <h4>
                    Tổng:
                    {(Number(subTotal) + Number((subTotal / 100) * 10)).toFixed(0)}(VND)
                  </h4>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                          hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                          active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillPopup;
