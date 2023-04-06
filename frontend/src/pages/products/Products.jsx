import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin7Line } from 'react-icons/ri';
import axios from 'axios';
import { useFormik } from 'formik';

const Products = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [addData, setAddData] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1)
  // const [productsPerPage, setProductsPerPage] = useState(10)
  const [editProduct, setEditProduct] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });

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

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (productItem) => {
    try {
      dispatch({
        type: 'SHOW_LOADING',
      });
      await axios.post('/api/products/deleteproducts', {
        productId: productItem._id,
      });
      getAllProducts();
      dispatch({
        type: 'HIDE_LOADING',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: editProduct.name,
      category: editProduct.category,
      price: editProduct.price,
      image: editProduct.image,
    },
    onSubmit: async (values) => {
      console.log(editProduct);
      if (
        editProduct.name === '' &&
        editProduct.category === '' &&
        editProduct.price === '' &&
        editProduct.image === ''
      ) {
        try {
          dispatch({
            type: 'SHOW_LOADING',
          });
          await axios.post('/api/products/addproducts', values);
          getAllProducts();
          setEditProduct({});
          dispatch({
            type: 'HIDE_LOADING',
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          dispatch({
            type: 'SHOW_LOADING',
          });
          await axios.put('/api/products/updateproducts', {
            ...values,
            productId: editProduct._id,
          });
          getAllProducts();
          dispatch({
            type: 'HIDE_LOADING',
          });
          console.log('Submit success');
        } catch (error) {
          console.log(error);
        }
      }
    },
    enableReinitialize: true,
  });

  //Get current products
  // const indexOfLastProducts = currentPage * productsPerPage
  // const indexOfFirstProducts = indexOfLastProducts - productsPerPage
  // const currentProducts = productData.slice(indexOfFirstProducts, indexOfLastProducts)

  return (
    <Layout>
      <div className="flex flex-row justify-around my-2">
        <h1 className="text-lg font-medium">Tất cả sản phẩm</h1>
        <button
          onClick={() => {
            setAddData(true);
            setEditProduct({ name: '', category: '', price: '', image: '' });
          }}
          type="button"
          className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add product
        </button>
      </div>
      <div className="w-full">
        <table className="w-full border border-solid border-[#000] rounded">
          <thead className="mt-2">
            <tr className="border-b-stone-800 border-b-[1px]">
              <th>Tên sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Giá sản phẩm(VND)</th>
              <th>Chỉnh sửa hoặc xóa</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {productData.map((productItem, index) => (
              <tr key={index} className="border-b-stone-800 border-b-[1px]">
                <td>{productItem.name}</td>
                <td className="flex justify-center">
                  <img src={productItem.image} alt={productItem.name} className="w-[60px] h-[60px]" />
                </td>
                <td>{productItem.price}</td>
                <td className="">
                  <div className="flex flex-row h-full justify-center">
                    <CiEdit
                      className="cursor-pointer text-lg mr-2"
                      onClick={() => {
                        setAddData(false);
                        setEditProduct(productItem);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    />
                    <RiDeleteBin7Line onClick={() => handleDelete(productItem)} className="cursor-pointer text-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto hidden"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                  {addData === true ? 'Add Product' : 'Edit Product'}
                </h5>
                <button
                  type="button"
                  className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setEditProduct({
                      name: '',
                      category: '',
                      price: '',
                      image: '',
                    });
                  }}
                ></button>
              </div>
              <div className="modal-body relative p-4 ">
                <div class="block p-6 rounded-lg shadow-lg bg-white">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-6">
                      <label htmlFor="exampleInputNamel1" className="form-label inline-block mb-2 text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                           border border-solid border-gray-300 rounded transition ease-in-out m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleInputNamel1"
                        aria-describedby="emailHelp"
                        placeholder="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="form-group mb-6">
                      <label htmlFor="exampleInputCategory1" className="form-label inline-block mb-2 text-gray-700">
                        Category
                      </label>
                      <select
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                           border border-solid border-gray-300 rounded transition ease-in-out m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      >
                        <option value="pizzas">Pizza</option>
                        <option value="burgers">Burgers</option>
                        <option value="drinks">Drink</option>
                      </select>
                    </div>
                    <div className="form-group mb-6">
                      <label htmlFor="exampleInputPrice1" className="form-label inline-block mb-2 text-gray-700">
                        Price
                      </label>
                      <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                           border border-solid border-gray-300 rounded transition ease-in-out m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleInputPrice1"
                        aria-describedby="emailHelp"
                        placeholder="price"
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                      />
                    </div>
                    <div className="form-group mb-6">
                      <label htmlFor="exampleInputImage1" className="form-label inline-block mb-2 text-gray-700">
                        Image
                      </label>
                      <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                           border border-solid border-gray-300 rounded transition ease-in-out m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleInputImage1"
                        aria-describedby="emailHelp"
                        placeholder="Image URL"
                        name="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                      />
                    </div>
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
