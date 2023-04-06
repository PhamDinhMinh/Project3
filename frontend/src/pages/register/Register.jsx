import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      phonenumber: '',
      password: '',
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        dispatch({
          type: 'SHOW_LOADING',
        });
        await axios.post('/api/users/register', values);
        navigate('/login');
        dispatch({
          type: 'HIDE_LOADING',
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      localStorage.getItem('auth');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div
      className="bg-[url('https://img6.thuthuatphanmem.vn/uploads/2022/05/13/anh-nen-may-tinh-cong-nghe-4k-tuyet-dep_102551460.jpg')] 
    bg-cover absolute right-0 left-0 top-0 bottom-0 bg-[center_top_-8rem]"
    >
      <div className="w-[30%] mx-auto bg-transparent shadow-2xl mt-[8%] rounded-lg">
        <h3 className="font-semibold text-4xl text-white text-center">Register</h3>
        <div className="w-[80%] mx-auto py-10">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-6">
              <label htmlFor="exampleInputNamel1" className="form-label inline-block mb-2 text-white">
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
                required
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="exampleInputUserID1" className="form-label inline-block mb-2 text-white">
                Số điện thoại
              </label>
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                  border border-solid border-gray-300 rounded transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputUserID1"
                aria-describedby="emailHelp"
                placeholder="Số điện thoại"
                name="phonenumber"
                onChange={formik.handleChange}
                value={formik.values.phonenumber}
                required
              />
            </div>
            <div className="form-group mb-6">
              <label htmlFor="exampleInputPassword" className="form-label inline-block mb-2 text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding
                  border border-solid border-gray-300 rounded transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInputPassword"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                />
                {showPass ? (
                  <AiOutlineEyeInvisible
                    className="absolute top-[22%] right-[20px] text-2xl cursor-pointer"
                    onClick={() => setShowPass(false)}
                  />
                ) : (
                  <AiOutlineEye
                    className="absolute top-[22%] right-[20px] text-2xl cursor-pointer"
                    onClick={() => setShowPass(true)}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-around mt-5">
              <button
                type="submit"
                data-bs-dismiss="modal"
                aria-label="Close"
                className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
              hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer"
              >
                Register
              </button>
              <Link
                to="/login"
                className="px-6 py-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
