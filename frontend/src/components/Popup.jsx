import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

function Popup({ dataItem }) {
  const [editProduct, setEditProduct] = useState(dataItem);
  const formik = useFormik({
    enableReinitialze: true,
    initialValues: {
      Name: dataItem.name,
      Category: dataItem.category,
      Price: dataItem.price,
      Image: dataItem.image,
    },
    onSubmit: (values) => {
      //   if (dataItem === null) {
      //     try {
      //       dispatch({
      //         type: "SHOW_LOADING",
      //       });
      //       const res = await axios.post("/api/products/addproducts", values);
      //       getAllProducts();
      //       dispatch({
      //         type: "HIDE_LOADING",
      //       });
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   } else {
      //     try {
      //       dispatch({
      //         type: "SHOW_LOADING",
      //       });
      //       await axios.put("/api/products/updateproducts", {
      //         ...values,
      //         productId: editProduct._id,
      //       });
      //       getAllProducts();
      //       dispatch({
      //         type: "HIDE_LOADING",
      //       });
      //       console.log("Submit success");
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   }
      //   console.log(values);
    },
  });

  console.log(dataItem);
  console.log(editProduct);
  //   useEffect(() => {}, [dataItem]);

  return (
    <div
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      className="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
              Product
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative p-4">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-6">
                  <label for="exampleInputNamel1" classname="form-label inline-block mb-2 text-gray-700">
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
                    name="Name"
                    value={formik.values.Name}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group mb-6">
                  <label for="exampleInputCategory1" className="form-label inline-block mb-2 text-gray-700">
                    Category
                  </label>
                  <select
                    name="Category"
                    onChange={formik.handleChange}
                    value={formik.values.Category}
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
                  <label for="exampleInputPrice1" className="form-label inline-block mb-2 text-gray-700">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                           border border-solid border-gray-300 rounded transition ease-in-out m-0
                         focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleInputPrice1"
                    aria-describedby="emailHelp"
                    placeholder="Price"
                    name="Price"
                    onChange={formik.handleChange}
                    value={formik.values.Price}
                  />
                </div>
                <div className="form-group mb-6">
                  <label for="exampleInputImage1" className="form-label inline-block mb-2 text-gray-700">
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
                    name="Image"
                    value={formik.values.Image}
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
  );
}

export default Popup;
