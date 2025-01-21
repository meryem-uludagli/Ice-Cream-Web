import { render, screen, prettyDOM } from "@testing-library/react";
import Modal from "../components/modal/index";
import userEvent from "@testing-library/user-event";
import { useSelector } from "react-redux";
import CartItem from "../components/modal/cart-item";
import CartInfo from "../components/modal/cart-info";
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));
jest.mock("../components/modal/cart-info", () => () => <h1>Cart Info</h1>);

jest.mock("../components/modal/cart-item", () => () => <h1>Item</h1>);

describe("Modal Component", () => {
  const closeMock = jest.fn();

  it("isOpen propuna göre modal ekrana basılır", () => {
    useSelector.mockReturnValue({ cart: [] });

    const { rerender } = render(<Modal isOpen={false} close={closeMock} />);

    expect(screen.queryByTestId("modal")).toBeNull();

    rerender(<Modal isOpen={true} close={closeMock} />);

    screen.getByTestId("modal");
  });

  it("X butonuna tıklanınca close fonksiyonu çalışır", async () => {
    useSelector.mockReturnValue({ cart: [] });

    const user = userEvent.setup();

    render(<Modal isOpen={true} close={closeMock} />);

    const closeBtn = screen.getByTestId("close");

    await user.click(closeBtn);

    expect(closeMock).toHaveBeenCalled();
  });

  it("Sepetin doluluk durumuna göre ekrana uyarı basılır", () => {
    useSelector.mockReturnValue({ cart: [] });

    const { rerender } = render(<Modal isOpen={true} close={closeMock} />);

    screen.getByText(/henüz/i);

    useSelector.mockReturnValue({ cart: ["selam"] });

    rerender(<Modal isOpen={true} close={closeMock} />);

    expect(screen.queryByText(/henüz/i)).toBeNull();
  });

  it("sepet dolu ise her bir eleman için ekran cart item basılır", () => {
    const cartItems = [
      { id: 1, name: "Ürün 1" },
      { id: 2, name: "Ürün 2" },
    ];
    useSelector.mockReturnValue({ cart: cartItems });

    render(<Modal isOpen={true} close={closeMock} />);

    const items = screen.getAllByRole("heading", { name: "Item" });

    expect(items.length).toBe(2);
  });
});
