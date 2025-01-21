import { render, screen } from "@testing-library/react";
import CartItem from "../components/modal/cart-item";
import AmountPicker from "../components/modal/amount-picker";
import { mockItem } from "../utils/constants";
jest.mock("../components/modal/amount-picker");

it("cart item bileşeni gelen propu doğru şekilde kullanır", () => {
  render(<CartItem item={mockItem} />);

  screen.getByText(mockItem.name);
  screen.getByText(mockItem.type);
  screen.getByText(mockItem.price * mockItem.amount + "₺");
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", mockItem.image);
});
