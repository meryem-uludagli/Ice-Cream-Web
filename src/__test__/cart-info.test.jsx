import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { toast } from "react-toastify";
import CartInfo from "../components/modal/cart-info";
import { createOrder } from "../redux/cartSlice";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockStore = configureStore([]);

describe("CartInfo Component Tests", () => {
  test("renders CartInfo component with correct subtotal, shipping, and total", () => {
    const cart = [
      { id: 1, name: "Product 1", price: 25, amount: 2 },
      { id: 2, name: "Product 2", price: 30, amount: 1 },
    ];

    const store = mockStore({});
    const close = jest.fn();

    render(
      <Provider store={store}>
        <CartInfo cart={cart} close={close} />
      </Provider>
    );

    expect(screen.getByTestId("subtotal")).toHaveTextContent("80₺");

    expect(screen.getByTestId("shipping")).toHaveTextContent("20₺");

    expect(screen.getByTestId("total")).toHaveTextContent("100₺");
  });

  test("dispatches createOrder action and shows toast notification on button click", () => {
    const cart = [
      { id: 1, name: "Product 1", price: 50, amount: 2 },
      { id: 2, name: "Product 2", price: 30, amount: 1 },
    ];

    const store = mockStore({});
    const close = jest.fn();

    render(
      <Provider store={store}>
        <CartInfo cart={cart} close={close} />
      </Provider>
    );

    const button = screen.getByTestId("order-button");
    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions).toEqual([createOrder()]);

    expect(toast.success).toHaveBeenCalledWith("Ürünler hazırlanıyor..");

    expect(close).toHaveBeenCalled();
  });

  test("disables order button when cart is empty", () => {
    const cart = [];
    const store = mockStore({});
    const close = jest.fn();

    render(
      <Provider store={store}>
        <CartInfo cart={cart} close={close} />
      </Provider>
    );

    const button = screen.getByTestId("order-button");
    expect(button).toBeDisabled();
  });

  test("shows free shipping message when subtotal is greater than or equal to 100", () => {
    const cart = [{ id: 1, name: "Product 1", price: 100, amount: 1 }];

    const store = mockStore({});
    const close = jest.fn();

    render(
      <Provider store={store}>
        <CartInfo cart={cart} close={close} />
      </Provider>
    );

    expect(screen.getByTestId("shipping")).toHaveTextContent("Ücretsiz");
  });

  test("shows total as 0 when cart is empty", () => {
    const cart = [];
    const store = mockStore({});
    const close = jest.fn();

    render(
      <Provider store={store}>
        <CartInfo cart={cart} close={close} />
      </Provider>
    );

    expect(screen.getByTestId("total")).toHaveTextContent("0₺");
  });
});
