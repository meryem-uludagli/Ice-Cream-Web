import React from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const CartInfo = ({ cart, close }) => {
  const dispatch = useDispatch();

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );
  const isShippingFree = subTotal > 100;
  const shipping = isShippingFree || subTotal === 0 ? 0 : 20;
  const total = subTotal + shipping;

  const handleClick = () => {
    dispatch(createOrder());
    toast.success("Ürünler Hazırlanıyor..");

    close();
  };

  return (
    <div className="fs-5 py-5 text-lg">
      <p className="flex justify-between">
        <span className="text-gray-500 font-semibold">Subtotal</span>
        <span className="font-semibold text-gray-700">{subTotal}euro</span>
      </p>

      <p className="flex justify-between py-2">
        <span className="text-gray-500 font-semibold">carga</span>
        <span className="font-semibold text-gray-700">
          {isShippingFree ? "ucretsiz" : `${shipping}euro`}
        </span>
      </p>

      <p className="flex justify-between py-2">
        <span className="text-gray-500 font-semibold">Total</span>
        <span className="font-semibold text-gray-700 text-2xl">
          {total}euro
        </span>
      </p>

      <button
        disabled={subTotal === 0}
        onClick={handleClick}
        className="bg-red-500 mt-4 w-full p-2 rounded-md text-white hover:bg-red-600"
      >
        Hacer un pedido
      </button>
    </div>
  );
};

export default CartInfo;
