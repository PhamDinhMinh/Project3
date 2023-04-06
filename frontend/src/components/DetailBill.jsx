import React from 'react';

const DetailBill = ({ billItem }) => {
  console.log(billItem);
  return (
    <div
      className="modal hidden fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col ite w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
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
          <div className="modal-body relative px-8 py-4">
            <div className="text-center mb-2">
              <h2 className="text-xl text-[#F38630]">♕Ҩųáท╰☆☆ßụ¡╰☆☆ϑų¡╰☆☆ϑẻ-༻꧂</h2>
              <span>Hotline: +84 345864328</span>
              <br />
              <span>Address: đại kim, đại từ, hà nội</span>
              <br />
            </div>
            {/* Body */}
            <div>
              <div className="border-b-[#001e28] border-dashed border-[1px]">
                <span>Tên khách hàng: </span>
                <span>
                  <b>{billItem.customerName}</b>
                </span>
              </div>
              <div className="border-b-[#001e28] border-dashed border-[1px]">
                <span>Số điện thoại: </span>
                <span>
                  <b>{billItem.customerPhone}</b>
                </span>
              </div>
              <div className="border-b-[#001e28] border-dashed border-[1px]">
                <span>Địa chỉ: </span>
                <span>
                  <b>{billItem.customerAddress}</b>
                </span>
              </div>
              {/* <div className="border-b-[#001e28] border-dashed border-[1px]">
                <span>Date Order:</span>
                <span>
                  <b>{billItem.createdAt}</b>
                </span>
              </div> */}
            </div>
            <div>
              <h4>Sản phẩm bạn đã đặt</h4>
              {billItem.cartItems.map((product) => (
                <div className="my-3 shadow-[0_0px_15px] shadow-[#afafaf]">
                  <div className="py-2 px-2 mr-2">
                    <div className="flex justify-between">
                      <span>Tên sản phẩm: </span>
                      <span>{product.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giá: </span>
                      <span>{product.price} (VND)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Số lượng: </span>
                      <span>{product.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <span>Tổng: </span>
              <span>
                <b>{billItem.subTotal} (VND)</b>
              </span>
            </div>
            <div className="flex justify-between">
              <span>Thành tiền:</span>
              <span>
                <b className="text-xl">{billItem.totalAmount} (VND)</b>
              </span>
            </div>
            <div className="text-center">
              <span>Xin cảm ơn quý khác</span>
              <br />
              <span>Hẹn gặp lại quý khách lần sau!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBill;
