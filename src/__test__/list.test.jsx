import { render, screen, waitFor } from "@testing-library/react";
import List from "../components/list";
import api from "../utils/api";
import { mockArray } from "../utils/constants";
import Card from "../components/list/card";

jest.mock("../utils/api");
jest.mock("../components/list/card");

describe("List bileşeni testleri", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("veri çekilirken ekranda loader vardır", async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(<List />);

    screen.getByTestId("list-loader");
    await waitFor(() => {
      expect(screen.queryByTestId("list-loader")).toBeNull();
    });
  });

  it("api'dan error cevabı gelirse ekrana hata mesajı gelir", async () => {
    const errMsg = "bağlantı zaman aşımına uğradı";
    api.get.mockRejectedValueOnce(new Error(errMsg));

    render(<List />);
    await waitFor(() => screen.getByTestId("list-error"));
  });

  it("api'dan başarılı cevap gelirse ekrana card'lar gelir", async () => {
    Card.mockImplementation(({ item }) => <div>{item.name}</div>);
    api.get.mockResolvedValueOnce({ data: mockArray });

    render(<List />);
    await waitFor(() => {
      mockArray.forEach((item) => {
        screen.getByText(item.name);
      });
    });
  });
});
