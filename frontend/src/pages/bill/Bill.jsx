import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FaRegEye } from 'react-icons/fa';
import DetailBill from '../../components/DetailBill';

const Bill = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  // const { cartItems } = useSelector((state) => state.rootReducer);
  const [selected, setSelected] = useState(null);

  const getAllBills = async () => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      const { data } = await axios.get('/api/bills/getbills');
      setBillsData(data);
      dispatch({
        type: 'HIDE_LOADING',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBills();
  }, []);

  return (
    <Layout>
      <h2 className="text-center text-lg font-medium my-2">Tất cả bill</h2>
      <div className="w-full">
        <table className="w-full border border-solid border-[#000] rounded">
          <thead className="mt-2">
            <tr className="border-b-stone-800 border-b-[1px]">
              <th>Mã</th>
              <th>Tên khách hàng</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              {/* <th>sub total</th>
              <th>tax</th> */}
              <th>Thành Tiền(VND)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {billsData.map((billtItem, index) => (
              <tr key={index} className="border-b-stone-800 border-b-[1px]">
                <td>{billtItem._id}</td>
                <td>{billtItem.customerName}</td>
                <td>{billtItem.customerPhone}</td>
                <td className="text-start pl-10">{billtItem.customerAddress}</td>
                {/* <td>{billtItem.subTotal}</td>
                <td>{billtItem.tax}</td> */}
                <td>{billtItem.totalAmount}</td>
                <td>
                  <div className="flex flex-row justify-center">
                    <FaRegEye
                      className="cursor-pointer"
                      onClick={() => {
                        setSelected(billtItem);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selected !== null ? <DetailBill billItem={selected} /> : ''}
      </div>
    </Layout>
  );
};

export default Bill;
