import { render, screen } from "@testing-library/vue";
import MoveFormView from "./MoveFormView.vue";

describe("MoveFormView", () => {
  it("has a field for new adress that a screen reader can read", () => {
    render(MoveFormView);
    expect(screen.getByLabelText("Ny adress")).toBeInTheDocument();
  });
});
