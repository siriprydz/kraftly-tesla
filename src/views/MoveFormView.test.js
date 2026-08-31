import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import MoveFormView from "./MoveFormView.vue";

describe("MoveFormView", () => {
  it("has a field for new adress that a screen reader can read", () => {
    render(MoveFormView);
    expect(screen.getByLabelText("Ny adress")).toBeInTheDocument();
  });
  it("shows a confirmation message when the form is submitted", async () => {
    const user = userEvent.setup();
    render(MoveFormView);

    await user.type(screen.getByPlaceholderText("Ny adress"), "Storgatan 1");
    await user.type(screen.getByPlaceholderText("Postnummer"), "12345");
    await user.type(screen.getByPlaceholderText("Ort"), "Stockholm");
    await user.type(
      screen.getByPlaceholderText("Inflyttningsdatum (ÅÅÅÅ-MM-DD)"),
      "2026-10-03",
    );
    await user.selectOptions(screen.getByRole("combobox"), "Rörligt pris");

    await user.click(screen.getByRole("button", { name: /skicka/i }));

    expect(
      await screen.findByText(/Tack! Referensnummer:/),
    ).toBeInTheDocument();
  });
});
