import { fireEvent, render, screen } from "@testing-library/react";
import Card from "../components/list/card";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("Card bileşni testleri", () => {
  const dispatchMock = jest.fn();

  const mockItem = {
    name: "Bal Badem",
    image: "/ice-2.png",
    price: 25,
    id: "354b",
  };
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("İtem detaylarını doğru şekilde renderlar", () => {
    render(<Card item={mockItem} />);

    screen.getByRole("heading", { name: "Bal Badem" });
    screen.getByText("₺25 / top");
    expect(screen.getByRole("img")).toHaveAttribute("src", "/ice-2.png");
  });

  it("Tipin seçili olma durumunu göre 'Sepete Ekle' butonunun görünürlüğü değişir", () => {
    render(<Card item={mockItem} />);

    const cartBtn = screen.getByRole("button", { name: /sepete/i });
    expect(cartBtn).toHaveClass("invisible");

    const typeBtn = screen.getByRole("button", { name: /külahta/i });

    fireEvent.click(typeBtn);

    expect(cartBtn).not.toHaveClass("invisible");

    fireEvent.click(typeBtn);

    expect(cartBtn).toHaveClass("invisible");
  });

  it("'Sepete Ekle' butonuna tıklanınca reducer'a haber verir", () => {
    render(<Card item={mockItem} />);

    const typeBtn = screen.getByRole("button", { name: /bardakta/i });
    fireEvent.click(typeBtn);
    const cartBtn = screen.getByRole("button", { name: /sepete/i });
    fireEvent.click(cartBtn);

    expect(dispatchMock).toHaveBeenCalledWith(
      addToCart({ item: mockItem, selectedType: "cup" })
    );
  });
});
