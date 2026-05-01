import { render, screen } from "@testing-library/react";
import HomePage from "./page";

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(async () => ({
    auth: {
      getUser: jest.fn(async () => ({
        data: { user: null },
      })),
    },
  })),
}));

describe("HomePage", () => {
  it("renders the main headline", async () => {
    render(await HomePage());

    expect(
      screen.getByRole("heading", { name: "இந்தியாவின் சமீபத்திய செய்திகள்" }),
    ).toBeInTheDocument();
  });
});
