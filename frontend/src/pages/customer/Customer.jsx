import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Customer = () => {
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);

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
      <h2 className="text-center text-lg font-medium my-2">Tất cả khách hàng</h2>
      <div className="w-full">
        <table className="w-full border border-solid border-[#000] rounded">
          <thead className="mt-2">
            <tr className="border-b-stone-800 border-b-[1px]">
              <th>Tên khách hàng</th>
              <th>Số điện thoại khách hàng</th>
              <th>Địa chỉ</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {billsData.map((billtItem, index) => (
              <tr key={index} className="border-b-stone-800 border-b-[1px]">
                <td className="border-r-stone-800 border-r-[1px]">{billtItem.customerName}</td>
                <td className="border-r-stone-800 border-r-[1px]">{billtItem.customerPhone}</td>
                <td>{billtItem.customerAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Customer;
