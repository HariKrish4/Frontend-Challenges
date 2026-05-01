import { fireEvent, render, screen } from "@testing-library/react";

import VerifyPhonePage from "./page";

const pushMock = jest.fn();
const refreshMock = jest.fn();
const searchParamsState = {
  value: new URLSearchParams("phone=%2B919876543210"),
};

function mockFetchOnce(payload: unknown) {
  const fetchMock = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => payload,
  });

  Object.defineProperty(globalThis, "fetch", {
    configurable: true,
    value: fetchMock,
  });

  return fetchMock;
}

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
  useSearchParams: () => searchParamsState.value,
}));

beforeEach(() => {
  pushMock.mockReset();
  refreshMock.mockReset();
  searchParamsState.value = new URLSearchParams("phone=%2B919876543210");
});

describe("VerifyPhonePage", () => {
  it("renders phone verification form", () => {
    render(<VerifyPhonePage />);

    expect(
      screen.getByRole("heading", { name: "Verify Phone OTP" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Phone (+country code)")).toHaveValue(
      "+919876543210",
    );
    expect(screen.getByLabelText("OTP code")).toBeInTheDocument();
  });

  it("falls back to the home page for an unsafe next redirect", async () => {
    searchParamsState.value = new URLSearchParams(
      "phone=%2B919876543210&next=https://evil.example",
    );
    mockFetchOnce({ ok: true, message: "Phone verified successfully." });

    render(<VerifyPhonePage />);

    fireEvent.change(screen.getByLabelText("OTP code"), {
      target: { value: "123456" },
    });
    fireEvent.submit(
      screen
        .getByRole("button", { name: "Verify OTP" })
        .closest("form") as HTMLFormElement,
    );

    expect(
      await screen.findByText("Phone verified successfully."),
    ).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
