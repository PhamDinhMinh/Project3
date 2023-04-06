import 'tw-elements';
import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BsCart2 } from 'react-icons/bs';
import { AiOutlineInfoCircle, AiOutlineHome, AiOutlineLogout, AiFillLeftCircle } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { RiProductHuntLine } from 'react-icons/ri';
import Spinner from './Spinner';

function Layout({ children }) {
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [back, setBack] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const navLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link activated' : 'nav-link';
  };

  return (
    <div className="h-screen">
      {loading && <Spinner />}
      <div className="flex flex-row flex-1 h-screen">
        <div
          className={`w-60 relative h-screen shadow-md bg-white ml-3 sidebar-container ${back ? 'w-[5.9rem]' : ''}`}
          id="sidenavSecExample"
        >
          <div className="pt-4 pb-2 pl-3">
            <div className="flex items-center h-14">
              <img
                src="https://dean2020.edu.vn/wp-content/uploads/2019/03/anh-thien-nhien-dep-3.jpeg"
                className="rounded-full w-10 h-10"
                alt="Avatar"
              />
              <h2 className={`flex-1 text-[16px] ml-3 font-semibold duration-500 ${back && 'scale-0'} `}>Pham Minh</h2>
            </div>
          </div>
          <div>
            <NavLink to="/" className={navLinkClass}>
              <div>
                <AiOutlineHome className="text-3xl mr-4" />
              </div>
              <h4>Home</h4>
            </NavLink>

            <NavLink to="/bill" className={navLinkClass}>
              <div className="">
                <FaRegMoneyBillAlt className="text-3xl mr-4" />
              </div>
              <h4>Bill</h4>
            </NavLink>

            <NavLink to="/products" className={navLinkClass}>
              <div className="">
                <RiProductHuntLine className="text-3xl mr-4" />
              </div>
              <h4>Products</h4>
            </NavLink>

            <NavLink to="/customer" className={navLinkClass}>
              <div className="">
                <AiOutlineInfoCircle className="text-3xl mr-4" />
              </div>
              <h4>Customer</h4>
            </NavLink>
          </div>
          <hr className="my-2" />
          <div className="relative">
            <Link
              className="flex items-center text-lg py-4 pl-4 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap 
                        rounded hover:text-[#FA6900] hover:bg-[#FA6900] hover:bg-opacity-30 transition duration-300 ease-in-out"
              to="/login"
              onClick={() => {
                localStorage.removeItem('auth');
              }}
            >
              <div className="">
                <AiOutlineLogout className="text-3xl mr-4" />
              </div>
              <h4>LogOut</h4>
            </Link>
          </div>
          <div className="absolute right-[-12px] top-[4%] cursor-pointer" onClick={() => setBack(!back)}>
            <AiFillLeftCircle
              className={`${back ? 'rotate-180' : ''} transition-all duration-300 text-2xl text-[#F38630]`}
            />
          </div>
        </div>
        <div className="flex-1 ">
          <div className="h-[8%] bg-[#fff] flex justify-end items-center">
            <div className="mr-5 relative cursor-pointer">
              <BsCart2 className="text-3xl" onClick={() => navigate('/cart')} />
              <div className="absolute top-[-8px] right-[-8px] bg-[#F38630] rounded-[50%] h-5 w-5">
                <h5 className="text-center text-white text-sm">{cartItems.length}</h5>
              </div>
            </div>
          </div>
          <div className="px-[8%] overflow-y-scroll h-[90%]">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
