import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('pizzas');
  const categories = [
    {
      name: 'pizzas',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT6cn1G8yYf2k_Bzg_ujqrJwRyxHqVY_cvUTyOBXCwoA&s',
    },
    {
      name: 'burgers',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3siTRMBjfGupWoK0pZGoQOSEK-Zl-4vrX5th70hM&s',
    },
    {
      name: 'drinks',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8_0H4_sLZsgELM4sODmikqHirafLBWEhyEk3sCA&s',
    },
  ];

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        dispatch({
          type: 'SHOW_LOADING',
        });
        const { data } = await axios.get('/api/products/getproducts');
        setProductData(data);
        dispatch({
          type: 'HIDE_LOADING',
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, [dispatch]);

  return (
    <>
      <Layout>
        <div className="flex flex-row justify-around mb-2 mt-2">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`${
                selectedCategory === category.name && 'shadow-[0_0px_5px] shadow-[#001e28] rounded-md p-2'
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <h3 className="capitalize tracking-[1.3px]">{category.name}</h3>
              <img src={category.imageUrl} alt={category.name} height={60} width={60} className="cursor-pointer" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {productData
            .filter((e) => e.category === selectedCategory)
            .map((product) => (
              <div className="">
                <Product key={product.id} product={product} />
              </div>
            ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;
